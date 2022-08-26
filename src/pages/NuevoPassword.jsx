import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";
import ButtonLoad from "../components/ButtonLoad";
import Swal from "sweetalert2";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const { token } = useParams();

  // confirmar token valido
  const comprobarToken = async () => {
    try {
      await clienteAxios(`/usuarios/olvide-password/${token}`);
      setTokenValido(true);
    } catch (error) {
      setTokenValido(false);
      console.log(error);
      setAlerta({
        error: true,
        msg: error.response.data?.msg,
      });
    }
  };

  useEffect(() => {
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([password, password2].includes("")) {
      setAlerta({
        error: true,
        msg: "Todo los campos son obligatorios",
      });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        error: true,
        msg: "El password debe ser minimo 6 caracteres",
      });
      return;
    }
    if (password !== password2) {
      setAlerta({ error: true, msg: "Los password nos son iguales" });
      return;
    }
    setAlerta({
      error: false,
      msg: "",
    });

    // Restablecer password
    try {
      setCargando(true);
      const { data } = await clienteAxios.post(
        `/usuarios/olvide-password/${token}`,
        { password }
      );
      Swal.fire("Modificado", data?.msg, "success");
      setPassword("");
      setPasswordModificado(true);
      setTokenValido(false);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error.response.data.msg, "error");
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center mb-5">
        Restablece tu password y nos piedad acceso a{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>

      {alerta.msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-md p-10"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold mb-3"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trimStart())}
              type="password"
              placeholder="Escribe su nuevo password"
            />
          </div>
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold mb-3"
              htmlFor="password2"
            >
              Nuevo Password
            </label>
            <input
              className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value.trimStart())}
              type="password"
              placeholder="Repita su password"
            />
          </div>
          <ButtonLoad estado={cargando}>
            {cargando ? "Guardando..." : "Guardar nuevo password"}
          </ButtonLoad>
        </form>
      )}

      {passwordModificado && (
        <Link
          to={"/"}
          className="mt-16 text-center block w-fit mx-auto mb-5 bg-sky-700 py-3 px-8 uppercase text-white font-bold text-xl rounded cursor-pointer hover:bg-sky-800 transition-colors"
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  );
};

export default NuevoPassword;
