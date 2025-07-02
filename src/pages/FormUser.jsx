import React, { useState } from 'react';
import axios from 'axios';

// Traducciones para los títulos en español
const predictionTitles = {
    Addicted_Score_Prediction: "Nivel de adicción",
    Sleep_Hours_Prediction: "Horas de sueño por noche",
    Conflicts_Prediction: "Conflictos por redes sociales",
    Academic_Impact_Prediction: "Impacto en el rendimiento académico",
    Mental_Health_Risk_Prediction: "Riesgo de salud mental baja",
    Addiction_Classification: "Clasificación de adicción",
    Most_Used_Platform: "Plataforma más usada",
    Relationship_Status: "Estado de relación",
    Cluster: "Clúster asignado",
    Addiction_vs_Sleep: "Adicción vs Horas de sueño",
    Social_Media_Conflicts: "Conflictos en redes sociales",
    Academic_Performance_Risk: "Riesgo de bajo rendimiento académico",
    General_Mixed_Model: "Modelo mixto general"
};

// Valores válidos para campos categóricos (alineados con el backend)
const validValues = {
    Gender: ['Hombre', 'Mujer', 'Otro'],
    Country: ['México', 'Brasil', 'Perú'],
    Academic_Level: ['Primaria', 'Secundaria', 'Preparatoria', 'Técnico Superior Universitario', 'Ingeniería', 'Posgrado'],
    Most_Used_Platform: ['YouTube', 'Instagram', 'TikTok', 'Facebook', 'Discord', 'WhatsApp', 'Twitter', 'Otra'],
    Relationship_Status: ['Soltero/a', 'En una relación', 'Casado/a', 'Complicado']
};

// Función para formatear el contenido de la predicción
const formatPredictionContent = (key, prediction) => {
    if (typeof prediction === 'string') {
        return { "Valor predicho": prediction };
    } else if (prediction.value !== undefined) {
        const content = { "Valor predicho": prediction.value };
        if (prediction.interpretation) {
            content["Interpretación"] = prediction.interpretation;
        }
        if (prediction.probability) {
            content["Probabilidad"] = `${(prediction.probability * 100).toFixed(2)}%`;
        }
        return content;
    }
    return { "Valor predicho": JSON.stringify(prediction) };
};

// Función para renderizar una tarjeta de predicción
const renderPredictionCard = (key, prediction) => {
    let color = 'bg-blue-50';
    if (key === 'Addicted_Score_Prediction' && prediction.value > 7) color = 'bg-red-50';
    else if (key === 'Addicted_Score_Prediction' && prediction.value < 4) color = 'bg-green-50';
    if (key === 'Sleep_Hours_Prediction' && prediction.value < 6) color = 'bg-red-50';
    else if (key === 'Sleep_Hours_Per_Night' && prediction.value >= 7) color = 'bg-green-50';
    if (key === 'Conflicts_Prediction' && prediction.value > 2) color = 'bg-red-50';
    else if (key === 'Conflicts_Prediction' && prediction.value <= 1) color = 'bg-green-50';
    if (key === 'Academic_Impact_Prediction' && prediction.value === 1) color = 'bg-red-50';
    else if (key === 'Academic_Impact_Prediction' && prediction.value === 0) color = 'bg-green-50';
    if (key === 'Mental_Health_Risk_Prediction' && prediction.value === 0) color = 'bg-red-50';
    else if (key === 'Mental_Health_Risk_Prediction' && prediction.value === 1) color = 'bg-green-50';
    if (key === 'Addiction_Classification' && prediction.value === 1) color = 'bg-red-50';
    else if (key === 'Addiction_Classification' && prediction.value === 0) color = 'bg-green-50';
    if (key === 'Academic_Performance_Risk' && prediction.value === 1) color = 'bg-red-50';
    else if (key === 'Academic_Performance_Risk' && prediction.value === 0) color = 'bg-green-50';

    return (
        <div className={`p-4 rounded-lg shadow-sm ${color}`} key={key}>
            <h3 className="font-semibold text-lg mb-2">{predictionTitles[key] || key}</h3>
            <div>
                {Object.entries(formatPredictionContent(key, prediction)).map(([label, value]) => (
                    <p key={label}><span className="font-medium">{label}:</span> {value}</p>
                ))}
            </div>
        </div>
    );
};

