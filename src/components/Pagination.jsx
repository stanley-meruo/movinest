import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Button from "./Button";

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const pageNumbers = Array.from({ length: totalPages })
    .map((_, i) => i + 1)
    .filter(
      (p) => p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)
    )
    .reduce((acc, curr, i, arr) => {
      if (i > 0 && curr - arr[i - 1] > 1) acc.push("ellipsis");
      acc.push(curr);
      return acc;
    }, []);

  return (
    <div className="flex justify-center text-white font-montserrat items-center flex-wrap gap-2 my-10 text-sm md:text-base">
      {/* Prev button */}
      <Button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-3 py-2.5 rounded bg-neutral-500 disabled:opacity-50 hover:bg-neutral-700 transition duration-300 cursor-pointer"
      >
        <MdOutlineArrowBackIosNew className="lg:text-lg" />
      </Button>

      {/* Page numbers */}
      {pageNumbers.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-2">
            ...
          </span>
        ) : (
          <Button
            key={p}
            onClick={() => setPage(p)}
            aria-label={`Go to page ${p}`}
            tabIndex={0}
            className={`px-3 py-1.5 rounded ${
              p === page ? "bg-red-600 font-bold hover:bg-red-700" : "bg-neutral-500 hover:bg-neutral-600"
            } transition duration-300 cursor-pointer`}
          >
            {p}
          </Button>
        )
      )}

      {/* Next button */}
      <Button
        onClick={handleNext}
        disabled={page === totalPages}
        className="px-3 py-2.5 rounded bg-neutral-500 disabled:opacity-50 hover:bg-neutral-600 transition duration-300 cursor-pointer"
      >
        <MdOutlineArrowForwardIos className="lg:text-lg" />
      </Button>
    </div>
  );
};

export default Pagination;
