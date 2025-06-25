import { useState } from 'react';
import { FaUser, FaGlobe, FaBook, FaHeart, FaMoon, FaBrain, FaComments } from 'react-icons/fa';

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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
          🧑‍🎓 Encuesta de Redes Sociales
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Ayúdanos respondiendo honestamente
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Demográfica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Edad" name="age" value={formData.age} onChange={handleChange} type="number" min="16" max="30" icon={<FaUser />} />
            <Select label="Género" name="gender" value={formData.gender} onChange={handleChange} options={["Hombre", "Mujer", "Otro"]} />
            <Select label="Nivel académico" name="academicLevel" value={formData.academicLevel} onChange={handleChange} options={["Preparatoria", "Pregrado", "Posgrado"]} icon={<FaBook />} />
            <Input label="País" name="country" value={formData.country} onChange={handleChange} icon={<FaGlobe />} />
          </div>

          {/* Uso de redes sociales */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📱 Uso de redes sociales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Uso diario promedio (hrs)" name="avgDailyUsageHours" value={formData.avgDailyUsageHours} onChange={handleChange} type="number" min="0" max="24" />
              <Select label="Plataforma más usada" name="mostUsedPlatform" value={formData.mostUsedPlatform} onChange={handleChange} options={["Instagram", "TikTok", "Facebook", "Twitter", "Snapchat", "YouTube", "LinkedIn", "Otra"]} />
              <div className="flex items-center col-span-full">
                <input
                  type="checkbox"
                  id="affectsAcademicPerformance"
                  name="affectsAcademicPerformance"
                  checked={formData.affectsAcademicPerformance}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="affectsAcademicPerformance" className="ml-2 text-sm text-gray-700">
                  Afecta tu desempeño académico
                </label>
              </div>
            </div>
          </div>

          {/* Salud y relaciones */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Salud y relaciones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Horas de sueño por noche" name="sleepHoursPerNight" value={formData.sleepHoursPerNight} onChange={handleChange} type="number" min="0" max="12" icon={<FaMoon />} />
              <Input label="Salud mental (1-10)" name="mentalHealthScore" value={formData.mentalHealthScore} onChange={handleChange} type="number" min="1" max="10" icon={<FaBrain />} />
              <Select label="Estado sentimental" name="relationshipStatus" value={formData.relationshipStatus} onChange={handleChange} options={["Soltero/a", "En una relación", "Complicado"]} icon={<FaHeart />} />
              <Input label="Conflictos por redes (1-5)" name="conflictsOverSocialMedia" value={formData.conflictsOverSocialMedia} onChange={handleChange} type="number" min="0" max="5" icon={<FaComments />} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition"
            >
              Enviar respuestas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componentes reutilizables

const Input = ({ label, name, value, onChange, type = "text", icon = null, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm`}
        {...props}
      />
    </div>
  </div>
);

const Select = ({ label, name, value, onChange, options = [], icon = null }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? "pl-10" : "pl-3"} pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm`}
      >
        <option value="">Seleccionar</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);
