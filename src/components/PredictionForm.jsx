import { useState } from 'react';
import { predict } from '../services/api';

const models = [
  { id: 'logistic', name: 'Regresión Logística' },
  { id: 'random_forest', name: 'Random Forest' },
  { id: 'knn', name: 'KNN' }
];

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    age: '',
    social_media_hours: '',
    gender: 'male'
  });
  const [selectedModel, setSelectedModel] = useState('logistic');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const prediction = await predict(selectedModel, formData);
      setResult(prediction);
    } catch (error) {
      alert('Error al realizar la predicción');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Predicción de Adicción a Redes Sociales
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Modelo:</label>
          <select 
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Campos del formulario */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Edad:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Horas en redes sociales:</label>
          <input
            type="number"
            step="0.1"
            name="social_media_hours"
            value={formData.social_media_hours}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Género:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isLoading ? 'Procesando...' : 'Predecir'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">Resultado:</h3>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="font-medium">Modelo usado:</span> <span className="text-blue-600">{result.model}</span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Predicción:</span> <span className={result.prediction === 1 ? 'text-red-600' : 'text-green-600'}>
                {result.prediction === 1 ? 'Alto riesgo' : 'Bajo riesgo'}
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium">Probabilidad:</span> <span className="text-blue-600">
                {(result.probability * 100).toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}