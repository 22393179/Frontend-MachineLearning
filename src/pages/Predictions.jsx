import Cluster from "../components/clusters/cluster";
import RegresionLineal from "../components/lineal_regressions/RegresionLineal";
import RegresionLogica from "../components/logical_regresions/RegresionLogica";
import Tress from "../components/trees/Tress";

export default function Predictions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Predicciones con Modelos de Machine Learning
        </h1>

        <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
              Clustering
            </h2>
            <Cluster />

            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">
              Regresión Lineal
            </h2>
            <RegresionLineal />

            <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
              Regresión Lógica
            </h2>
            <RegresionLogica />

            <h2 className="text-2xl font-semibold text-center text-orange-600 mb-4">
              Árboles de Decisión
            </h2>
            <Tress />
        </div>
      </div>
    </div>
  );
}
