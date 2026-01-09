import { Search, MapPin, Clock, Car, CreditCard, User, Star, Phone } from 'lucide-react';

const RideRequestPanel = ({ destination, status, onConfirm, darkMode }) => {
    const bgClass = darkMode ? 'bg-gray-800 text-white shadow-[0_-5px_30px_rgba(0,0,0,0.5)]' : 'bg-white text-gray-800 shadow-[0_-5px_30px_rgba(0,0,0,0.15)]';
    const textMain = darkMode ? 'text-white' : 'text-gray-800';
    const textSub = darkMode ? 'text-gray-400' : 'text-gray-500';
    const bgInput = darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200';
    const borderClass = darkMode ? 'border-gray-700' : 'border-gray-100';
    const itemHover = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';
    const iconBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';

    // Estado 4: En Viaje (Riding)
    if (status === 'riding') {
        return (
            <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 z-[1000] animate-slide-up ${bgClass}`}>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-30"></div>

                <h2 className={`text-2xl font-bold mb-2 ${textMain}`}>En viaje a tu destino</h2>
                <p className={`${textSub} mb-6`}>Llegada estimada: 12:45 PM</p>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
                    <div className="bg-green-500 h-2.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                </div>

                <div className={`flex items-center justify-between border-t ${borderClass} pt-4`}>
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                            <User className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                            <h3 className={`font-bold ${textMain}`}>Juan Pérez</h3>
                            <p className={`text-xs ${textSub}`}>Toyota Corolla</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Estado 3: Conductor En Camino (Assigned)
    if (status === 'assigned') {
        return (
            <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 z-[1000] animate-slide-up ${bgClass}`}>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-30"></div>

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className={`text-xl font-bold ${textMain}`}>Llegada en 2 min</h2>
                        <p className={`text-sm ${textSub}`}>Toyota Corolla • Gris</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} px-3 py-1 rounded-lg`}>
                        <span className={`font-bold text-xl tracking-wider ${textMain}`}>AB-12-CD</span>
                    </div>
                </div>

                <div className={`flex items-center justify-between mb-8 border-t border-b ${borderClass} py-4`}>
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                            <User className="w-8 h-8 text-gray-600" />
                        </div>
                        <div>
                            <h3 className={`font-bold ${textMain}`}>Juan Pérez</h3>
                            <div className={`flex items-center text-xs ${textSub}`}>
                                <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                                <span>4.9</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <Phone className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <button className="w-full border border-red-500 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 hover:bg-opacity-10 transition-colors">
                    Cancelar Viaje
                </button>
            </div>
        );
    }

    // Estado 2: Buscando (Searching)
    if (status === 'searching') {
        return (
            <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-8 z-[1000] animate-slide-up text-center h-64 flex flex-col items-center justify-center ${bgClass}`}>
                <div className="relative w-20 h-20 mb-6">
                    <div className={`absolute inset-0 border-4 rounded-full ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                    <div className={`absolute inset-0 border-4 rounded-full border-t-transparent animate-spin ${darkMode ? 'border-blue-400' : 'border-black'}`}></div>
                </div>
                <h2 className={`text-xl font-bold mb-2 ${textMain}`}>Buscando conductor...</h2>
                <p className={textSub}>Conectando con conductores cercanos</p>
            </div>
        );
    }

    // Estado 1: Destino Seleccionado -> Cotización (Quotes)
    if (destination) {
        return (
            <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 z-[1000] animate-slide-up transition-all duration-300 ${bgClass}`}>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-30"></div>

                <h2 className={`text-xl font-bold mb-4 ${textMain}`}>Elige un viaje</h2>

                {/* Opciones de Viaje */}
                <div className="space-y-3 mb-6">
                    <div className={`flex items-center justify-between p-3 border-2 ${darkMode ? 'border-blue-500 bg-gray-700' : 'border-black bg-gray-50'} rounded-xl cursor-pointer transition-colors`}>
                        <div className="flex items-center">
                            <div className="w-12 h-12 mr-3 flex items-center justify-center">
                                <Car className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-black'}`} />
                            </div>
                            <div>
                                <h3 className={`font-bold ${textMain}`}>Humango X</h3>
                                <p className={`text-xs ${textSub}`}>3 min lejos • 4 asientos</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`block font-bold text-lg ${textMain}`}>$3.500</span>
                            <span className={`block text-xs ${textSub} line-through`}>$4.200</span>
                        </div>
                    </div>

                    <div className={`flex items-center justify-between p-3 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} rounded-xl cursor-pointer opacity-70 hover:opacity-100 transition-colors`}>
                        <div className="flex items-center">
                            <div className="w-12 h-12 mr-3 flex items-center justify-center">
                                <Car className={`w-8 h-8 ${textMain}`} />
                            </div>
                            <div>
                                <h3 className={`font-bold ${textMain}`}>Black</h3>
                                <p className={`text-xs ${textSub}`}>5 min lejos • Lujo</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`block font-bold text-lg ${textMain}`}>$6.800</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4 px-1">
                    <div className={`flex items-center ${textMain}`}>
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Visa •••• 4242</span>
                    </div>
                </div>

                <button
                    onClick={onConfirm}
                    className={`w-full font-bold py-4 rounded-xl text-lg transition-colors shadow-lg ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                    Confirmar Humango X
                </button>
            </div>
        );
    }

    // Estado 0: Inicial (Idle)
    return (
        <div className={`absolute bottom-0 left-0 right-0 rounded-t-3xl p-6 z-[1000] animate-slide-up ${bgClass}`}>
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-30"></div>
            <h2 className={`text-2xl font-bold mb-6 ${textMain}`}>¿A dónde vas?</h2>

            <div className={`${bgInput} p-4 rounded-xl flex items-center mb-6 cursor-pointer transition-colors`}>
                <Search className={`w-6 h-6 mr-3 ${textMain}`} />
                <span className={`text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Buscar destino</span>
            </div>

            <div className="space-y-4">
                <div className={`flex items-center p-2 rounded-lg ${itemHover} transition-colors cursor-pointer`}>
                    <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center mr-4`}>
                        <MapPin className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <p className={`font-bold ${textMain}`}>Casa</p>
                        <p className={`text-sm ${textSub}`}>Av. Siempre Viva 123</p>
                    </div>
                </div>

                <div className={`flex items-center p-2 rounded-lg ${itemHover} transition-colors cursor-pointer`}>
                    <div className={`w-10 h-10 ${iconBg} rounded-full flex items-center justify-center mr-4`}>
                        <Clock className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                        <p className={`font-bold ${textMain}`}>Trabajo</p>
                        <p className={`text-sm ${textSub}`}>Calle Falsa 123, Oficina 404</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideRequestPanel;
