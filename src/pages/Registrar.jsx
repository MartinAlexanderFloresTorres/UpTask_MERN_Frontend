import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import ButtonLoad from "../components/ButtonLoad";
import Swal from "sweetalert2";

const Registrar = () => {
  // Estados
  const [campos, setCampos] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [cargando, setCargando] = useState(false);

  // Llenar campos
  const handleChangeInputs = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value.trimStart() });
  };

  // HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validad los campos vacios
    if (Object.values(campos).includes("")) {
      setAlerta({ error: true, msg: "Todo los campos son obligatorios" });
      return;
    }
    // validar el nombre no tan corto ni largo
    if (campos.nombre.split(" ").join("").length < 4) {
      setAlerta({
        error: true,
        msg: "El nombre es muy corto, minimo 4 caracteres",
      });
      return;
    }
    // validar el nombre no tan corto ni largo
    if (campos.nombre.length > 16) {
      setAlerta({ error: true, msg: "El nombre es muy extenso" });
      return;
    }
    // validad el password sean iguales
    if (campos.password !== campos.password2) {
      setAlerta({ error: true, msg: "Los password nos son iguales" });
      return;
    }
    // validad el password tenga minimo 6 caracteres
    if (campos.password.length < 6 || campos.password2.length < 6) {
      setAlerta({
        error: true,
        msg: "El Password es muy corto, Agrega minimo 6 caracteres",
      });
      return;
    }
    setAlerta({ error: false, msg: "" });
    // Crear el usuario en la API
    try {
      // si se crea correctamente
      setCargando(true);
      const { data } = await clienteAxios.post("/usuarios", {
        nombre: campos.nombre,
        password: campos.password,
        email: campos.email,
      });
      Swal.fire("Registrado", data?.msg, "success");
      setCampos({
        nombre: "",
        email: "",
        password: "",
        password2: "",
      });
    } catch (error) {
      // si no se crea correctamente
      console.log(error);
      Swal.fire("Autenticación", error.response.data.msg, "error");
    } finally {
      setCargando(false);
    }
  };
  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center">
        Crea tu cuenta y administra{" "}
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
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
            id="nombre"
            name="nombre"
            value={campos?.nombre}
            onChange={handleChangeInputs}
            type="text"
            placeholder="Ingrese su nombre"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
            id="email"
            name="email"
            value={campos?.email}
            onChange={handleChangeInputs}
            type="email"
            placeholder="Ingrese su Email"
          />
        </div>
        <p className="text-gray-500 mb-4 text-sm">
          <span className=" text-lg text-gray-700 font-bold">Nota: </span>{" "}
          Ingrese un email valido para poder confirmarlo mediante un mensaje de email.
        </p>
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
            name="password"
            value={campos?.password}
            onChange={handleChangeInputs}
            type="password"
            placeholder="Ingrese su password"
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="password2"
          >
            Repetir password
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-700"
            id="password2"
            name="password2"
            value={campos?.password2}
            onChange={handleChangeInputs}
            type="password"
            placeholder="Repetir Password"
          />
        </div>

        <ButtonLoad estado={cargando}>
          {cargando ? "Creando Cuenta...." : "Crear Cuenta"}
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
          to={"/olvide-password"}
          className="block text-center my-5 text-slate-500 hover:text-sky-800 transition-colors text-sm uppercase font-normal"
        >
          Olvide mi Password
        </Link>
      </nav>
    </>
  );
};

export default Registrar;
