import Cluster from "../components/clusters/cluster";
import RegresionLineal from "../components/lineal_regressions/RegresionLineal";
import RegresionLogica from "../components/logical_regresions/RegresionLogica";
import Tress from "../components/trees/Tress";

export default function Predictions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Predicciones de los modelos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
              Clustering
            </h2>
            <Cluster />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
              Regresión Lineal
            </h2>
            <RegresionLineal />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
              Regresión Lógica
            </h2>
            <RegresionLogica />
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-center text-blue-600 mb-4">
              Árboles de Decisión
            </h2>
            <Tress />
          </div>
        </div>
      </div>
    </div>
  );
}
