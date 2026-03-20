

const SkeletonLoading = () => {
  return (
    <section className="grid bg-neutral-800 py-12 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
        <div className="animate-pulse mx-auto">
          {/* Name & Link */}
          <div className="flex items-center justify-between mb-4">
            <div className="bg-neutral-700 w-2/4 h-6 rounded-md sm:w-2/5 md:h-8 lg:w-1/5" />
            <div className="bg-neutral-700 w-1/4 h-4 rounded-md sm:w-1/6 md:h-6 lg:w-1/6" />
          </div>
          {/* Line */}
          <div className="bg-neutral-700 w-full h-1 rounded-md mb-4" />
          {/* Card & Title*/}
          <div className=" mx-auto my-6">
            <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="grid space-y-4">
                  <div className="min-w-[130px] h-56 bg-neutral-700 rounded-md sm:min-w-[150px] xmd:min-w-[180px] lg:min-w-[160px]" />
                  <div className="h-5 w-24 bg-neutral-700 rounded-md mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default SkeletonLoading;
