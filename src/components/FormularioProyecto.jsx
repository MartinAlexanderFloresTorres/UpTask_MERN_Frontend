import { useState, useEffect } from "react";
import useProyectos from "../hooks/useProyectos";
import { useParams } from "react-router-dom";
import Alerta from "./Alerta";
import ButtonLoad from "./ButtonLoad";

const FormularioProyecto = () => {
  const [campos, setCampos] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    cliente: "",
  });
  const [cargando, setCargando] = useState(false);
  const [editar, setEditar] = useState(false);

  const { id } = useParams();

  const { alerta, mostrarAlerta, agregarProyecto, editarProyecto, proyecto } =
    useProyectos();

  //Verificar si esta en modo edicion
  useEffect(() => {
    // eliminar las alertas previas
    mostrarAlerta({
      error: false,
      msg: "",
    });
    // rellenar campos
    if (id && proyecto.nombre) {
      setCampos({
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaEntrega: proyecto?.fechaEntrega?.split("T")[0],
        cliente: proyecto.cliente,
      });
      setEditar(true);
    } else {
      setEditar(false);
    }
  }, [id]);

  // Llenar campos
  const handleChangeCampos = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value.trimStart() });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(campos).includes("")) {
      mostrarAlerta({
        error: true,
        msg: "Todo los campos son obligatorios",
      });
      return;
    }
    mostrarAlerta({
      error: false,
      msg: "",
    });
    // Agregar Proyecto
    setCargando(true);
    if (editar) {
      await editarProyecto({ proyecto: campos, id });
    } else {
      await agregarProyecto(campos);
    }
    setCargando(false);
    setCampos({
      nombre: "",
      descripcion: "",
      fechaEntrega: "",
      cliente: "",
    });
  };
  return (
    <div className="md:w-full max-w-4xl  my-10 mx-auto">
      {alerta.msg && <Alerta alerta={alerta} />}
      <form
        onSubmit={handleSubmit}
        className=" bg-white shadow rounded-md p-10"
      >
        <div className="mb-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="nombre"
          >
            Nombre Proyecto
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="nombre"
            name="nombre"
            value={campos?.nombre}
            onChange={handleChangeCampos}
            type="text"
            placeholder="Nombre del proyecto"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="descripcion"
          >
            Descripción Proyecto
          </label>
          <textarea
            className="w-full p-3 max-h-32 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="descripcion"
            name="descripcion"
            value={campos?.descripcion}
            onChange={handleChangeCampos}
            type="text"
            placeholder="Descripcion del proyecto"
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
            onChange={handleChangeCampos}
            type="date"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="cliente"
          >
            Nombre Cliente
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="cliente"
            name="cliente"
            value={campos?.cliente}
            onChange={handleChangeCampos}
            type="text"
            placeholder="Cliente del proyecto"
          />
        </div>
        <ButtonLoad estado={cargando}>
          {cargando
            ? editar
              ? "Actualizando..."
              : "Creando..."
            : editar
            ? "Actualizar Proyecto"
            : "Crear Proyecto"}
        </ButtonLoad>
      </form>
    </div>
  );
};

export default FormularioProyecto;
