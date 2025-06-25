import { useEffect, useState } from "react";
import axios from "axios";
import { getData } from "../../api/modelsApi";

export default function Cluster() {
  const [imagenBase64, setImagenBase64] = useState(null);

  useEffect(() => {
    const obtenerGrafico = async () => {
      try {
        const res = await axios.get(`${getData}/addict-age-daily-hours`);
        //console.log("Respuesta del servidor:", res.data);
        if (res.data.plot_base64) {
          setImagenBase64(res.data.plot_base64);
        } else {
          console.warn("La respuesta no contiene la imagen:", res.data);
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };

    obtenerGrafico();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Gráfico de Clustering
      </h2>

      {imagenBase64 ? (
        <img
          src={`data:image/png;base64,${imagenBase64}`}
          alt="Gráfico de adicción"
          className="rounded-lg w-full h-auto object-contain"
        />
      ) : (
        <p className="text-center text-gray-500">Cargando imagen...</p>
      )}
    </div>
  );
}
