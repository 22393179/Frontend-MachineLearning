import { useState } from 'react';

export default function Form() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    academicLevel: "",
    country: "",
    avgDailyUsageHours: "",
    mostUsedPlatform: "",
    affectsAcademicPerformance: false,
    sleepHoursPerNight: "",
    mentalHealthScore: "",
    relationshipStatus: "",
    conflictsOverSocialMedia: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí iría la lógica para enviar los datos
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Student Social Media Usage Survey
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección de Información Demográfica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Edad
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                min="16"
                max="30"
                required
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Género
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccionar</option>
                <option value="Male">Hombre</option>
                <option value="Female">Mujer</option>
                <option value="Other">otro</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="academicLevel"
                className="block text-sm font-medium text-gray-700"
              >
                Nivel académico
              </label>
              <select
                id="academicLevel"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccionar</option>
                <option value="High School">Preparatoria</option>
                <option value="Undergraduate">Pregrado</option>
                <option value="Graduate">Posgrado</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          {/* Sección de Uso de Redes Sociales */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Social Media Usage
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="avgDailyUsageHours"
                  className="block text-sm font-medium text-gray-700"
                >
                  Average Daily Usage (Hours)
                </label>
                <input
                  type="number"
                  id="avgDailyUsageHours"
                  name="avgDailyUsageHours"
                  value={formData.avgDailyUsageHours}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  step="0.1"
                  min="0"
                  max="24"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mostUsedPlatform"
                  className="block text-sm font-medium text-gray-700"
                >
                  Most Used Platform
                </label>
                <select
                  id="mostUsedPlatform"
                  name="mostUsedPlatform"
                  value={formData.mostUsedPlatform}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Snapchat">Snapchat</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="affectsAcademicPerformance"
                  name="affectsAcademicPerformance"
                  checked={formData.affectsAcademicPerformance}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="affectsAcademicPerformance"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Affects Academic Performance
                </label>
              </div>
            </div>
          </div>

          {/* Sección de Salud y Relaciones */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Health & Relationships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="sleepHoursPerNight"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sleep Hours Per Night
                </label>
                <input
                  type="number"
                  id="sleepHoursPerNight"
                  name="sleepHoursPerNight"
                  value={formData.sleepHoursPerNight}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  step="0.1"
                  min="0"
                  max="12"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mentalHealthScore"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mental Health Score (1-10)
                </label>
                <input
                  type="number"
                  id="mentalHealthScore"
                  name="mentalHealthScore"
                  value={formData.mentalHealthScore}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="relationshipStatus"
                  className="block text-sm font-medium text-gray-700"
                >
                  Relationship Status
                </label>
                <select
                  id="relationshipStatus"
                  name="relationshipStatus"
                  value={formData.relationshipStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="In Relationship">In Relationship</option>
                  <option value="Complicated">Complicated</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="conflictsOverSocialMedia"
                  className="block text-sm font-medium text-gray-700"
                >
                  Conflicts Over Social Media (1-5)
                </label>
                <input
                  type="number"
                  id="conflictsOverSocialMedia"
                  name="conflictsOverSocialMedia"
                  value={formData.conflictsOverSocialMedia}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  max="5"
                  required
                />
              </div>
            </div>
          </div>

          {/* Botón de envío */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
