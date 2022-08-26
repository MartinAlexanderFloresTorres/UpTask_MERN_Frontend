import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import useProyectos from "../hooks/useProyectos";

const Opciones = () => {
  const { id } = useParams();
  const { eliminarProyecto } = useProyectos();

  return (
    <div className="text-center">
      <Menu as="div" className="relative inline-block">
        <div>
          <Menu.Button className="flex justify-center w-full items-center font-medium gap-4 rounded-md bg-white hover:bg-sky-500 hover:text-white transition-colors px-4 py-2 text-xl  text-gray-400">
            Opciones
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
          <Menu.Items className="absolute  left-auto right-auto mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg  focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/proyectos/editar/${id}`}
                  className={`${
                    active ? "bg-sky-500 text-white" : "text-gray-400"
                  } cursor-pointer flex items-center gap-2  transition-all uppercase font-bold px-5 py-3 w-full`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Editar
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => eliminarProyecto(id)}
                  className={`${
                    active ? "bg-sky-500 text-white" : "text-gray-400"
                  } cursor-pointer flex items-center gap-2  transition-all uppercase font-bold px-5 py-3 w-full`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Opciones;
