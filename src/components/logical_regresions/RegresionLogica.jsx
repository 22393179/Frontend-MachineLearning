import { getData } from "../../api/modelsApi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RegresionLogica() {
  const [logisticBinary, setLogisticBinary] = useState(null);
  const [logisticMulticlass, setLogisticMulticlass] = useState(null);
  const [logisticRegularized, setLogisticRegularized] = useState(null);
  const [logisticPlatform, setLogisticPlatform] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [binaryRes, multiRes, regularizedRes, platformRes] =
          await Promise.all([
            axios.get(`${getData}/logistic/binary`),
            axios.get(`${getData}/logistic/multiclass`),
            axios.get(`${getData}/logistic/regularized`),
            axios.get(`${getData}/logistic/platform`),
          ]);

        if (binaryRes.data.status === "success") {
          setLogisticBinary(`data:image/png;base64,${binaryRes.data.data}`);
        }

        if (multiRes.data.status === "success") {
          setLogisticMulticlass(`data:image/png;base64,${multiRes.data.data}`);
        }

        if (regularizedRes.data.status === "success") {
          setLogisticRegularized(
            `data:image/png;base64,${regularizedRes.data.data}`
          );
        }

        if (platformRes.data.status === "success") {
          setLogisticPlatform(`data:image/png;base64,${platformRes.data.data}`);
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Gráfico de Regresión Lógica
      </h2>

      {logisticBinary ? (
        <img
          src={logisticBinary}
          alt="Gráfico de Regresión Lógica Binaria"
          className="w-full h-auto mb-4"
        />
      ) : (
        <p>Cargando gráfico de regresión lógica binaria...</p>
      )}

      {logisticMulticlass ? (
        <img
          src={logisticMulticlass}
          alt="Gráfico de Regresión Lógica Multiclase"
          className="w-full h-auto mb-4"
        />
      ) : (
        <p>Cargando gráfico de regresión lógica multiclase...</p>
      )}

      {logisticRegularized ? (
        <img
          src={logisticRegularized}
          alt="Gráfico de Regresión Lógica Regularizada"
          className="w-full h-auto mb-4"
        />
      ) : (
        <p>Cargando gráfico de regresión lógica regularizada...</p>
      )}

      {logisticPlatform ? (
        <img
          src={logisticPlatform}
          alt="Gráfico de Regresión Lógica en Plataforma"
          className="w-full h-auto mb-4"
        />
      ) : (
        <p>Cargando gráfico de regresión lógica en plataforma...</p>
      )}
    </div>
  );
}
