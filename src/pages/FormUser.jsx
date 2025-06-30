import React, { useState } from 'react';
import axios from 'axios';

export const FormUser = () => {
    const [formData, setFormData] = useState({
        Age: '',
        Avg_Daily_Usage_Hours: '',
        Sleep_Hours_Per_Night: '',
        Conflicts_Over_Social_Media: '',
        Relationship_Status: 'Single',
        Country: 'USA',
        Academic_Level: 'Undergraduate',
        Most_Used_Platform: 'Instagram',
        Gender: 'Male'
    });
    
    const [predictions, setPredictions] = useState(null);
    const [plots, setPlots] = useState({
        scatter: null,
        histogram: null,
        tree: null,
        kmeans: null
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('predictions');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { Age, Avg_Daily_Usage_Hours, Sleep_Hours_Per_Night, Conflicts_Over_Social_Media } = formData;
        
        if (!Age || !Avg_Daily_Usage_Hours || !Sleep_Hours_Per_Night || !Conflicts_Over_Social_Media) {
            return "Por favor completa todos los campos obligatorios.";
        }
        
        const numAge = parseInt(Age);
        const numUsage = parseFloat(Avg_Daily_Usage_Hours);
        const numSleep = parseFloat(Sleep_Hours_Per_Night);
        const numConflicts = parseInt(Conflicts_Over_Social_Media);
        
        if (isNaN(numAge)) return "La edad debe ser un número válido.";
        if (isNaN(numUsage)) return "Las horas de uso deben ser un número válido.";
        if (isNaN(numSleep)) return "Las horas de sueño deben ser un número válido.";
        if (isNaN(numConflicts)) return "Los conflictos deben ser un número válido.";
        
        if (numAge < 12 || numAge > 100) return "La edad debe estar entre 12 y 100 años.";
        if (numUsage < 0 || numUsage > 24) return "El uso diario debe ser entre 0 y 24 horas.";
        if (numSleep < 0 || numSleep > 16) return "Las horas de sueño deben ser entre 0 y 16.";
        if (numConflicts < 0 || numConflicts > 100) return "Los conflictos deben ser entre 0 y 100.";
        
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPredictions(null);
        setPlots({
            scatter: null,
            histogram: null,
            tree: null,
            kmeans: null
        });
        setLoading(true);

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/predict-user-addiction', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.data.status === 'success') {
                setPredictions(response.data.predictions);
                setPlots({
                    scatter: response.data.plots.scatter_plot,
                    histogram: response.data.plots.histogram_plot,
                    tree: response.data.plots.tree_plot,
                    kmeans: response.data.plots.kmeans_3d_plot
                });
                setActiveTab('predictions');
            } else {
                setError(response.data.error || 'Error en el servidor. Por favor intenta más tarde.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error de conexión. Verifica tu internet o intenta más tarde.');
        } finally {
            setLoading(false);
        }
    };

    const renderPredictionCard = (title, content, color = 'bg-blue-50') => {
        return (
            <div className={`p-4 rounded-lg shadow-sm ${color}`}>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                {typeof content === 'string' ? (
                    <p>{content}</p>
                ) : (
                    <div>
                        {Object.entries(content).map(([key, value]) => (
                            <p key={key}><span className="font-medium">{key}:</span> {value}</p>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl bg-blue">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">Predicción de Adicción a Redes Sociales</h1>
                <p className="text-gray-600">Completa el formulario para obtener un análisis personalizado</p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Información Personal</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Required Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Edad *</label>
                                <input 
                                    type="number" 
                                    name="Age" 
                                    value={formData.Age} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 25" 
                                    min="12"
                                    max="100"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horas diarias de uso *</label>
                                <input 
                                    type="number" 
                                    name="Avg_Daily_Usage_Hours" 
                                    value={formData.Avg_Daily_Usage_Hours} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 3.5" 
                                    step="0.1"
                                    min="0"
                                    max="24"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Horas de sueño por noche *</label>
                                <input 
                                    type="number" 
                                    name="Sleep_Hours_Per_Night" 
                                    value={formData.Sleep_Hours_Per_Night} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 7.5" 
                                    step="0.1"
                                    min="0"
                                    max="16"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Conflictos por redes sociales *</label>
                                <input 
                                    type="number" 
                                    name="Conflicts_Over_Social_Media" 
                                    value={formData.Conflicts_Over_Social_Media} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 2" 
                                    min="0"
                                    max="100"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Optional Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                                <select 
                                    name="Gender" 
                                    value={formData.Gender} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Male">Masculino</option>
                                    <option value="Female">Femenino</option>
                                    <option value="Other">Otro/Prefiero no decir</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estado civil</label>
                                <select 
                                    name="Relationship_Status" 
                                    value={formData.Relationship_Status} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Single">Soltero/a</option>
                                    <option value="In Relationship">En una relación</option>
                                    <option value="Married">Casado/a</option>
                                    <option value="Complicated">Es complicado</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                                <input 
                                    type="text" 
                                    name="Country" 
                                    value={formData.Country} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. México" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel académico</label>
                                <select 
                                    name="Academic_Level" 
                                    value={formData.Academic_Level} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="High School">Preparatoria</option>
                                    <option value="Undergraduate">Licenciatura</option>
                                    <option value="Graduate">Posgrado</option>
                                    <option value="Doctorate">Doctorado</option>
                                    <option value="Other">Otro</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma más usada</label>
                                <select 
                                    name="Most_Used_Platform" 
                                    value={formData.Most_Used_Platform} 
                                    onChange={handleInputChange} 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="Instagram">Instagram</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="TikTok">TikTok</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="WeChat">WeChat</option>
                                    <option value="Other">Otra</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analizando...
                                </span>
                            ) : (
                                'Analizar mi uso de redes sociales'
                            )}
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                            <div className="flex items-center text-red-700">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Results Section */}
            {predictions && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('predictions')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'predictions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Resultados
                            </button>
                            <button
                                onClick={() => setActiveTab('visualizations')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'visualizations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Visualizaciones
                            </button>
                        </nav>
                    </div>
                    
                    <div className="p-6">
                        {activeTab === 'predictions' ? (
                            <div className="space-y-6">
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <h2 className="text-xl font-semibold text-gray-800">Resumen de tu análisis</h2>
                                    </div>
                                    <p className="mt-2 text-gray-600">Basado en los datos proporcionados, aquí están los resultados de los diferentes modelos de análisis.</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderPredictionCard(
                                        "Clasificación Binaria", 
                                        {
                                            "Predicción": predictions.logistic_binary.prediction === 1 ? '🔴 Riesgo Alto' : '🟢 Riesgo Bajo',
                                            "Probabilidad alta": `${(predictions.logistic_binary.probability_high * 100).toFixed(1)}%`,
                                            "Interpretación": predictions.logistic_binary.interpretation
                                        },
                                        predictions.logistic_binary.prediction === 1 ? 'bg-red-50' : 'bg-green-50'
                                    )}
                                    
                                    {renderPredictionCard(
                                        "Clasificación Multiclase", 
                                        {
                                            "Nivel": predictions.logistic_multiclass.prediction,
                                            "Probabilidades": `Bajo: ${(predictions.logistic_multiclass.probabilities.Bajo * 100).toFixed(1)}%, Medio: ${(predictions.logistic_multiclass.probabilities.Medio * 100).toFixed(1)}%, Alto: ${(predictions.logistic_multiclass.probabilities.Alto * 100).toFixed(1)}%`,
                                            "Interpretación": predictions.logistic_multiclass.interpretation
                                        }
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderPredictionCard(
                                        "Árbol de Decisión", 
                                        {
                                            "Predicción": predictions.decision_tree_binary.prediction === 1 ? '🔴 Riesgo Alto' : '🟢 Riesgo Bajo',
                                            "Interpretación": predictions.decision_tree_binary.interpretation
                                        }
                                    )}
                                    
                                    {renderPredictionCard(
                                        "Agrupamiento (KMeans)", 
                                        {
                                            "Grupo": predictions.kmeans_clustering.cluster,
                                            "Interpretación": predictions.kmeans_clustering.interpretation
                                        }
                                    )}
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h3 className="font-semibold text-lg mb-2">Modelos de Regresión Lineal</h3>
                                    <div className="space-y-2">
                                        <p><span className="font-medium">Uso y sueño:</span> {predictions.linear_regression.model_1_usage_sleep}</p>
                                        <p><span className="font-medium">Edad y salud mental:</span> {predictions.linear_regression.model_2_age_mental}</p>
                                        <p><span className="font-medium">Conflictos y salud mental:</span> {predictions.linear_regression.model_3_conflicts_mental}</p>
                                        <p className="text-sm text-gray-500 mt-2">{predictions.linear_regression.note}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex">
                                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="font-medium text-yellow-800">Recomendaciones</h4>
                                            <p className="text-yellow-700 mt-1">Considera reducir tu tiempo en redes sociales si los resultados indican un riesgo alto. Busca actividades alternativas y establece horarios de uso.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Uso diario vs. Nivel de adicción</h3>
                                    {plots.scatter ? (
                                        <img 
                                            src={`data:image/png;base64,${plots.scatter}`} 
                                            alt="Gráfico de dispersión" 
                                            className="w-full rounded-lg border border-gray-200" 
                                        />
                                    ) : (
                                        <div className="bg-gray-100 p-8 text-center rounded-lg">
                                            <p className="text-gray-500">No hay datos disponibles para este gráfico</p>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Distribución de adicción</h3>
                                        {plots.histogram ? (
                                            <img 
                                                src={`data:image/png;base64,${plots.histogram}`} 
                                                alt="Histograma" 
                                                className="w-full rounded-lg border border-gray-200" 
                                            />
                                        ) : (
                                            <div className="bg-gray-100 p-8 text-center rounded-lg">
                                                <p className="text-gray-500">No hay datos disponibles para este gráfico</p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Árbol de decisión</h3>
                                        {plots.tree ? (
                                            <img 
                                                src={`data:image/png;base64,${plots.tree}`} 
                                                alt="Árbol de decisión" 
                                                className="w-full rounded-lg border border-gray-200" 
                                            />
                                        ) : (
                                            <div className="bg-gray-100 p-8 text-center rounded-lg">
                                                <p className="text-gray-500">No hay datos disponibles para este gráfico</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Agrupamiento KMeans (3D)</h3>
                                    {plots.kmeans ? (
                                        <img 
                                            src={`data:image/png;base64,${plots.kmeans}`} 
                                            alt="Gráfico 3D KMeans" 
                                            className="w-full rounded-lg border border-gray-200" 
                                        />
                                    ) : (
                                        <div className="bg-gray-100 p-8 text-center rounded-lg">
                                            <p className="text-gray-500">No hay datos disponibles para este gráfico</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};