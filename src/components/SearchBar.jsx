import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="bg-[url(/search-bg.webp)] bg-cover bg-center bg-no-repeat bg-neutral-700 bg-blend-multiply py-16 px-5 xs:px-6 sm:px-8 md:px-10 md:py-24 lg:px-16 xl:px-20 xl:py-28 xxl:px-28">
      <form onSubmit={handleSubmit} className="flex relative">
        <input
          type="text"
          value={query}
          placeholder="Search movies, series, actor..."
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 py-3 w-full bg-white text-black text-sm rounded-l-md border-none outline-none sm:text-base md:pl-11  xl:text-lg xl:pl-12"
        />
        <button
          type="submit"
          className="bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-r-md hover:cursor-pointer sm:text-base md:w-1/4 xl:w-2/6 lg:text-lg"
        >
          Search
        </button>
        <IoSearch className="absolute bottom-3 left-2 text-xl text-neutral-700 md:left-4 xl:text-2xl"/>
      </form>
    </section>
  );
};

export default SearchBar;
