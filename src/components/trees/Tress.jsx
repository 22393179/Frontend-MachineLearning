import { getData } from "../../api/modelsApi";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Tress() {
  const [treeNumericBinary, setTreeNumericBinary] = useState(null);
  const [treeCategoricalInstagram, setTreeCategoricalInstagram] =
    useState(null);
  const [treeMixedConflict, setTreeMixedConflict] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [binaryRes, instagramRes, conflictRes] = await Promise.all([
          axios.get(`${getData}/tree/numeric-binary`),
          axios.get(`${getData}/tree/categorical-instagram`),
          axios.get(`${getData}/tree/mixed-conflict`),
        ]);

        if (binaryRes.status === 200 && binaryRes.data.image) {
          setTreeNumericBinary(`data:image/png;base64,${binaryRes.data.image}`);
        }

        if (instagramRes.status === 200 && instagramRes.data.image) {
          setTreeCategoricalInstagram(
            `data:image/png;base64,${instagramRes.data.image}`
          );
        }

        if (conflictRes.status === 200 && conflictRes.data.image) {
          setTreeMixedConflict(
            `data:image/png;base64,${conflictRes.data.image}`
          );
        }
      } catch (error) {
        console.error("Error al obtener los datos del gráfico:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Gráfico de Árboles de Decisión
        </h2>

        {treeNumericBinary ? (
          <img
            src={treeNumericBinary}
            alt="Gráfico de Árboles de Decisión Numérico Binario"
            className="w-full h-auto mb-4"
          />
        ) : (
          <p>Cargando gráfico de árboles numéricos binarios...</p>
        )}

        {treeCategoricalInstagram ? (
          <img
            src={treeCategoricalInstagram}
            alt="Gráfico de Árboles Categóricos Instagram"
            className="w-full h-auto mb-4"
          />
        ) : (
          <p>Cargando gráfico de árboles categóricos de Instagram...</p>
        )}

        {treeMixedConflict ? (
          <img
            src={treeMixedConflict}
            alt="Gráfico de Árboles Mixtos Conflicto"
            className="w-full h-auto mb-4"
          />
        ) : (
          <p>Cargando gráfico de árboles mixtos de conflicto...</p>
        )}
      </div>
    </>
  );
}
