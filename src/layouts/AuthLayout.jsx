import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="container mx-auto min-h-screen  px-5 py-10 flex items-center justify-center">
      <div className="md:w-2/3 lg:w-1/2">{<Outlet />}</div>
    </main>
  );
};

export default AuthLayout;
