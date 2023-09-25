import { Routes, Route, useLocation } from "react-router-dom";

// Import your components
import Anime from "./components/Anime/Anime";
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Manga from "./components/Manga/Manga";
import Movies from "./components/Movies/Movies";
import News from "./components/News/News";
import Home from "./components/Home/Home";
import AnimeInfo from "./components/Anime/Info";
import MoviesInfo from "./components/Movies/MoviesInfo";
import VideoStreaming from "./components/Pages/VideoStreaming.jsx";
import SearchResults from "./components/Pages/SearchResults";
import Providers from "./components/Movies/Providers";

function App() {
  const location = useLocation();
  const showNavbarRoutes = ['/', '/anime', '/manga', '/movies','/movies/dramacool','/movies/flixhq', '/news'];

  return (
    <>
      <div>
        {/* Display Navbar on specific routes */}
        {(showNavbarRoutes.includes(location.pathname)) && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime/info/:id" element={<AnimeInfo />} />
          {/* Route for anime search results */}
          <Route path="/anime/:provider/search/:query" element={<SearchResults type="anime"/>} />
          <Route path="/anime/:provider/watch/:episodeId/:title/:episodeNumber" element={<VideoStreaming type="anime"/>} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/movies" element={<Providers/>} />
          <Route path="/movies/:provider" element={<Movies/>} />
          <Route path="/movies/:provider/info/:providerHeader/:id" element={<MoviesInfo/>} /> {/* here type can be movie or tv for flixhq and drama-detail for dramacool */}
          {/* Route for movie search results */}
          <Route path="/movies/:provider/search/:query" element={<SearchResults type="movies"/>} />
          <Route path="/movies/:provider/watch/:episodeId/:providerHeader/:mediaId/:title/:episodeNumber/:server" element={<VideoStreaming type="movies" />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
