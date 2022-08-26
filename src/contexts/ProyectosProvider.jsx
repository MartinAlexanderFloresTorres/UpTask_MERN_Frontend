import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import io from "socket.io-client";
import clienteAxios from "../config/clienteAxios";
let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
  const [proyectos, setProyectos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [loadProyecto, setLoadProyecto] = useState(true);
  const [proyecto, setProyecto] = useState({});
  const [noProyecto, setNoProyecto] = useState(false);
  const [alerta, setAlerta] = useState({ error: false, msg: "" });
  const [modal, setModal] = useState(false);
  const [tarea, setTarea] = useState({});
  const [colaborador, setColaborador] = useState({});

  const navigate = useNavigate();

  // OBTENER LOS PROYECTOS
  const obtenerProyectos = async () => {
    try {
      setCargando(true);
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // Obtener los proyecto
      const { data } = await clienteAxios("/proyectos", config);
      setProyectos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
  }, []);

  // Alertas
  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
  };

  // AGREGAR UN PROYECTO
  const agregarProyecto = async (proyecto) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // Agregar el proyecto
      const { data } = await clienteAxios.post("/proyectos", proyecto, config);
      // Sincronizar los proyectos
      setProyectos([...proyectos, data]);
      // mostrar alerta
      setAlerta({ error: false, msg: "Proyecto creado correctamente" });
      // redireccionar
      setTimeout(() => {
        setAlerta({ error: false, msg: "" });
        navigate("/proyectos");
      }, 3000);
    } catch (error) {
      console.log(error);
      // mostrar alerta de error
      setAlerta({ error: true, msg: "Hubo un error al crear el proyecto" });
    }
  };

  // EDITAR UN PROYECTO
  const editarProyecto = async ({ proyecto, id }) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // editar el proyecto
      const { data } = await clienteAxios.put(
        `/proyectos/${id}`,
        proyecto,
        config
      );
      // Sincronizar los proyectos
      const proyectosActualizados = proyectos.map((proyectoState) =>
        proyectoState._id === data._id ? data : proyectoState
      );
      setProyectos(proyectosActualizados);
      // mostrar alerta
      setAlerta({ error: false, msg: "Proyecto Actualizado correctamente" });
      // redireccionar
      setTimeout(() => {
        setAlerta({ error: false, msg: "" });
        navigate(`/proyectos/${id}`);
      }, 3000);
    } catch (error) {
      console.log(error);
      // mostrar alerta de error
      setAlerta({
        error: true,
        msg: "Hubo un error al Actualizar el proyecto",
      });
    }
  };

  // OBTENER UN PROYECTO
  const obtenerProyecto = async (id) => {
    try {
      setProyecto({});
      setLoadProyecto(true);
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // Obtener un proyecto
      const { data } = await clienteAxios(`proyectos/${id}`, config);
      setProyecto(data);
      setNoProyecto(false);
    } catch (error) {
      console.log(error);
      setNoProyecto(true);
    }
    setLoadProyecto(false);
  };

  // ELIMINAR UN PROYECTO
  const eliminarProyecto = async (id) => {
    Swal.fire({
      title: "¿Desea eliminar este proyecto?",
      text: "Recuerda que no se pueden revertir estos cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Deseo eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            // Token
            const getToken = localStorage.getItem("token");
            // Config
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
              },
            };
            // Eliminar un proyecto
            const { data } = await clienteAxios.delete(
              `proyectos/${id}`,
              config
            );
            // mostrar alerta
            const { msg } = data;
            Swal.fire("Eliminado!", msg, "success");
            // sincronizar el estado
            const proyectosActualizados = proyectos.filter(
              (proyectoState) => proyectoState._id !== id
            );
            setProyectos(proyectosActualizados);
            // redireccionar
            navigate("/proyectos");
          } catch (error) {
            console.log(error);
            // mostrar alerta de error
            Swal.fire(
              "Eliminado!",
              "Hubo un error al eliminar el proyecto.",
              "error"
            );
          }
        })();
      }
    });
  };

  // Cambiar estado del modal
  const handleModal = () => {
    setTarea({});
    setModal(!modal);
  };

  // AGREGAR UNA TAREA
  const agregarTarea = async (tarea) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // Agregar tarea
      const { data } = await clienteAxios.post("/tareas", tarea, config);
      handleModal();
      Swal.fire("Creado", "La Tarea fue creada correctamente", "success");

      // SOCKET.IO
      socket.emit("nueva-tarea", data);
    } catch (error) {
      handleModal();
      // mostrar alerta de error
      Swal.fire("Creado", "Hubo un error al crear la tarea", "error");

      console.log(error);
    }
  };

  // SOCKET.IO AGREGAR TAREA
  const socketAgregarTarea = (data) => {
    // Sincronizar el estado
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = [...proyectoActualizado.tareas, data];
    setProyecto(proyectoActualizado);
  };

  // Guardar la tarea a editar en el estado
  const handleSetEditarTarea = (tarea) => {
    setTarea(tarea);
    setModal(true);
  };

  // EDITAR UNA TAREA
  const editarTarea = async (tarea) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // Editar tarea
      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );
      // SOCKET.IO
      socket.emit("actualizar-tarea", data);

      Swal.fire("Actualizado", "Tarea Actualizada Correctamente", "success");
      handleModal();
    } catch (error) {
      handleModal();
      // mostrar alerta de error
      Swal.fire("Error", "Hubo un error al Actualizar la tarea", "error");
      console.log(error);
    }
  };

  // SOCKET.IO EDITAR TAREA
  const socketEditarTarea = (data) => {
    // Sincronizar el estado
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === data._id ? data : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  // ELIMINAR UNA TAREA
  const eliminarTarea = (tarea) => {
    Swal.fire({
      title: "¿Desea eliminar esta tarea?",
      text: "Recuerda que no se pueden revertir estos cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Deseo eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          try {
            // Token
            const getToken = localStorage.getItem("token");
            // Config
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken}`,
              },
            };
            // Eliminar una tarea
            const { data } = await clienteAxios.delete(
              `tareas/${tarea._id}`,
              config
            );

            // SOCKET.IO
            socket.emit("eliminar-tarea", tarea);

            // mostrar alerta
            const { msg } = data;

            Swal.fire("Eliminado", msg, "success");
          } catch (error) {
            console.log(error);
            // mostrar alerta de error
            Swal.fire("Error", "Hubo un error al eliminar la tarea.", "error");
          }
        })();
      }
    });
  };

  // SOCKET.IO ELIMINAR TAREA
  const socketEliminarTarea = (tareaEliminada) => {
    // Sincronizar el estado
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.filter(
      (tareaState) => tareaState._id !== tareaEliminada._id
    );
    setProyecto(proyectoActualizado);
  };

  // BUSCAR UN COLABORADOR
  const buscarColaborador = async (email) => {
    try {
      setColaborador({});
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // BUSCAR UN COLABORADOR
      const { data } = await clienteAxios.post(
        "/proyectos/colaboradores",
        email,
        config
      );
      setColaborador(data);
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      Swal.fire("Error", msg, "error");
    }
  };

  // AGREGAR COLABORADOR
  const agregarColaborador = async (email) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/proyectos/colaboradores/${proyecto._id}`,
        email,
        config
      );
      // mostrar alerta
      const { msg } = data;
      navigate(`/proyectos/${proyecto._id}`);
      Swal.fire("Agregado", msg, "success");
    } catch (error) {
      console.log(error);
      // mostrar alerta de error
      const { msg } = error.response.data;
      Swal.fire("Error", msg, "error");
    }
  };

  // ELIMINAR UN COLABORADOR
  const eliminarColaborador = async (id) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      // eliminar colaborador
      const { data } = await clienteAxios.post(
        `/proyectos/eliminar-colaborador/${proyecto._id}`,
        { id },
        config
      );
      // mostrar alerta
      const { msg } = data;
      Swal.fire("Eliminado", msg, "success");
      // sincronizar el estado
      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.colaboradores =
        proyectoActualizado.colaboradores.filter(
          (colaboradorState) => colaboradorState._id !== id
        );
      setProyecto(proyectoActualizado);
    } catch (error) {
      console.log(error);
      // mostrar alerta de error
      const { msg } = error.response.data;
      Swal.fire("Error", msg, "error");
    }
  };

  // Completar tarea
  const completarTarea = async (id) => {
    try {
      // Token
      const getToken = localStorage.getItem("token");
      // Config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken}`,
        },
      };
      const { data } = await clienteAxios.post(
        `/tareas/estado/${id}`,
        {},
        config
      );
      // SOCKET.IO
      socket.emit("cambiar-estado", data);

      setTarea({});
    } catch (error) {
      console.log(error);
      // mostrar alerta de error
      const { msg } = error.response.data;
      Swal.fire("Error", msg, "error");
    }
  };

  // SOCKET.IO completar tarea
  const socketCompletarTarea = (tarea) => {
    // Sincronizar el estado
    const proyectoActualizado = { ...proyecto };
    proyectoActualizado.tareas = proyectoActualizado.tareas.map((tareaState) =>
      tareaState._id === tarea._id ? tarea : tareaState
    );
    setProyecto(proyectoActualizado);
  };

  // Cerrar session
  const cerrarSesion = () => {
    Swal.fire({
      title: "¿Desea Cerrar Sesión?",
      text: "Se cerrara su cuenta de este navegador",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cerrar Sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire(
          "Cerrada",
          "Su cuenta ah sido cerrada Correctamente",
          "success"
        );
        navigate("/");
      }
    });
  };

  // Actualizar perfil
  const actualizarPerfil = async (datos) => {
    // Token
    const getToken = localStorage.getItem("token");
    // Config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken}`,
      },
    };
    return await clienteAxios.put(`/usuarios/actualizar-perfil`, datos, config);
  };

  return (
    <ProyectosContext.Provider
      value={{
        proyectos,
        alerta,
        mostrarAlerta,
        agregarProyecto,
        editarProyecto,
        cargando,
        obtenerProyecto,
        proyecto,
        loadProyecto,
        setLoadProyecto,
        noProyecto,
        eliminarProyecto,
        handleModal,
        modal,
        agregarTarea,
        handleSetEditarTarea,
        tarea,
        editarTarea,
        eliminarTarea,
        buscarColaborador,
        setColaborador,
        colaborador,
        agregarColaborador,
        eliminarColaborador,
        completarTarea,
        socketAgregarTarea,
        socketEliminarTarea,
        socketEditarTarea,
        socketCompletarTarea,
        cerrarSesion,
        actualizarPerfil,
      }}
    >
      {children}
    </ProyectosContext.Provider>
  );
};

export { ProyectosProvider };
export default ProyectosContext;
