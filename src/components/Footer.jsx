import { Link } from "react-router-dom";
import Logo from "/logo.webp"
import { FaFacebook, FaInstagram, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";


const Footer = () => {
    return (
      <footer className="bg-black text-white">
        <section className="px-4 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28 grid gap-8 py-8 md:py-10 xmd:flex xmd:justify-between xmd:py-12 lg:py-15">
          <Link to="/">
            <div className="flex items-center justify-center gap-2 xmd:-mt-2 lg:-mt-4">
              <img
                src={Logo}
                alt="MovieNest Logo"
                className="size-8 md:size-10 lg:size-12 xl:size-16"
              />
              <h1 className="text-xl font-bold md:text-2xl">
                MOVI
                <span className="text-red-600">NEST</span>
              </h1>
            </div>
          </Link>
          <div className="flex justify-between font-montserrat xmd:gap-12 lg:gap-20 xl:gap-28">
            <div className="font-semibold">
              <h2 className="text-base mb-4 xmd:text-lg">LINKS</h2>
              <div className="grid gap-2 text-sm xmd:text-base">
                <Link to="/" className="">
                  Home
                </Link>
                <Link to="/trending" className="">
                  Trending
                </Link>
                <Link to="/movies" className="">
                  Movies
                </Link>
                <Link to="/tv-series" className="">
                  TV Series
                </Link>
                <Link to="/genre" className="">
                  Genre
                </Link>
              </div>
            </div>
            <div className="font-semibold">
              <h2 className="text-base mb-4 xmd:text-lg">QUICK LINKS</h2>
              <div className="grid gap-2 text-sm xmd:text-base">
                <Link to="/tv-series" className="">
                  Top Series
                </Link>
                <Link to="/movies" className="">
                  Top Movies
                </Link>
                <Link to="/anime" className="">
                  Anime
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6 font-montserrat sm:space-y-10 xmd:space-y-12 xmd:w-2/6">
            <div className="flex items-cemter justify-center gap-8 text-[28px]  xmd:mt-2 xmd:text-3xl xl:gap-12">
              <FaFacebook />
              <FaTelegram />
              <FaInstagram />
              <FaXTwitter />
              <FaYoutube />
            </div>
            <div className="flex items-center gap-3 xs:gap-4 xmd:grid">
              <input
                type="text"
                autoComplete=""
                placeholder="Enter your Email"
                className="bg-white w-full p-2.5 text-sm text-black rounded-lg outline-none"
              />
              <button className="bg-red-600 text-sm py-2.5 px-3 rounded-lg font-semibold xs:w-2/4 xmd:w-full">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
        <div className="h-[0.5px] bg-neutral-500"></div>
        <p className="text-xs text-neutral-500 py-5 text-center font-montserrat">
          &copy;2025 MoviNest. All Rights Reserved
        </p>
      </footer>
    );
}
export default Footer