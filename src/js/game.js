import { initializeAdMob } from './admob.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeAdMob();
    const state = {
        board: [], solution: [], selectedCell: null,
        currentLevel: 1, maxLevel: 10, hints: 3, errors: 0, maxErrors: 5,
        score: 0, totalScore: 0, seconds: 0, timerInterval: null,
        completedRows: new Set(), completedCols: new Set(), completedBoxes: new Set(),
        bonusQueue: [], isShowingBonus: false,
        history: []
    };
    const boardElement = document.getElementById('sudoku-board');
    const currentLevelElement = document.getElementById('current-level');
    const errorCountElement = document.getElementById('error-count');
    const hintsLeftElement = document.getElementById('hints-left');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const messageContainer = document.getElementById('message-container');
    const messageTitle = document.getElementById('message-title');
    const messageText = document.getElementById('message-text');
    const messageButton = document.getElementById('message-button');
    const gameContainer = document.querySelector('.game-container');
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const levelClues = { 1: 45, 2: 43, 3: 40, 4: 37, 5: 33, 6: 30, 7: 27, 8: 25, 9: 23, 10: 22 };
    const SCORE_CONFIG = { base: 1000, timePenaltyPerSecond: 2, errorPenalty: 50, hintPenalty: 100 };

    // Elementos del historial
    const historyContainer = document.getElementById('history-container');
    const historyToggle = document.getElementById('history-toggle');
    const closeHistoryBtn = document.getElementById('close-history');
    const historyList = document.getElementById('history-list');

    class Sudoku {
        static generateSolution() { const board = Array.from({ length: 9 }, () => Array(9).fill(0)); this.fillBoard(board); return board; }
        static fillBoard(board) { const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; for (let row = 0; row < 9; row++) { for (let col = 0; col < 9; col++) { if (board[row][col] === 0) { this.shuffle(numbers); for (let num of numbers) { if (this.isValidMove(board, row, col, num)) { board[row][col] = num; if (this.fillBoard(board)) return true; board[row][col] = 0; } } return false; } } } return true; }
        static createPuzzle(solution, clues) { const puzzle = solution.map(row => [...row]); const cellsToRemove = 81 - clues; let removed = 0; while (removed < cellsToRemove) { const row = Math.floor(Math.random() * 9); const col = Math.floor(Math.random() * 9); if (puzzle[row][col] !== 0) { puzzle[row][col] = 0; removed++; } } return puzzle; }
        static isValidMove(board, row, col, num) { for (let x = 0; x < 9; x++) if (board[row][x] === num) return false; for (let x = 0; x < 9; x++) if (board[x][col] === num) return false; const startRow = row - row % 3, startCol = col - col % 3; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[i + startRow][j + startCol] === num) return false; return true; }
        static shuffle(array) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[array[i], array[j]] = [array[j], array[i]]; } }
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        stopTimer();
        state.timerInterval = setInterval(() => { state.seconds++; timerElement.textContent = formatTime(state.seconds); }, 1000);
    }

    function stopTimer() {
        if (state.timerInterval) { clearInterval(state.timerInterval); state.timerInterval = null; }
    }

    function updateScore(change) {
        state.score += change;
        state.totalScore += change;
        scoreElement.textContent = state.score;
    }

    function addBonus(points, message) {
        state.bonusQueue.push({ points, message });
        processBonusQueue();
    }

    function processBonusQueue() {
        if (state.isShowingBonus || state.bonusQueue.length === 0) return;
        state.isShowingBonus = true;
        const { points, message } = state.bonusQueue.shift();
        updateScore(points);
        const popup = document.createElement('div');
        popup.className = 'bonus-popup';
        popup.textContent = `+${points} ${message}`;
        gameContainer.appendChild(popup);
        setTimeout(() => { popup.remove(); state.isShowingBonus = false; processBonusQueue(); }, 1500);
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div'); cell.classList.add('cell'); cell.dataset.row = row; cell.dataset.col = col;
                const value = state.board[row][col];
                if (value !== 0) { cell.textContent = value; cell.classList.add(`num-${value}`); if (state.solution[row][col] === value) cell.classList.add('fixed'); }
                if (row % 3 === 0 && row !== 0) cell.style.borderTop = '2px solid var(--box-border-color)';
                if (col % 3 === 0 && col !== 0) cell.style.borderLeft = '2px solid var(--box-border-color)';
                boardElement.appendChild(cell);
            }
        }
    }

    function selectCell(cell) {
        if (cell.classList.contains('fixed')) return;
        document.querySelectorAll('.cell').forEach(c => c.classList.remove('selected', 'highlight'));
        cell.classList.add('selected'); state.selectedCell = cell;
        const row = parseInt(cell.dataset.row), col = parseInt(cell.dataset.col);
        document.querySelectorAll('.cell').forEach(c => {
            const r = parseInt(c.dataset.row), c_col = parseInt(c.dataset.col);
            if (r === row || c_col === col || (Math.floor(r / 3) === Math.floor(row / 3) && Math.floor(c_col / 3) === Math.floor(col / 3))) c.classList.add('highlight');
        });
    }

    function isBoxCorrect(startRow, startCol) { for (let r = startRow; r < startRow + 3; r++) for (let c = startCol; c < startCol + 3; c++) if (state.board[r][c] !== state.solution[r][c] || state.board[r][c] === 0) return false; return true; }
    function isRowCorrect(row) { for (let c = 0; c < 9; c++) if (state.board[row][c] !== state.solution[row][c] || state.board[row][c] === 0) return false; return true; }
    function isColumnCorrect(col) { for (let r = 0; r < 9; r++) if (state.board[r][col] !== state.solution[r][col] || state.board[r][col] === 0) return false; return true; }
    function triggerWaveOnCells(cells, animationClass) { cells.forEach((cell, index) => setTimeout(() => cell.classList.add(animationClass), index * 50)); const totalAnimationTime = 600 + (cells.length - 1) * 50; setTimeout(() => cells.forEach(cell => cell.classList.remove(animationClass)), totalAnimationTime); }

    // Funciones del historial
    function addToHistory(message, type = 'default') {
        const now = new Date();
        const timeString = formatTime(state.seconds);

        const historyItem = {
            time: timeString,
            message: message,
            type: type
        };

        state.history.unshift(historyItem);

        // Limitar el historial a 50 elementos
        if (state.history.length > 50) {
            state.history = state.history.slice(0, 50);
        }

        renderHistory();
        saveProgress();
    }

    function renderHistory() {
        if (state.history.length === 0) {
            historyList.innerHTML = '<div class="empty-history">No hay cambios registrados aún</div>';
            return;
        }

        historyList.innerHTML = '';

        state.history.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = `history-item ${item.type}`;

            const timeElement = document.createElement('div');
            timeElement.className = 'history-time';
            timeElement.textContent = `Tiempo: ${item.time}`;

            const messageElement = document.createElement('div');
            messageElement.className = 'history-message';
            messageElement.textContent = item.message;

            historyElement.appendChild(timeElement);
            historyElement.appendChild(messageElement);
            historyList.appendChild(historyElement);
        });
    }

    function toggleHistory() {
        historyContainer.classList.toggle('open');
    }

    function placeNumber(num) {
        if (!state.selectedCell || state.selectedCell.classList.contains('fixed')) return;
        const row = parseInt(state.selectedCell.dataset.row), col = parseInt(state.selectedCell.dataset.col);
        if (num === 0) {
            state.board[row][col] = 0;
            state.selectedCell.textContent = '';
            state.selectedCell.className = 'cell';
            addToHistory(`Número borrado en posición (${row + 1}, ${col + 1})`, 'default');
        }
        else {
            if (Sudoku.isValidMove(state.board, row, col, num)) {
                state.board[row][col] = num;
                state.selectedCell.textContent = num;
                state.selectedCell.classList.remove('incorrect-animation');
                state.selectedCell.classList.add('correct-animation', `num-${num}`);
                setTimeout(() => state.selectedCell.classList.remove('correct-animation'), 500);

                addToHistory(`Número ${num} colocado en posición (${row + 1}, ${col + 1})`, 'success');

                const boxStartRow = Math.floor(row / 3) * 3, boxStartCol = Math.floor(col / 3) * 3;
                const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
                if (isBoxCorrect(boxStartRow, boxStartCol) && !state.completedBoxes.has(boxIndex)) {
                    state.completedBoxes.add(boxIndex);
                    addBonus(200, '¡Bloque Completo!');
                    triggerWaveOnCells(Array.from(document.querySelectorAll('.cell')).filter(c => {
                        const r = parseInt(c.dataset.row), cl = parseInt(c.dataset.col);
                        return Math.floor(r / 3) === Math.floor(boxStartRow / 3) && Math.floor(cl / 3) === Math.floor(boxStartCol / 3);
                    }), 'wave-animation');

                    addToHistory(`¡Bloque completado! +200 puntos`, 'success');
                }
                if (isRowCorrect(row) && !state.completedRows.has(row)) {
                    state.completedRows.add(row);
                    addBonus(100, '¡Fila Completa!');
                    triggerWaveOnCells(Array.from(document.querySelectorAll(`.cell[data-row="${row}"]`)), 'wave-animation-calipso');

                    addToHistory(`¡Fila ${row + 1} completada! +100 puntos`, 'success');
                }
                if (isColumnCorrect(col) && !state.completedCols.has(col)) {
                    state.completedCols.add(col);
                    addBonus(100, '¡Columna Completa!');
                    triggerWaveOnCells(Array.from(document.querySelectorAll(`.cell[data-col="${col}"]`)), 'wave-animation-calipso');

                    addToHistory(`¡Columna ${col + 1} completada! +100 puntos`, 'success');
                }
                checkWin();
            } else {
                state.errors++;
                errorCountElement.textContent = state.errors;
                updateScore(-SCORE_CONFIG.errorPenalty);
                state.selectedCell.textContent = num;
                state.selectedCell.classList.add('error-animation', `num-${num}`);
                setTimeout(() => {
                    state.selectedCell.textContent = '';
                    state.selectedCell.classList.remove('error-animation', `num-${num}`);
                    state.selectedCell.className = 'cell';
                }, 1000);

                addToHistory(`Error: Número ${num} incorrecto en posición (${row + 1}, ${col + 1}) -50 puntos`, 'error');

                if (state.errors >= state.maxErrors) showGameOver();
            }
        }
    }

    function checkWin() {
        for (let row = 0; row < 9; row++)
            for (let col = 0; col < 9; col++)
                if (state.board[row][col] !== state.solution[row][col]) return false;

        stopTimer();

        if (state.currentLevel < state.maxLevel) {
            showLevelCompleteScreen();
        } else {
            showGameCompleteScreen();
        }

        return true;
    }

    function showLevelCompleteScreen() {
        const nextLevel = state.currentLevel + 1;
        currentLevelElement.textContent = nextLevel;
        messageTitle.textContent = 'Nivel Completado';
        messageText.innerHTML = `¡Felicidades! Has superado el Nivel ${state.currentLevel}.<br>Puntuación total: <strong>${state.totalScore}</strong>`;
        messageButton.textContent = 'Siguiente Nivel';
        messageTitle.className = 'level-complete-title';
        messageContainer.style.display = 'block';
        createFlares();

        addToHistory(`¡Nivel ${state.currentLevel} completado! Puntuación: ${state.totalScore}`, 'success');

        messageButton.onclick = () => {
            messageContainer.style.display = 'none';
            messageTitle.className = '';
            removeFlares();
            state.currentLevel = nextLevel;
            startNewLevel();
        };
    }

    function showGameCompleteScreen() {
        messageTitle.textContent = '';
        messageText.innerHTML = `¡Eres un verdadero maestro del Sudoku!<br>Puntuación Final: <strong>${state.totalScore}</strong>`;
        messageButton.textContent = 'Jugar de Nuevo';
        messageTitle.className = 'game-complete-title';

        addToHistory(`¡Juego completado! Puntuación final: ${state.totalScore}`, 'success');

        const text = "FELICITACIONES    JUEGO    COMPLETADO";
        const colors = ['var(--num-1-color)', 'var(--num-2-color)', 'var(--num-3-color)', 'var(--num-4-color)', 'var(--num-5-color)', 'var(--num-6-color)', 'var(--num-7-color)', 'var(--num-8-color)', 'var(--num-9-color)'];

        text.split('').forEach((letter, i) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.color = colors[i % colors.length];
            messageTitle.appendChild(span);
        });

        messageContainer.style.display = 'block';
        messageButton.onclick = () => {
            messageContainer.style.display = 'none';
            messageTitle.className = '';
            messageTitle.innerHTML = '';
            resetGame();
        };
    }

    function showGameOver() {
        stopTimer();
        gameContainer.classList.add('game-over');
        messageContainer.classList.add('game-over');
        gameOverOverlay.style.display = 'block';

        addToHistory(`¡Game Over! Demasiados errores. Puntuación final: ${state.totalScore}`, 'error');

        showMessage('GAME OVER', `Has cometido 5 errores. Puntuación final: ${state.totalScore}`, 'Jugar de Nuevo', () => {
            gameContainer.classList.remove('game-over');
            messageContainer.classList.remove('game-over');
            gameOverOverlay.style.display = 'none';
            resetGame();
        });
    }

    function showMessage(title, text, buttonText, callback) {
        messageTitle.textContent = title;
        messageTitle.className = '';
        messageText.textContent = text;
        messageButton.textContent = buttonText;
        messageContainer.style.display = 'block';
        messageButton.onclick = () => {
            messageContainer.style.display = 'none';
            if (callback) callback();
        };
    }

    function createFlares() {
        const leftFlare = document.createElement('div');
        leftFlare.classList.add('flare', 'left');
        document.body.appendChild(leftFlare);
        const rightFlare = document.createElement('div');
        rightFlare.classList.add('flare', 'right');
        document.body.appendChild(rightFlare);
    }

    function removeFlares() {
        document.querySelectorAll('.flare').forEach(flare => flare.remove());
    }

    function startNewLevel() {
        stopTimer();
        state.solution = Sudoku.generateSolution();
        const clues = levelClues[state.currentLevel];
        state.board = Sudoku.createPuzzle(state.solution, clues);
        state.hints = 3;
        state.selectedCell = null;
        state.errors = 0;
        state.seconds = 0;
        state.completedRows.clear();
        state.completedCols.clear();
        state.completedBoxes.clear();
        state.bonusQueue = [];
        state.isShowingBonus = false;
        state.score = state.totalScore;

        currentLevelElement.textContent = state.currentLevel;
        errorCountElement.textContent = state.errors;
        hintsLeftElement.textContent = state.hints;
        timerElement.textContent = formatTime(0);
        scoreElement.textContent = state.score;

        renderBoard();
        startTimer();
        saveProgress();

        addToHistory(`Iniciado Nivel ${state.currentLevel}`, 'default');
    }

    function resetGame() {
        if (confirm('¿Estás seguro de que quieres empezar un nuevo juego desde el nivel 1? Se perderá todo tu progreso.')) {
            stopTimer();
            document.querySelectorAll('.bonus-popup').forEach(popup => popup.remove());

            // Reiniciar el estado del juego a los valores iniciales
            state.currentLevel = 1;
            state.totalScore = 0;
            state.score = 0;
            state.errors = 0;
            state.hints = 3;
            state.seconds = 0;
            state.selectedCell = null;
            state.completedRows.clear();
            state.completedCols.clear();
            state.completedBoxes.clear();
            state.bonusQueue = [];
            state.isShowingBonus = false;
            state.history = [];

            // Limpiar localStorage
            localStorage.removeItem('sudokuGameState');

            // Actualizar UI inmediatamente
            currentLevelElement.textContent = state.currentLevel;
            errorCountElement.textContent = state.errors;
            hintsLeftElement.textContent = state.hints;
            timerElement.textContent = formatTime(0);
            scoreElement.textContent = state.score;
            messageContainer.style.display = 'none';
            gameOverOverlay.style.display = 'none';

            renderHistory();
            startNewLevel();
        }
    }

    function giveHint() {
        if (state.hints <= 0) {
            showMessage('Sin Pistas', 'No te quedan más pistas para este nivel.', 'OK');
            return;
        }

        updateScore(-SCORE_CONFIG.hintPenalty);

        const emptyCells = [];
        for (let r = 0; r < 9; r++)
            for (let c = 0; c < 9; c++)
                if (state.board[r][c] === 0)
                    emptyCells.push({ r, c });

        if (emptyCells.length === 0) return;

        const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const correctValue = state.solution[r][c];
        const cellElement = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);

        cellElement.textContent = correctValue;
        cellElement.classList.add('correct-animation', `num-${correctValue}`);
        setTimeout(() => cellElement.classList.remove('correct-animation'), 500);

        state.board[r][c] = correctValue;
        state.hints--;
        hintsLeftElement.textContent = state.hints;

        addToHistory(`Pista utilizada: Número ${correctValue} en posición (${r + 1}, ${c + 1}) -100 puntos`, 'hint');

        checkWin();
    }

    function saveProgress() {
        localStorage.setItem('sudokuGameState', JSON.stringify({
            currentLevel: state.currentLevel,
            board: state.board,
            solution: state.solution,
            hints: state.hints,
            errors: state.errors,
            totalScore: state.totalScore,
            history: state.history
        }));
    }

    function loadProgress() {
        const savedState = localStorage.getItem('sudokuGameState');
        if (savedState) {
            const parsed = JSON.parse(savedState);
            state.currentLevel = parsed.currentLevel;
            state.board = parsed.board;
            state.solution = parsed.solution;
            state.hints = parsed.hints;
            state.errors = parsed.errors !== undefined ? parsed.errors : 0;
            state.totalScore = parsed.totalScore || 0;
            state.history = parsed.history || [];

            currentLevelElement.textContent = state.currentLevel;
            errorCountElement.textContent = state.errors;
            hintsLeftElement.textContent = state.hints;
            scoreElement.textContent = state.totalScore;

            renderBoard();
            renderHistory();
            startTimer();
        } else {
            startNewLevel();
        }
    }

    // --- EVENT LISTENERS ---
    boardElement.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell'))
            selectCell(e.target);
    });

    document.querySelectorAll('.number-btn').forEach(btn => {
        const num = parseInt(btn.dataset.number);
        btn.classList.add(`num-${num}`);
        btn.addEventListener('click', () => placeNumber(num));
    });

    document.getElementById('erase-btn').addEventListener('click', () => placeNumber(0));
    document.getElementById('hint-btn').addEventListener('click', giveHint);
    document.getElementById('new-game-btn').addEventListener('click', resetGame);

    // Event listeners del historial
    historyToggle.addEventListener('click', toggleHistory);
    closeHistoryBtn.addEventListener('click', toggleHistory);

    document.addEventListener('keydown', (e) => {
        if (e.key >= '1' && e.key <= '9') placeNumber(parseInt(e.key));
        else if (e.key === 'Delete' || e.key === 'Backspace') placeNumber(0);
        else if (e.key.includes('Arrow')) {
            if (!state.selectedCell) return;
            let row = parseInt(state.selectedCell.dataset.row), col = parseInt(state.selectedCell.dataset.col);
            if (e.key === 'ArrowUp') row = Math.max(0, row - 1);
            if (e.key === 'ArrowDown') row = Math.min(8, row + 1);
            if (e.key === 'ArrowLeft') col = Math.max(0, col - 1);
            if (e.key === 'ArrowRight') col = Math.min(8, col + 1);
            const newCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (newCell) selectCell(newCell);
        }
    });

    // --- LANDING PAGE LOGIC ---
    const landingPage = document.getElementById('landing-page');
    const startGameBtn = document.getElementById('start-game-btn');
    const instructionsBtn = document.getElementById('instructions-btn');
    const instructionsModal = document.getElementById('instructions-modal');
    const closeInstructionsBtn = document.getElementById('close-instructions-btn');

    function startGame() {
        landingPage.classList.add('hidden');
        // Small delay to allow fade out before starting logic
        setTimeout(() => {
            landingPage.style.display = 'none';
            loadProgress(); // Start the game logic
        }, 500);
    }

    startGameBtn.addEventListener('click', startGame);

    instructionsBtn.addEventListener('click', () => {
        instructionsModal.classList.remove('hidden');
    });

    closeInstructionsBtn.addEventListener('click', () => {
        instructionsModal.classList.add('hidden');
    });

    // Close modal if clicking outside
    instructionsModal.addEventListener('click', (e) => {
        if (e.target === instructionsModal) {
            instructionsModal.classList.add('hidden');
        }
    });

    // loadProgress(); // REMOVED: Now called by startGame()
});
