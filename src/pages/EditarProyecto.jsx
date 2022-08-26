import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import FormularioProyecto from "../components/FormularioProyecto";
import useProyectos from "../hooks/useProyectos";
import LoadFormulario from "../components/LoadFormulario";

const EditarProyecto = () => {
  const { id } = useParams();
  const { obtenerProyecto, proyecto, loadProyecto, noProyecto } =
    useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);
  const { nombre } = proyecto;

  // cargando proyecto
  if (loadProyecto) return <LoadFormulario />;

  // si la url es incorrecta
  if (noProyecto)
    return (
      <Alerta
        alerta={{ error: true, msg: "No se encontro el Proyecto a editar." }}
      />
    );
  return (
    <div className="md:w-full max-w-4xl mx-auto">
      <h1 className="font-bold text-center text-4xl break-all text-sky-600">
        Editar Proyecto: <span className="text-gray-600">{nombre}</span>
      </h1>
      <FormularioProyecto />
    </div>
  );
};

export default EditarProyecto;
