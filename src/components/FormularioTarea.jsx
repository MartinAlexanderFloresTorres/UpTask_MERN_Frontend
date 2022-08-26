import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import ButtonLoad from "./ButtonLoad";

const FormularioTarea = () => {
  // Estados
  const [campos, setCampos] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    prioridad: "",
  });
  const [cargando, setCargando] = useState(false);
  const [editar, setEditar] = useState(false);
  const [alerta, setAlerta] = useState({ error: false, msg: "" });

  const { id } = useParams();

  const { agregarTarea, editarTarea, tarea } = useProyectos();

  useEffect(() => {
    if (Object.keys(tarea).length > 0) {
      setEditar(true);
      setCampos({
        nombre: tarea.nombre,
        descripcion: tarea.descripcion,
        fechaEntrega: tarea.fechaEntrega.split("T")[0],
        prioridad: tarea.prioridad,
      });
    } else {
      setEditar(false);
    }
  }, [tarea]);
  // Llenar campos
  const handleChange = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value.trimStart() });
  };
  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(campos).includes("")) {
      setAlerta({
        error: true,
        msg: "Todo los campos son obligatorios",
      });
      return;
    }
    setAlerta({
      error: false,
      msg: "",
    });
    setCargando(true);
    // Creando Tarea
    if (editar) {
      await editarTarea({ ...campos, id: tarea._id });
    } else {
      await agregarTarea({ ...campos, proyecto: id });
    }
    setCargando(false);
    setCampos({
      nombre: "",
      descripcion: "",
      fechaEntrega: "",
      prioridad: "",
    });
  };

  return (
    <>
      <h2 className="text-center font-bold text-3xl text-sky-600">
        Crear Tarea
      </h2>
      {alerta.msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="bg-white pt-0 px-5 pb-5 mt-5">
        <div className="mb-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="nombre"
          >
            Nombre tarea
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="nombre"
            name="nombre"
            value={campos?.nombre}
            onChange={handleChange}
            type="text"
            placeholder="Nombre del tarea"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="descripcion"
          >
            Descripción tarea
          </label>
          <textarea
            className="w-full p-3 max-h-32 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="descripcion"
            name="descripcion"
            value={campos?.descripcion}
            onChange={handleChange}
            type="text"
            placeholder="Descripcion del tarea"
          ></textarea>
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="fecha-entrega"
          >
            Fecha Entrega
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="fecha-entrega"
            name="fechaEntrega"
            value={campos?.fechaEntrega}
            onChange={handleChange}
            type="date"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="prioridad"
          >
            Prioridad
          </label>
          <select
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500 text-center"
            id="prioridad"
            name="prioridad"
            value={campos?.prioridad}
            onChange={handleChange}
            type="date"
          >
            <option value="" disabled>
              --Selecione--
            </option>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <ButtonLoad estado={cargando}>
          {cargando
            ? editar
              ? "Actualizando..."
              : "Creando..."
            : editar
            ? "Actualizar Tarea"
            : "Crear Tarea"}
        </ButtonLoad>
      </form>
    </>
  );
};

export default FormularioTarea;
