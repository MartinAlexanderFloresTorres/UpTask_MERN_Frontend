import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
import ButtonLoad from "../components/ButtonLoad";
import Swal from "sweetalert2";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || email.length < 6) {
      setAlerta({
        error: true,
        msg: "El email es olbligatorio",
      });
      return;
    }
    setAlerta({
      error: false,
      msg: "",
    });

    // Enviar Pasos de recuperacion de password
    try {
      setCargando(true);
      const { data } = await clienteAxios.post("/usuarios/olvide-password", {
        email,
      });
      Swal.fire("Recuperación", data?.msg, "success");
      setEmail("");
    } catch (error) {
      console.log(error);
      Swal.fire("Autenticación", error.response.data.msg, "error");
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center">
        Recupeta tu acceso nos pierdas{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>

      {alerta.msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-md p-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
            type="email"
            placeholder="Ingrese su Email"
          />
        </div>
        <ButtonLoad estado={cargando}>
          {cargando ? "Enviando..." : "Enviar Instruciones"}
        </ButtonLoad>
      </form>

      <nav className="lg:flex lg:justify-between gap-5">
        <Link
          to={"/"}
          className="block text-center my-5 text-slate-500 hover:text-sky-800 transition-colors text-sm uppercase font-normal"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          to={"/registrar"}
          className="block text-center my-5 text-slate-500 hover:text-sky-800 transition-colors text-sm uppercase font-normal"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </nav>
    </>
  );
};

export default OlvidePassword;
