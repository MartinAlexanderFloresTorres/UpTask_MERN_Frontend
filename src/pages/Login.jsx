import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import ButtonLoad from "../components/ButtonLoad";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({ error: false, msg: "" });

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      navigate("/proyectos");
    }
  }, []);

  // handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar los campos
    if ([email, password].includes("")) {
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
    // Autenticar usuario
    try {
      setCargando(true);
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      setAuth(data);
      const { token } = data;
      // limpiar el estado
      setEmail("");
      setPassword("");
      // Almacenar el token el el local storage
      localStorage.setItem("token", token);
      navigate("/proyectos");
    } catch (error) {
      console.log(error);
      Swal.fire("Error de autenticación", error.response.data.msg, "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center">
        Inicia sesión y administra{" "}
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
            placeholder="Email de registro"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trimStart())}
            type="password"
            placeholder="Password de registro"
          />
        </div>
        <ButtonLoad estado={cargando}>
          {cargando ? "Autenticando..." : "Inicar Sesión"}
        </ButtonLoad>
      </form>

      <nav className="lg:flex lg:justify-between gap-5">
        <Link
          to={"/registrar"}
          className="block text-center my-5 text-slate-500 hover:text-sky-800 transition-colors text-sm uppercase font-normal"
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
        <Link
          to={"/olvide-password"}
          className="block text-center my-5 text-slate-500 hover:text-sky-800 transition-colors text-sm uppercase font-normal"
        >
          Olvide mi Password
        </Link>
      </nav>
    </>
  );
};

export default Login;
