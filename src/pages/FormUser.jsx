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
    const [scatterPlot, setScatterPlot] = useState(null);
    const [histogramPlot, setHistogramPlot] = useState(null);
    const [treePlot, setTreePlot] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { Age, Avg_Daily_Usage_Hours, Sleep_Hours_Per_Night, Conflicts_Over_Social_Media, Gender } = formData;
        if (!Age || !Avg_Daily_Usage_Hours || !Sleep_Hours_Per_Night || !Conflicts_Over_Social_Media || !Gender) {
            return "Todos los campos obligatorios deben estar completos.";
        }
        const age = parseInt(Age);
        const usage = parseFloat(Avg_Daily_Usage_Hours);
        const sleep = parseFloat(Sleep_Hours_Per_Night);
        const conflicts = parseInt(Conflicts_Over_Social_Media);
        if (isNaN(age) || isNaN(usage) || isNaN(sleep) || isNaN(conflicts)) {
            return "Los campos numéricos deben contener valores válidos.";
        }
        if (age < 0 || usage < 0 || sleep < 0 || conflicts < 0) {
            return "Los campos numéricos no pueden ser negativos.";
        }
        return null;
    };

    const handleSubmit = async () => {
        setError(null);
        setPredictions(null);
        setScatterPlot(null);
        setHistogramPlot(null);
        setTreePlot(null);
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
                setScatterPlot(response.data.plots.scatter_plot);
                setHistogramPlot(response.data.plots.histogram_plot);
                setTreePlot(response.data.plots.tree_plot);
            } else {
                setError(response.data.error || 'Error del servidor.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'No se pudo conectar con el servidor. Asegúrate de que el backend esté en ejecución.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold text-center mb-6">Predicción de Adicción a Redes Sociales</h1>

            {/* Sección del formulario */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-4">Ingresa tu información</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Edad</label>
                        <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej. 20" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Horas de uso diario</label>
                        <input type="number" name="Avg_Daily_Usage_Hours" value={formData.Avg_Daily_Usage_Hours} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej. 5.5" step="0.1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Horas de sueño por noche</label>
                        <input type="number" name="Sleep_Hours_Per_Night" value={formData.Sleep_Hours_Per_Night} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej. 6.5" step="0.1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Conflictos por redes sociales</label>
                        <input type="number" name="Conflicts_Over_Social_Media" value={formData.Conflicts_Over_Social_Media} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej. 2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Género</label>
                        <select name="Gender" value={formData.Gender} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md">
                            <option value="Male">Masculino</option>
                            <option value="Female">Femenino</option>
                            <option value="Other">Otro</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estado civil</label>
                        <select name="Relationship_Status" value={formData.Relationship_Status} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md">
                            <option value="Single">Soltero/a</option>
                            <option value="In Relationship">En una relación</option>
                            <option value="Complicated">Es complicado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">País</label>
                        <input type="text" name="Country" value={formData.Country} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" placeholder="Ej. México" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nivel académico</label>
                        <select name="Academic_Level" value={formData.Academic_Level} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md">
                            <option value="High School">Preparatoria</option>
                            <option value="Undergraduate">Licenciatura</option>
                            <option value="Graduate">Posgrado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Plataforma más usada</label>
                        <select name="Most_Used_Platform" value={formData.Most_Used_Platform} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md">
                            <option value="Instagram">Instagram</option>
                            <option value="Twitter">Twitter</option>
                            <option value="TikTok">TikTok</option>
                            <option value="YouTube">YouTube</option>
                            <option value="Facebook">Facebook</option>
                            <option value="WeChat">WeChat</option>
                        </select>
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? 'Prediciendo...' : 'Predecir nivel de adicción'}
                </button>
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </div>

            {/* Resultados */}
            {predictions && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Resultados de la predicción</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">Modelos de regresión lineal</h3>
                            <p>Uso y sueño: {predictions.linear_regression.model_1_usage_sleep}</p>
                            <p>Edad y salud mental: {predictions.linear_regression.model_2_age_mental}</p>
                            <p>Conflictos y salud mental: {predictions.linear_regression.model_3_conflicts_mental}</p>
                            <p className="text-sm text-gray-600">{predictions.linear_regression.note}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Clasificación binaria (logística)</h3>
                            <p>Predicción: {predictions.logistic_binary.prediction === 1 ? 'Alta' : 'Baja'}</p>
                            <p>Probabilidad de adicción alta: {predictions.logistic_binary.probability_high}</p>
                            <p>{predictions.logistic_binary.interpretation}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Clasificación multiclase (logística)</h3>
                            <p>Predicción: {predictions.logistic_multiclass.prediction}</p>
                            <p>Probabilidades:
                                Bajo: {predictions.logistic_multiclass.probabilities.Bajo},
                                Medio: {predictions.logistic_multiclass.probabilities.Medio},
                                Alto: {predictions.logistic_multiclass.probabilities.Alto}
                            </p>
                            <p>{predictions.logistic_multiclass.interpretation}</p>
                            <p className="text-sm text-gray-600">{predictions.logistic_multiclass.note}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Árbol de decisión (binario)</h3>
                            <p>Predicción: {predictions.decision_tree_binary.prediction === 1 ? 'Alta' : 'Baja'}</p>
                            <p>{predictions.decision_tree_binary.interpretation}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Visualizaciones */}
            {(scatterPlot || histogramPlot || treePlot) && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Visualizaciones</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scatterPlot && (
                            <div>
                                <h3 className="text-lg font-medium">Uso diario vs. nivel de adicción</h3>
                                <img src={`data:image/png;base64,${scatterPlot}`} alt="Gráfico de dispersión" className="w-full rounded-md" />
                                {error && error.includes("No valid data for scatter plot") && (
                                    <p className="text-red-500 text-sm mt-2">Advertencia: No se mostraron datos válidos para el gráfico de dispersión.</p>
                                )}
                            </div>
                        )}
                        {histogramPlot && (
                            <div>
                                <h3 className="text-lg font-medium">Distribución del nivel de adicción</h3>
                                <img src={`data:image/png;base64,${histogramPlot}`} alt="Histograma" className="w-full rounded-md" />
                            </div>
                        )}
                        {treePlot && (
                            <div className="md:col-span-2">
                                <h3 className="text-lg font-medium">Árbol de decisión para clasificación binaria</h3>
                                <img src={`data:image/png;base64,${treePlot}`} alt="Árbol de decisión" className="w-full rounded-md" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
