import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { ProyectosProvider } from "../contexts/ProyectosProvider";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const { pathname } = useLocation();
  
  const ruta = !pathname.includes("editar-perfil");

  if (cargando)
    return (
      <div className="loading">
        <div>
          <h2 className="text-sky-600 text-6xl font-bold">Uptask</h2>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      </div>
    );
  return (
    <>
      {auth?._id ? (
        <ProyectosProvider>
          <section className="bg-gray-100">
            <Header />
            <div className="lg:flex">
              {ruta && <Sidebar />}
              <main className="flex-1 p-5 md:p-10">
                <Outlet />
              </main>
            </div>
          </section>
        </ProyectosProvider>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default RutaProtegida;
