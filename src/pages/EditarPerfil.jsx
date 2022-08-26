import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Alerta from "../components/Alerta";
import ButtonLoad from "../components/ButtonLoad";
import useAuth from "../hooks/useAuth";
import useProyectos from "../hooks/useProyectos";

const EditarPerfil = () => {
  const [campos, setCampos] = useState({
    nombre: "",
    password: "",
    password2: "",
    password3: "",
  });
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [cargando, settCargando] = useState(false);

  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const { actualizarPerfil } = useProyectos();

  useEffect(() => {
    setCampos({ ...campos, nombre: auth?.nombre });
  }, []);
  const handleChangeCampos = (e) => {
    const { name, value } = e.target;
    setCampos({ ...campos, [name]: value.trimStart() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (campos.nombre == "") {
      setAlerta({
        error: true,
        msg: "El nombre es requerido",
      });
      return;
    }
    if (campos.password2 !== "" || campos.password3 !== "") {
      if (campos.password2.length < 6) {
        setAlerta({
          error: true,
          msg: "El password debe de tene minimo 6 caracteres",
        });
        return;
      }
      if (campos.password2 !== campos.password3) {
        setAlerta({
          error: true,
          msg: "Los password no son iguales",
        });
        return;
      }
    }
    if (campos.password === "") {
      setAlerta({
        error: true,
        msg: "Por favor ingrese su password para continuar.",
      });
      return;
    }
    if (campos.password.length < 6) {
      setAlerta({
        error: true,
        msg: "Password no valido",
      });
      return;
    }

    setAlerta({
      error: false,
      msg: "",
    });
    try {
      settCargando(true);
      const { data } = await actualizarPerfil({
        nombre: campos.nombre,
        password: campos.password,
        passwordNuevo: campos.password2,
      });
      const { msg } = data;
      Swal.fire("Actualizado", msg, "success");
      setAuth({ ...auth, nombre: campos.nombre });
      setCampos({
        nombre: "",
        password: "",
        password2: "",
        password3: "",
      });
      navigate("/proyectos");
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      Swal.fire("Error", msg, "error");
    }
    settCargando(false);
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
            Usuario
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="nombre"
            name="nombre"
            value={campos?.nombre}
            onChange={handleChangeCampos}
            type="text"
            placeholder="Usuario"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="password2"
          >
            Password nuevo
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="password2"
            name="password2"
            value={campos?.password2}
            onChange={handleChangeCampos}
            type="password"
            placeholder="Nuevo password"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="password3"
          >
            Repetir password
          </label>
          <input
            className="w-full p-3 border rounded-xl bg-gray-50 focus-visible:outline-sky-500"
            id="password3"
            name="password3"
            value={campos?.password3}
            onChange={handleChangeCampos}
            type="password"
            placeholder="Repetir password"
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold mb-3"
            htmlFor="password"
          >
            Password Actual{" "}
            <span className="text-sm text-red-400">(Obligatorio)</span>
          </label>
          <input
            className="w-full p-3 border rounded-xl  bg-white  focus-visible:outline-sky-500"
            id="password"
            name="password"
            value={campos?.password}
            onChange={handleChangeCampos}
            type="password"
            placeholder="Confirmar"
          />
        </div>

        <ButtonLoad estado={cargando}>
          {cargando ? "Guardando..." : "Guardar Cambios"}
        </ButtonLoad>
      </form>
    </div>
  );
};

export default EditarPerfil;
