import { Link } from "react-router-dom";
import Buscador from "./Buscador";
import Usuario from "./Usuario";
const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between md:items-center">
        <Link to={"/proyectos"} className="text-4xl mb-5 md:mb-0 text-sky-600 font-black text-center block">
          UpTask
        </Link>
        <Buscador />
        <div className="flex  gap-4 items-center justify-between mt-5 md:mt-0">
          <Link
            to={"/proyectos"}
            className="font-bold uppercase text-gray-500 hover:text-gray-700 transition-all"
          >
            Proyectos
          </Link>
          <Usuario />
        </div>
      </div>
    </header>
  );
};

export default Header;
