import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";

export default function Usuario() {
  const { cerrarSesion } = useProyectos();
  const { auth } = useAuth();
  const { pathname } = useLocation();
  const ruta = !pathname.includes("editar-perfil");
  return (
    <div className="text-right z-50">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            title="Usuario"
            className="text-gray-600  text-sm cursor-pointer p-3 rounded-md uppercase font-bold block"
          >
            <div className="border rounded-full font-bold p-2 w-[40px] h-[40px] flex items-center justify-center bg-white hover:bg-slate-50 transition-colors">
              {auth.nombre.charAt(0)}
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-3 text-center">
              <div className="text-gray-500 w-full text-smp-3 rounded-md  font-bold block">
                <div className="break-all uppercase flex gap-2 mb-2 items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    width={50}
                    height={50}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{auth?.nombre}</span>
                </div>
                <div className="text-sm text-gray-400 font-medium break-all">
                  {auth?.email}
                </div>
              </div>
            </div>

            {ruta && (
              <div className="px-1 py-1">
                <Menu.Item>
                  <Link
                    to={`/proyectos/editar-perfil`}
                    className="text-gray-500 w-full text-sm text-center  hover:bg-gray-100 transition-colors cursor-pointer p-3 rounded-md uppercase font-bold block"
                    type="button"
                  >
                    Editar Perfil
                  </Link>
                </Menu.Item>
              </div>
            )}

            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  className="text-white w-full text-sm bg-sky-600 hover:bg-sky-700 transition-colors cursor-pointer p-3 rounded-md uppercase font-bold block"
                  type="button"
                  onClick={cerrarSesion}
                >
                  Cerrar Sesión
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
