import OpcionesTareas from "./OpcionesTareas";
import { formatearFecha } from "../helpers";

const Tarea = ({ tarea }) => {
  const { nombre, descripcion, prioridad, fechaEntrega, estado, completado } =
    tarea;

  return (
    <div className="border-b p-5 flex flex-col md:flex-row md:justify-between gap-4 items-center relative">
      <span
        className={`absolute w-3 h-3 rounded-full right-5 top-7 md:left-5 ${
          estado ? "bg-green-500" : "bg-gray-600"
        }`}
      ></span>
      <div className="text-left w-full">
        <p className="mb-1 md:pl-5  text-gray-600 text-xl font-bold break-all">
          {nombre}
        </p>
        <p className="mb-1 text-sm text-gray-500 uppercase break-all">
          {descripcion}
        </p>
        <p className="mb-1 text-lg">
          {" "}
          <span className="font-black text-xl text-gray-600">
            Entrega:{" "}
          </span>{" "}
          {formatearFecha(fechaEntrega)}
        </p>
        <p className="mb-1 text-gray-600">Prioridad: {prioridad}</p>
        {estado && completado?.nombre && (
          <p className="text-xs bg-green-700 uppercase text-white rounded px-3 py-1 font-bold w-fit break-all">
            Completado por: {completado?.nombre}
          </p>
        )}
      </div>
      <OpcionesTareas tarea={tarea} />
    </div>
  );
};

export default Tarea;
