import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    const getToken = localStorage.getItem("token");

    // Autenticar al usuario automaticamente
    const autenticarUsuario = async () => {
      try {
        // configuracion
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken}`,
          },
        };
        const { data } = await clienteAxios("/usuarios/perfil", config);
        setAuth(data);
        const rutas = ["/", "/registrar", "/olvide-password", "/confirmar"];
        if (rutas.includes(pathname)) {
          navigate("/proyectos");
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setAuth({});
      } finally {
        setCargando(false);
      }
    };
    if (getToken) {
      autenticarUsuario();
    } else {
      setCargando(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
