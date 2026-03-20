import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import Genres from "./pages/Genres";
import GenresList from "./pages/GenresList";
import Anime from "./pages/Anime";
import User from "./pages/User";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import PageLoad from "./components/PageLoad";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        containerClassName="!mt-[60px] sm:!mt-[80px]"
        toastOptions={{
          duration: 3000,
          style: { fontFamily: "Montserrat" },
        }}
      />

      <PageLoad />

      <Routes>
        {/* Routes WITH Navbar/Footer */}
        <Route element={<MainLayout />}>
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
        </Route>

        {/* Route WITHOUT Navbar/Footer */}
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
    </>
  );
}

export default App;
