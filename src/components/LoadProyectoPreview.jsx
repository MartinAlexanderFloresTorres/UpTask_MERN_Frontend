const LoadProyectoPreview = () => {
  return (
    <div className="mt-3">
      <div className="w-full flex gap-9 flex-col">
        <div className="flex justify-between gap-4 w-full">
          <div className="h-10 bg-slate-200 w-2/5  rounded col-span-2"></div>
          <div className="h-10 bg-slate-200 w-32 rounded col-span-1"></div>
        </div>
        <div className="grid grid-cols-3 gap-4 w-60">
          <div className="h-5 bg-slate-200  rounded col-span-2"></div>
          <div className="h-5 bg-slate-200  rounded col-span-3"></div>
          <div className="h-5 bg-slate-200  rounded col-span-2"></div>
          <div className="h-5 bg-slate-200  rounded col-span-3"></div>
          <div className="h-14 bg-slate-200  rounded col-span-2"></div>
        </div>

        <div className="flex justify-between gap-4 w-full">
          <div className="h-9 bg-slate-200 w-60  rounded col-span-2"></div>
        </div>

        <div className="border-b p-4 w-full mx-auto bg-white">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 py-5">
                  <div className="h-8 bg-slate-100 rounded col-span-2"></div>
                  <div className="h-8 bg-slate-100 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-5 flex-col mt-9">
        <div className="flex justify-between gap-4 w-full">
          <div className="h-9 bg-slate-200 w-60  rounded col-span-2"></div>
          <div className="h-9 bg-slate-200 w-32 rounded col-span-1"></div>
        </div>

        <div className="border-b p-4 w-full mx-auto bg-white">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 py-5">
                  <div className="h-8 bg-slate-100 rounded col-span-2"></div>
                  <div className="h-8 bg-slate-100 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadProyectoPreview;
