import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, cliente, _id, creador } = proyecto;

  return (
    <div className="text-center sm:text-left border-b p-5 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div>
          <p className="flex-1 break-all">{nombre}</p>
          <span className="text-sm text-gray-500 uppercase break-all">
            {" "}
            {cliente}
          </span>
        </div>
        {auth._id !== creador && (
          <p className="bg-green-500 text-white px-4 py-1 text-sm font-bold rounded-lg">
            Colaborador
          </p>
        )}
      </div>
      <Link
        to={`${_id}`}
        className="text-gray-500 block hover:text-gray-800 text-center uppercase text-sm font-bold px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-md shadow-sm border"
      >
        Ver Proyecto
      </Link>
    </div>
  );
};

export default PreviewProyecto;
