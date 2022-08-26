import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 py-10 px-5">
      <p className="text-xl font-bold break-all">Hola: {auth?.nombre}</p>
      <Link
        to={"crear-proyecto"}
        className="text-white text-sm bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer p-3 rounded-lg uppercase font-bold block text-center mt-5"
      >
        Nuevo Proyecto
      </Link>
    </aside>
  );
};

export default Sidebar;
