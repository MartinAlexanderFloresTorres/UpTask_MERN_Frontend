import { useState } from "react";
import Swal from "sweetalert2";
import useProyectos from "../hooks/useProyectos";
import ButtonLoadDelete from "./ButtonLoadDelete";

const Colaborador = ({ colaborador }) => {
  const { nombre, email, _id } = colaborador;
  const [cargando, setCargando] = useState(false);
  const { eliminarColaborador } = useProyectos();

  const handleEliminar = async () => {
    Swal.fire({
      title: "¿Desea eliminar este colaborador?",
      text: "Recuerda que no se pueden revertir estos cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Deseo eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          setCargando(true);
          await eliminarColaborador(_id);
          setCargando(false);
        })();
      }
    });
  };
  return (
    <div className="border-b text-center md:text-left p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-xl mt-1 text-gray-600 break-all">{nombre}</p>
        <a
          href={`mailto:${email}`}
          target="_blank"
          className="text-sm text-sky-600 break-all hover:underline"
        >
          {email}
        </a>
      </div>
      <div className="sm:w-fit w-full">
        <div className="w-full" onClick={handleEliminar}>
          <ButtonLoadDelete estado={cargando}>
            {cargando ? "Eliminando..." : "Eliminar"}
          </ButtonLoadDelete>
        </div>
      </div>
    </div>
  );
};

export default Colaborador;
