import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [confirmado, setConfirmado] = useState(false);
  const { token } = useParams();

  // confirmar cuenta
  const confirmarCuenta = async () => {
    try {
      const { data } = await clienteAxios(`/usuarios/confirmar/${token}`);
      setAlerta({
        error: false,
        msg: data?.msg,
      });
      setConfirmado(true);
    } catch (error) {
      console.log(error);
      setAlerta({
        error: true,
        msg: error.response.data?.msg,
      });
    }
  };

  useEffect(() => {
    confirmarCuenta();
  }, []);
  return (
    <>
      <h1 className="text-sky-600 font-bold text-5xl sm:text-6xl capitalize sm:text-left text-center">
        Confirma tu cuenta y comienza a crear{" "}
        <span className="text-slate-700">tus proyectos</span>
      </h1>
      <div className="mt-16">
        {alerta.msg && <Alerta alerta={alerta} />}
        {confirmado && (
          <Link
            to={"/"}
            className="text-center block w-fit mx-auto mb-5 bg-sky-700 py-3 px-8 uppercase text-white font-bold text-xl rounded cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
