import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Proyectos from "./pages/Proyectos";
import NuevoProyecto from "./pages/NuevoProyecto";
import Proyecto from "./pages/Proyecto";
import EditarProyecto from "./pages/EditarProyecto";
import NuevoColaborador from "./pages/NuevoColaborador";
import EditarPerfil from "./pages/EditarPerfil";
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:token" element={<ConfirmarCuenta />} />
          </Route>

          <Route path="/proyectos" element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
            <Route path="crear-proyecto" element={<NuevoProyecto />} />
            <Route path=":id" element={<Proyecto />} />
            <Route path="editar/:id" element={<EditarProyecto />} />
            <Route
              path="nuevo-colaborador/:id"
              element={<NuevoColaborador />}
            />
            <Route path="editar-perfil" element={<EditarPerfil />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
