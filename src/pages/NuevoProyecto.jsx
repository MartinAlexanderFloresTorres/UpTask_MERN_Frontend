import FormularioProyecto from "../components/FormularioProyecto";

const NuevoProyecto = () => {
  return (
    <div className="md:w-full max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-sky-600">Crear Proyectos</h1>
      <FormularioProyecto />
    </div>
  );
};

export default NuevoProyecto;
