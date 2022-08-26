import React from "react";
import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";
import ButtonLoad from "./ButtonLoad";

const FormularioColaborador = () => {
  const [cargando, setCargando] = useState(false);
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({ error: false, msg: "" });

  const { buscarColaborador } = useProyectos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email == "") {
      setAlerta({ error: true, msg: "Email es Obligatorio" });
      return;
    }
    setAlerta({ error: false, msg: "" });
    // Agregar colaborador
    setCargando(true);
    await buscarColaborador({ email });
    setCargando(false);
    setEmail("");
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
            htmlFor="email"
          >
            Email del usuario
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
            type="email"
            placeholder="Email del usuario"
          />
        </div>

        <ButtonLoad estado={cargando}>
          {cargando ? "Buscando..." : "Buscar Colaborador"}
        </ButtonLoad>
      </form>
    </div>
  );
};

export default FormularioColaborador;
