const LoadColaborador = () => {
  return (
    <div className=" md:w-full max-w-4xl mx-auto">
      <div className=" md:w-full max-w-4xl  mx-auto">
        <div className="border bg-white border-slate-100 shadow rounded p-4 mb-5">
          <div className="flex justify-between gap-4 w-full">
            <div className="h-10 bg-slate-100 w-full  rounded"></div>
            <div className="h-10 bg-slate-100 w-2/5 rounded"></div>
          </div>
        </div>

        <div className="border bg-white border-slate-100 shadow rounded p-10 ">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 ">
              <div className="grid grid-cols-2 gap-4 my-2">
                <div className="h-5 bg-slate-100 rounded col-span-1"></div>
              </div>
              <div className="h-12 bg-slate-100 rounded mb-6"></div>
              <div className="h-12 bg-slate-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadColaborador;
