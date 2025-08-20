import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import Genres from "./pages/Genres";
import GenresList from "./pages/GenresList";
import Anime from "./pages/Anime";
import ScrollToTop from "./components/ScrollToTop";
import User from "./pages/User";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import PageLoad from "./components/PageLoad";



function App() {
  return (
    <>
      <NavBar />
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <PageLoad />
      {/* Define routes for the application */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/movie/:id" element={<Details />} />
        <Route path="/search/tv/:id" element={<Details />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/trending/movie/:id" element={<Details />} />
        <Route path="/trending/tv/:id" element={<Details />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/movie/:id" element={<Details />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/tv-series/tv/:id" element={<Details />} />
        <Route path="/genre" element={<Genres />} />
        <Route path="/genre/:type/:genreId" element={<GenresList />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/tv/:id" element={<Details />} />
        <Route path="/anime/movie/:id" element={<Details />} />

        {/* Protected */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ScrollToTop />
      <Footer />
    </>
  );
}
export default App;
