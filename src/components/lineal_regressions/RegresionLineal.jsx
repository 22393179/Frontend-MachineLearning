import axios from "axios";
import { useEffect, useState } from "react";
import { getData } from "../../api/modelsApi";

export default function RegresionLineal() {
  const [predictAddiction1, setpredictAddiction1] = useState(null);
  const [predictAddiction2, setpredictAddiction2] = useState(null);
  const [predictAddiction3, setpredictAddiction3] = useState(null);

  useEffect(() => {
    const obtenerGraficoPredict1 = async () => {
      try {
        const res = await axios.get(`${getData}/predict-addiction-1`);
        console.log("Respuesta del servidor:", res.data);
        if (res.data.image) {
          setpredictAddiction1(res.data.image);
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };

    obtenerGraficoPredict1();
  }, []);

  useEffect(() => {
    const obtenerGraficoPredict2 = async () => {
      try {
        const res = await axios.get(`${getData}/predict-addiction-2`);
        console.log("Respuesta del servidor:", res.data);
        if (res.data.image) {
          setpredictAddiction2(res.data.image);
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };
    obtenerGraficoPredict2();
  }, []);

  useEffect(() => {
    const obtenerGraficoPredict3 = async () => {
      try {
        const res = await axios.get(`${getData}/predict-addiction-3`);
        console.log("Respuesta del servidor:", res.data);
        if (res.data.image) {
          setpredictAddiction3(res.data.image);
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };
    obtenerGraficoPredict3();
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Gráfico de Regresión Lineal
        </h2>

        {predictAddiction1 ? (
          <img
            src={`data:image/png;base64,${predictAddiction1}`}
            alt="Gráfico de adicción"
            className="rounded-lg w-full h-auto object-contain"
          />
        ) : (
          <p className="text-center text-gray-500">Cargando imagen...</p>
        )}
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Gráfico de Regresión Lineal 2
        </h2>

        {predictAddiction2 ? (
          <img
            src={`data:image/png;base64,${predictAddiction2}`}
            alt="Gráfico de adicción"
            className="rounded-lg w-full h-auto object-contain"
          />
        ) : (
          <p className="text-center text-gray-500">Cargando imagen...</p>
        )}
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Gráfico de Regresión Lineal 3
        </h2>

        {predictAddiction3 ? (
          <img
            src={`data:image/png;base64,${predictAddiction3}`}
            alt="Gráfico de adicción"
            className="rounded-lg w-full h-auto object-contain"
          />
        ) : (
          <p className="text-center text-gray-500">Cargando imagen...</p>
        )}
      </div>
    </>
  );
}
