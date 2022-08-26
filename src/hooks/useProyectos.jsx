import { useContext } from "react";
import ProyectosContext from "../contexts/ProyectosProvider";

const useProyectos = () => {
  return useContext(ProyectosContext);
};

export default useProyectos;
