import { useState } from "react";
import {
  FaUser,
  FaGlobe,
  FaBook,
  FaHeart,
  FaMoon,
  FaBrain,
  FaComments,
} from "react-icons/fa";
import Swal from "sweetalert2";

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
    addictedScore: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "age",
      "gender",
      "academicLevel",
      "country",
      "avgDailyUsageHours",
      "mostUsedPlatform",
      "sleepHoursPerNight",
      "mentalHealthScore",
      "relationshipStatus",
      "conflictsOverSocialMedia",
      "addictedScore",
    ];

    const emptyFields = requiredFields.filter(
      (field) => formData[field] === ""
    );

    if (emptyFields.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de enviar el formulario.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    if (Number(formData.age) < 8 || Number(formData.age) > 90) {
      Swal.fire({
        icon: "warning",
        title: "Edad fuera de rango",
        text: "La edad debe estar entre 8 y 90 años.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const usage = Number(formData.avgDailyUsageHours);
    if (usage < 0 || usage > 24) {
      Swal.fire({
        icon: "warning",
        title: "Uso diario inválido",
        text: "El uso diario de redes debe estar entre 0 y 24 horas.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const sleepHours = Number(formData.sleepHoursPerNight);
    if (sleepHours < 0 || sleepHours > 12) {
      Swal.fire({
        icon: "warning",
        title: "Horas de sueño inválidas",
        text: "Las horas de sueño deben estar entre 0 y 12.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    if (isSubmitting) return; // previene doble clic
    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendURL}/api/insertSocialMedia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Age: Number(formData.age),
          Gender: formData.gender,
          Academic_Level: formData.academicLevel,
          Country: formData.country,
          Avg_Daily_Usage_Hours: Number(formData.avgDailyUsageHours),
          Most_Used_Platform: formData.mostUsedPlatform,
          Affects_Academic_Performance: formData.affectsAcademicPerformance
            ? 1
            : 0,
          Sleep_Hours_Per_Night: Number(formData.sleepHoursPerNight),
          Mental_Health_Score: Number(formData.mentalHealthScore),
          Relationship_Status: formData.relationshipStatus,
          Conflicts_Over_Social_Media: Number(
            formData.conflictsOverSocialMedia
          ),
          Addicted_Score: Number(formData.addictedScore),
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      // SweetAlert para éxito
      Swal.fire({
        icon: "success",
        title: "¡Formulario enviado!",
        text: "Tus respuestas se enviaron correctamente.",
        confirmButtonColor: "#2563eb",
      });
      setFormData({
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
        addictedScore: "",
      });
    } catch (error) {
      console.error(error);
      // SweetAlert para error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al enviar el formulario.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <Input
              label="Edad"
              name="age"
              value={formData.age}
              onChange={handleChange}
              type="number"
              min="8"
              max="90"
              icon={<FaUser />}
            />
            <Select
              label="Género"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Hombre", "Mujer", "Otro"]}
            />
            <Select
              label="Nivel académico"
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              options={[
                "Primaria",
                "Secundaria",
                "Preparatoria",
                "Técnico Superior Universitario",
                "Ingeniero/a",
                "Licencio/a)",
              ]}
              icon={<FaBook />}
            />
            <Select
              label="País"
              name="country"
              value={formData.country}
              onChange={handleChange}
              options={[
                "México",
                "Colombia",
                "Argentina",
                "Perú",
                "Chile",
                "España",
                "Estados Unidos",
                "Brasil",
                "Ecuador",
                "Guatemala",
              ]}
              icon={<FaGlobe />}
            />
          </div>

          {/* Uso de redes sociales */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              📱 Uso de redes sociales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Uso diario promedio (hrs)"
                placeholder="3"
                name="avgDailyUsageHours"
                value={formData.avgDailyUsageHours}
                onChange={handleChange}
                type="number"
                min="0"
                max="24"
              />
              <Select
                label="Plataforma más usada"
                name="mostUsedPlatform"
                value={formData.mostUsedPlatform}
                onChange={handleChange}
                options={[
                  "Instagram",
                  "TikTok",
                  "Facebook",
                  "Twitter",
                  "Snapchat",
                  "YouTube",
                  "LinkedIn",
                  "WhatsApp",
                  "Telegram",
                  "Discord",
                  "Otra",
                ]}
              />
              <Input
                label="Nivel de adicción a las redes sociales (1-10)"
                placeholder="5"
                name="addictedScore"
                value={formData.addictedScore}
                onChange={handleChange}
                type="number"
                min="1"
                max="10"
              />
              <Select
                label="¿Afecta tu desempeño académico las redes sociales?"
                name="affectsAcademicPerformance"
                value={formData.affectsAcademicPerformance ? "Sí" : "No"}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    affectsAcademicPerformance: e.target.value === "Sí",
                  }))
                }
                options={["Sí", "No"]}
              />
            </div>
          </div>

          {/* Salud y relaciones */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💬 Salud y relaciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Horas de sueño por noche"
                placeholder="7"
                name="sleepHoursPerNight"
                value={formData.sleepHoursPerNight}
                onChange={handleChange}
                type="number"
                icon={<FaMoon />}
              />
              <Input
                label="Salud mental (1-10)"
                placeholder="Que tan bien te sientes"
                name="mentalHealthScore"
                value={formData.mentalHealthScore}
                onChange={handleChange}
                type="number"
                min="1"
                max="10"
                icon={<FaBrain />}
              />
              <Select
                label="Estado sentimental"
                name="relationshipStatus"
                value={formData.relationshipStatus}
                onChange={handleChange}
                options={[
                  "Soltero/a",
                  "En una relación",
                  "Casado/a",
                  "Complicado",
                ]}
                icon={<FaHeart />}
              />
              <Input
                label="Conflictos por redes (0-5)"
                placeholder="Promedio de conflictos por redes"
                name="conflictsOverSocialMedia"
                value={formData.conflictsOverSocialMedia}
                onChange={handleChange}
                type="number"
                min="0"
                max="5"
                icon={<FaComments />}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Enviando..." : "Enviar respuestas"}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm italic mt-8">
          Información recaudada con fines educativos
        </p>
        <p className="text-center text-gray-600 text-sm italic mt-1">
          Equipo 1 &mdash; Grupo:{" "}
          <span className="font-semibold text-blue-600">IDYGS92</span>
        </p>
      </div>
    </div>
  );
}

// Componentes reutilizables

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  icon = null,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {icon}
        </span>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm`}
        {...props}
      />
    </div>
  </div>
);

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  icon = null,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {icon}
        </span>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${
          icon ? "pl-10" : "pl-3"
        } pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm`}
      >
        <option value="">Seleccionar</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  </div>
);
