import { useEffect } from "react";
import LoadProyecto from "../components/LoadProyecto";
import PreviewProyecto from "../components/PreviewProyecto";
import useProyectos from "../hooks/useProyectos";

const Proyectos = () => {
  const { proyectos, cargando, setLoadProyecto } = useProyectos();
  useEffect(() => {
    setLoadProyecto(true);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold text-sky-600">Proyectos</h1>
      {cargando ? (
        <div className="flex flex-col bg-white shadow rounded-lg mt-10">
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
          <LoadProyecto />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg mt-10">
          {proyectos.length > 0 ? (
            proyectos.map((proyecto) => (
              <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
            ))
          ) : (
            <p className="text-gray-600 uppercase text-center p-5">
              No hay proyectos aun
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Proyectos;
