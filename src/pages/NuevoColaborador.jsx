import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import ButtonLoad from "../components/ButtonLoad";
import FormularioColaborador from "../components/FormularioColaborador";
import LoadColaborador from "../components/LoadColaborador";
import useProyectos from "../hooks/useProyectos";

const NuevoColaborador = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(false);
  const {
    obtenerProyecto,
    proyecto,
    loadProyecto,
    noProyecto,
    setColaborador,
    colaborador,
    agregarColaborador,
  } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
    setColaborador({});
  }, []);

  const { nombre } = proyecto;

  // Cargando proyecto
  if (loadProyecto) return <LoadColaborador />;
  // si la url es incorrecta
  if (noProyecto)
    return (
      <Alerta
        alerta={{
          error: true,
          msg: "No se encontro el Proyecto URL invalida.",
        }}
      />
    );

  const handleAñadir = async () => {
    setCargando(true);
    await agregarColaborador({ email: colaborador?.email });
    setCargando(false);
  };
  return (
    <>
      <h1 className="font-bold text-center  text-4xl break-all md:w-full max-w-4xl mx-auto text-sky-600">
        Anadir colaborador(a): <span className="text-gray-600">{nombre}</span>
      </h1>
      <FormularioColaborador />

      <div className="md:w-full max-w-4xl  my-10 mx-auto">
        {colaborador?._id && (
          <div className="p-5 bg-white shadow rounded-lg flex flex-col text-center md:text-left md:flex-row gap-4 justify-between items-center">
            <h3 className="font-semibold text-xl text-gray-700 w-full col-span-4 break-all">
              {colaborador?.nombre}
            </h3>
            <span onClick={handleAñadir} className="w-full md:w-fit block">
              <ButtonLoad estado={cargando}>
                {cargando ? "Añadiendo..." : "Añadir"}
              </ButtonLoad>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default NuevoColaborador;