export const FormUser = () => {
    const [formData, setFormData] = useState({
        Age: '',
        Avg_Daily_Usage_Hours: '',
        Sleep_Hours_Per_Night: '',
        Mental_Health_Score: '',
        Conflicts_Over_Social_Media: '',
        Addicted_Score: '',
        Affects_Academic_Performance: '0',
        Relationship_Status: 'Soltero/a',
        Country: 'México',
        Academic_Level: 'Técnico Superior Universitario',
        Most_Used_Platform: 'YouTube',
        Gender: 'Hombre'
    });

    const [predictions, setPredictions] = useState(null);
    const [plots, setPlots] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('predictions');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const {
            Age, Avg_Daily_Usage_Hours, Sleep_Hours_Per_Night,
            Mental_Health_Score, Conflicts_Over_Social_Media,
            Addicted_Score, Affects_Academic_Performance,
            Gender, Country, Academic_Level, Most_Used_Platform, Relationship_Status
        } = formData;

        if (!Age || !Avg_Daily_Usage_Hours || !Sleep_Hours_Per_Night ||
            !Mental_Health_Score || !Conflicts_Over_Social_Media ||
            !Addicted_Score || !Affects_Academic_Performance) {
            return "Por favor completa todos los campos obligatorios.";
        }

        if (!Academic_Level) {
            return "El nivel académico es obligatorio.";
        }

        const numAge = parseInt(Age);
        const numUsage = parseFloat(Avg_Daily_Usage_Hours);
        const numSleep = parseFloat(Sleep_Hours_Per_Night);
        const numMentalHealth = parseFloat(Mental_Health_Score);
        const numConflicts = parseInt(Conflicts_Over_Social_Media);
        const numAddictedScore = parseFloat(Addicted_Score);
        const numAffectsAcademic = parseInt(Affects_Academic_Performance);

        if (isNaN(numAge)) return "La edad debe ser un número válido.";
        if (isNaN(numUsage)) return "Las horas de uso deben ser un número válido.";
        if (isNaN(numSleep)) return "Las horas de sueño deben ser un número válido.";
        if (isNaN(numMentalHealth)) return "La puntuación de salud mental debe ser un número válido.";
        if (isNaN(numConflicts)) return "Los conflictos deben ser un número válido.";
        if (isNaN(numAddictedScore)) return "La puntuación de adicción debe ser un número válido.";
        if (isNaN(numAffectsAcademic)) return "El impacto académico debe ser 0 o 1.";

        if (numAge < 9 || numAge > 100) return "La edad debe estar entre 9 y 100 años.";
        if (numUsage < 0 || numUsage > 24) return "El uso diario debe ser entre 0 y 24 horas.";
        if (numSleep < 0 || numSleep > 16) return "Las horas de sueño deben ser entre 0 y 16.";
        if (numMentalHealth < 0 || numMentalHealth > 10) return "La puntuación de salud mental debe ser entre 0 y 10.";
        if (numConflicts < 0 || numConflicts > 100) return "Los conflictos deben ser entre 0 y 100.";
        if (numAddictedScore < 0 || numAddictedScore > 10) return "La puntuación de adicción debe ser entre 0 y 10.";
        if (numAffectsAcademic !== 0 && numAffectsAcademic !== 1) return "El impacto académico debe ser 0 o 1.";

        if (!validValues.Gender.includes(Gender)) return `Género no válido. Opciones válidas: ${validValues.Gender.join(', ')}.`;
        if (!validValues.Country.includes(Country)) return `País no válido. Opciones válidas: ${validValues.Country.join(', ')}.`;
        if (!validValues.Academic_Level.includes(Academic_Level)) return `Nivel académico no válido. Opciones válidas: ${validValues.Academic_Level.join(', ')}.`;
        if (!validValues.Most_Used_Platform.includes(Most_Used_Platform)) return `Plataforma no válida. Opciones válidas: ${validValues.Most_Used_Platform.join(', ')}.`;
        if (!validValues.Relationship_Status.includes(Relationship_Status)) return `Estado civil no válido. Opciones válidas: ${validValues.Relationship_Status.join(', ')}.`;

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPredictions(null);
        setPlots(null);
        setLoading(true);

        console.log("Form data being sent:", formData); // Debugging

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setLoading(false);
            return;
        }

        // Convertir valores numéricos antes de enviar
        const payload = {
            ...formData,
            Age: parseInt(formData.Age),
            Avg_Daily_Usage_Hours: parseFloat(formData.Avg_Daily_Usage_Hours),
            Sleep_Hours_Per_Night: parseFloat(formData.Sleep_Hours_Per_Night),
            Mental_Health_Score: parseFloat(formData.Mental_Health_Score),
            Conflicts_Over_Social_Media: parseInt(formData.Conflicts_Over_Social_Media),
            Addicted_Score: parseFloat(formData.Addicted_Score),
            Affects_Academic_Performance: parseInt(formData.Affects_Academic_Performance)
        };

        try {
            const response = await axios.post('http://localhost:8000/api/predict-all', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.status === 'success') {
                setPredictions(response.data.predictions);
                setPlots(response.data.plots);
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

    return (
        <div className="container mx-auto p-4 max-w-6xl bg-blue-100">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">Predicción de Comportamiento en Redes Sociales</h1>
                <p className="text-gray-600">Completa el formulario para obtener un análisis personalizado</p>
            </div>

            {/* Sección del formulario */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Información Personal</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Campos obligatorios */}
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
                                    min="9"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Puntuación de salud mental (0-10) *</label>
                                <input
                                    type="number"
                                    name="Mental_Health_Score"
                                    value={formData.Mental_Health_Score}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 8"
                                    step="0.1"
                                    min="0"
                                    max="10"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Puntuación de adicción (0-10) *</label>
                                <input
                                    type="number"
                                    name="Addicted_Score"
                                    value={formData.Addicted_Score}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ej. 5"
                                    step="0.1"
                                    min="0"
                                    max="10"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Afecta el rendimiento académico *</label>
                                <select
                                    name="Affects_Academic_Performance"
                                    value={formData.Affects_Academic_Performance}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="0">No</option>
                                    <option value="1">Sí</option>
                                </select>
                            </div>
                        </div>

                        {/* Campos opcionales */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                                <select
                                    name="Gender"
                                    value={formData.Gender}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {validValues.Gender.map(gender => (
                                        <option key={gender} value={gender}>{gender}</option>
                                    ))}
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
                                    {validValues.Relationship_Status.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                                <select
                                    name="Country"
                                    value={formData.Country}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {validValues.Country.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel académico</label>
                                <select
                                    name="Academic_Level"
                                    value={formData.Academic_Level}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="" disabled>Selecciona un nivel académico</option>
                                    {validValues.Academic_Level.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
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
                                    {validValues.Most_Used_Platform.map(platform => (
                                        <option key={platform} value={platform}>{platform}</option>
                                    ))}
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
                                'Analizar mi comportamiento en redes sociales'
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                            <div className="flex items-center text-red-700">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}
                </form>
            </div>

            {/* Sección de resultados */}
            {predictions && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('predictions')}
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'predictions' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                Predicciones
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
                                    <p className="mt-2 text-gray-600">Basado en los datos proporcionados, aquí están las predicciones para tu comportamiento en redes sociales.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(predictions).map(([key, prediction]) => (
                                        renderPredictionCard(key, prediction)
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {Object.entries(plots).map(([key, plot]) => (
                                    <div key={key}>
                                        <h3 className="text-xl font-semibold mb-4 text-gray-800">{predictionTitles[key.replace('_plot', '')] || key.replace('_plot', '')}</h3>
                                        {plot ? (
                                            <img
                                                src={`data:image/png;base64,${plot}`}
                                                alt={`Gráfico de ${predictionTitles[key.replace('_plot', '')] || key.replace('_plot', '')}`}
                                                className="w-full rounded-lg border border-gray-200"
                                            />
                                        ) : (
                                            <div className="bg-gray-100 p-8 text-center rounded-lg">
                                                <p className="text-gray-500">No hay datos disponibles para este gráfico</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};