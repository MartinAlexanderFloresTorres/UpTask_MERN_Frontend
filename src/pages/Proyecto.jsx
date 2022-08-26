import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import Colaborador from "../components/Colaborador";
import ModalFormTarea from "../components/ModalFormTarea";
import Opciones from "../components/Opciones";
import Tarea from "../components/Tarea";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";
import io from "socket.io-client";
import LoadProyectoPreview from "../components/LoadProyectoPreview";
import { formatearFecha } from "../helpers";
const socket = io(import.meta.env.VITE_BACKEND_URL);

const Proyecto = () => {
  const { id } = useParams();
  const {
    obtenerProyecto,
    proyecto,
    loadProyecto,
    noProyecto,
    handleModal,
    socketAgregarTarea,
    socketEliminarTarea,
    socketEditarTarea,
    socketCompletarTarea,
  } = useProyectos();

  useEffect(() => {
    obtenerProyecto(id);
  }, []);

  useEffect(() => {
    socket.emit("abrir-proyecto", id);
  }, []);

  useEffect(() => {
    socket.on("tarea-agregada", (tareaNueva) => {
      if (tareaNueva.proyecto === proyecto._id) {
        socketAgregarTarea(tareaNueva);
      }
    });
    socket.on("tarea-eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        socketEliminarTarea(tareaEliminada);
      }
    });
    socket.on("tarea-actualizada", (tarea) => {
      if (tarea.proyecto._id === proyecto._id) {
        socketEditarTarea(tarea);
      }
    });
    socket.on("estado-cambiado", (tarea) => {
      if (tarea.proyecto === proyecto._id) {
        socketCompletarTarea(tarea);
      }
    });
    return () => {
      socket.off("tarea-agregada");
      socket.off("tarea-eliminada");
      socket.off("tarea-actualizada");
      socket.off("estado-cambiado");
    };
  });

  // ES EL CREADOR
  const admin = useAdmin();

  const {
    nombre,
    colaboradores,
    descripcion,
    fechaEntrega,
    createdAt,
    updatedAt,
    cliente,
  } = proyecto;

  // Cargando proyecto
  if (loadProyecto) return <LoadProyectoPreview />;

  // si la url es incorrecta
  if (noProyecto)
    return (
      <Alerta alerta={{ error: true, msg: "No se encontro el Proyecto." }} />
    );

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-start md:justify-between  gap-6 md:gap-4">
        <div className="text-left w-full">
          <h1 className="font-bold mb-5 text-4xl break-all text-sky-600">
            {nombre}
          </h1>
          <div>
            <p className="allbreak-  text-gray-500">{descripcion}</p>
            <p className="break-all  text-gray-500">
              <span className="font-semibold text-gray-600">Cliente:</span>{" "}
              {cliente}
            </p>
            <p className="break-all  text-gray-500">
              <span className="font-semibold text-gray-600">Entrega:</span>{" "}
              {formatearFecha(fechaEntrega)}
            </p>
            <p className="break-all  text-gray-500">
              <span className="font-semibold text-gray-600">Creado:</span>{" "}
              {formatearFecha(createdAt)}
            </p>
            <p className="break-all  text-gray-500">
              <span className="font-semibold text-gray-600">
                Actualización:
              </span>{" "}
              {formatearFecha(updatedAt)}
            </p>
          </div>
        </div>
        <div className="mr-auto md:mr-0">{admin && <Opciones />}</div>
      </div>
      {admin && (
        <button
          onClick={handleModal}
          className="bg-sky-400 hover:bg-sky-500 justify-center transition-colors text-xl text-white md:w-auto rounded-lg font-bold text-center mt-8 md:mt-5 px-5 py-3 w-full flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
          Nueva Tarea
        </button>
      )}

      <ModalFormTarea />

      <h2 className="font-bold text-2xl sm:text-3xl text-gray-600 mt-10 mb-10">
        Tareas del Proyecto
      </h2>
      <div className="bg-white shadow rounded-lg">
        {proyecto.tareas?.length > 0 ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="text-center py-10 p-5 text-gray-600">
            No hay tareas en este Proyecto
          </p>
        )}
      </div>

      {admin && (
        <>
          <div className="flex items-center justify-between mt-5">
            <h2 className="font-bold text-2xl sm:text-3xl text-gray-600 mt-10 mb-10">
              Colaboradores
            </h2>
            <Link
              to={`/proyectos/nuevo-colaborador/${id}`}
              className={
                "text-gray-400 hover:text-gray-800 cursor-pointer flex items-center gap-2  transition-all uppercase font-bold px-5 py-3"
              }
            >
              Añadir
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>

          <div className="bg-white shadow rounded-lg">
            {colaboradores.length > 0 ? (
              colaboradores.map((colaborador) => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))
            ) : (
              <p className="text-center py-10 p-5 text-gray-600">
                No hay colaboradores en este Proyecto.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Proyecto;
