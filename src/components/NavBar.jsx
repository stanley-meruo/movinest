import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "/logo.webp";
import { CgClose, CgMenuRight } from "react-icons/cg";
import Button from "./Button";
import AuthModal from "./Auth/AuthModal";
import { supabase } from "../lib/supabase";


const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState("signup");
  const [user, setUser] = useState(null);
  const [avatarLetter, setAvatarLetter] = useState("");

  const location = useLocation();
 
  const navLinks = [
    { name: "Home", path: "/", match: ["exact:/"] },
    { name: "Trending", path: "/trending", match: ["/trending"] },
    {
      name: "Movies",
      path: "/movies",
      match: ["/movies", "/movies/movie"],
    },
    {
      name: "Anime",
      path: "/anime",
      match: ["/anime", "/anime/movie", "/anime/tv"],
    },
    {
      name: "TV Series",
      path: "/tv-series",
      match: ["/tv-series", "/tv-series/tv"],
    },
    {
      name: "Genres",
      path: "/genre",
      match: ["/genre", "/genre/movie", "/genre/tv"],
    }
  ];

  // Sticky scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || showModal) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [menuOpen, showModal]);
  useEffect(() => {
    if (menuOpen || showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen, showModal]);


  useEffect(() => {
    // Fetch user on mount
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user?.email) {
      setAvatarLetter(user.email.slice(0,2).toUpperCase());
    }
  }, [user]);


  return (
    <>
      <nav
        className={`py-3.5 fixed z-50 top-0 w-full transition-all duration-300 backdrop-blur-xs ${
          isScrolled
            ? "bg-white shadow-md text-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex justify-between items-center px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                alt="MovieNest Logo"
                className="size-8 md:size-10 lg:size-12 xl:size-16"
              />
              <h1 className="text-lg font-bold md:text-xl lg:text-2xl xl:text-[26px] xxl:text-3xl">
                MOVI
                <span className="text-red-600">NEST</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden font-montserrat md:text-xs md:flex md:gap-4 md:items-center xmd:gap-6 lg:gap-8 xmd:text-sm xl:text-base xl:gap-10">
            {navLinks.map((link) => {
              const isActive = link.match.some((route) => {
                if (route.startsWith("exact:")) {
                  return location.pathname === route.replace("exact:", "");
                }
                return location.pathname.startsWith(route);
              });

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)} // only applies in mobile version
                  className={`relative group hover:text-red-600 transition ${
                    isActive
                      ? "text-red-600 font-semibold underline underline-offset-6"
                      : isScrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                </NavLink>
              );
            })}
          </div>

          {/* User Avatar, SignUp Modal and HambugerMenu*/}
          <div className="flex items-center gap-4 font-montserrat sm:gap-8">
            {user ? (
              <Link to="/user">
                <div className="size-8 flex items-center justify-center rounded-full border text-lg">
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    avatarLetter
                  )}
                </div>
              </Link>
            ) : (
              <Button
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                  setAuthMode("signup");
                }}
                title={"Sign Up"}
                className="bg-red-600 cursor-pointer text-white text-xs font-semibold rounded-md mx-auto p-2 sm:px-3 xmd:text-sm lg:px-4"
              />
            )}
            <span
              className="md:hidden"
              onClick={() => {
                setMenuOpen(!menuOpen);
                if (!menuOpen) setShowModal(false); // only close modal when opening menu
              }}
            >
              <CgMenuRight className="size-7 sm:size-8" />
            </span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-14 left-0 right-0 z-40 grid text-center font-montserrat p-6 mt-4 gap-4 transition-colors duration-300 sm:gap-6 md:hidden ${
                  isScrolled ? "bg-white" : "bg-black/70"
                }`}
              >
                <span onClick={() => setMenuOpen(false)}>
                  <CgClose className="mx-auto mb-5 size-7 sm:size-8" />
                </span>
                {navLinks.map((link) => {
                  const isActive = link.match.some((route) => {
                    if (route.startsWith("exact:")) {
                      return location.pathname === route.replace("exact:", "");
                    }
                    return location.pathname.startsWith(route);
                  });

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -70 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -70 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`relative group hover:text-red-600 transition ${
                          isActive
                            ? "text-red-600 font-semibold underline underline-offset-6"
                            : isScrolled
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {link.name}
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
                      </NavLink>
                    </motion.div>
                  );
                })}
              </motion.div>
              {/* Overlay when menu is open */}
              <motion.div
                key="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black z-30 h-screen"
              />
            </>
          )}
        </AnimatePresence>
      </nav>
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultMode={authMode}
      />
    </>
  );
};

export default NavBar;
