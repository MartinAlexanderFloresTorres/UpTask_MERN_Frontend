import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import useProyectos from "../hooks/useProyectos";

function Buscador() {
  const [busquedad, setBusquedad] = useState("");

  const { proyectos } = useProyectos();

  const proyectosFiltrados =
    busquedad === ""
      ? []
      : proyectos.filter((proyecto) =>
          proyecto.nombre.toLowerCase().includes(busquedad.toLowerCase())
        );

  return (
    <div className="sm:w-96 mx-auto">
      <Combobox
        onChange={(proyecto) =>
          (window.location = `/proyectos/${proyecto._id}`)
        }
      >
        <div className="relative mt-1 w-full">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm border">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
              displayValue={busquedad}
              placeholder="Buscar proyecto"
              onChange={(e) => setBusquedad(e.target.value.trimStart())}
            />
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setBusquedad("")}
          >
            <Combobox.Options
              className={`${
                busquedad !== "" ? "shadod border" : ""
              } absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base  focus:outline-none sm:text-sm z-20`}
            >
              {proyectosFiltrados.length === 0 && busquedad !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No se encontraron proyectos.
                </div>
              ) : (
                proyectosFiltrados.map((proyecto) => (
                  <Combobox.Option
                    key={proyecto._id}
                    className="select-none w-full p-3 cursor-pointer transition-all hover:bg-sky-600 hover:text-white text-gray-900  break-all"
                    value={proyecto}
                  >
                    {proyecto.nombre}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
export default Buscador;
