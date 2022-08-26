import { useState } from "react";
import Swal from "sweetalert2";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";

const OpcionesTareas = ({ tarea }) => {
  const [cargando, setCargando] = useState(false);
  const { estado, _id } = tarea;
  const { handleSetEditarTarea, eliminarTarea, completarTarea } =
    useProyectos();

  const admin = useAdmin();

  const handleTareaEstado = async () => {
    setCargando(true);
    await completarTarea(_id);
    setCargando(false);
  };

  const handleClickOpciones = () => {
    Swal.fire({
      title: "Elija una opcion",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Editar",
      denyButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSetEditarTarea(tarea);
      } else if (result.isDenied) {
        eliminarTarea(tarea);
      }
    });
  };

  return admin ? (
    <div className="md:flex-col md:w-fit w-full flex items-center gap-2">
      <button
        className=" bg-sky-600 hover:bg-sky-700 transition-colors px-4 py-3 text-white font-bold uppercase text-center rounded-lg text-sm w-full"
        onClick={handleClickOpciones}
      >
        Opciones
      </button>
      <button
        onClick={handleTareaEstado}
        disabled={cargando}
        className={`${
          estado
            ? "bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400"
            : "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400"
        } transition-colors px-4 py-3 text-white font-bold uppercase text-center rounded-lg text-sm w-full `}
      >
        {estado
          ? cargando
            ? "InCompletando..."
            : "Completado"
          : cargando
          ? "Completando..."
          : "Incompleto"}
      </button>
    </div>
  ) : (
    <button
      onClick={handleTareaEstado}
      disabled={cargando}
      className={`${
        estado
          ? "bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400"
          : "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400"
      } transition-colors px-4 py-3 text-white font-bold uppercase text-center rounded-lg text-sm w-full sm:w-fit self-end md:self-auto`}
    >
      {estado
        ? cargando
          ? "InCompletando..."
          : "Completado"
        : cargando
        ? "Completando..."
        : "Incompleto"}
    </button>
  );
};

export default OpcionesTareas;
