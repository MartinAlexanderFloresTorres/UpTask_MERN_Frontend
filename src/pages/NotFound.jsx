import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mx-auto min-h-screen  px-5 py-10 flex items-center justify-center">
      <div className="md:w-2/3 lg:w-1/2">
        <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center">
          Lo sentimos, Esta pagina no existe
        </h1>
        <span className="text-slate-700 mt-10 block text-9xl text-center font-bold">404</span>
        <div className="flex gap-2 items-center justify-center mt-12">
          <Link
            to={"/"}
            className="flex justify-center items-center gap-1 text-center bg-sky-700 hover:bg-sky-800 transition-colors w-full py-3 px-5 uppercase text-white font-bold text-xl rounded cursor-pointer"
          >
            Regresar
          </Link>
          <Link
            to={"/proyectos"}
            className="flex justify-center items-center gap-1 text-center border border-sky-600 text-sky-600 hover:bg-slate-200 transition-colors w-full py-3 px-5 uppercase font-bold text-xl rounded cursor-pointer"
          >
            Proyectos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
