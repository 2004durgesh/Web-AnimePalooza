import Anime from "./components/Anime/Anime"
import Navbar from "./components/Navbar";
import ErrorPage from "./components/ErrorPage";
import Manga from "./components/Manga/Manga"
import Movies from "./components/Movies/Movies"
import News from "./components/News/News"
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Info from "./components/Anime/Info";
import VideoStreaming from "./components/Pages/VideoStreaming.jsx";
import SearchResults from "./components/Pages/SearchResults";

function App() {
  const location = useLocation();
  return (
    <>
      <div>
        {(location.pathname === '/' || location.pathname === '/anime' || location.pathname === '/manga' || location.pathname === '/movies' || location.pathname === '/news') && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/anime/info/:id" element={<Info />} />
          <Route path="/anime/search/:query" element={<SearchResults type="anime" provider="gogoanime"/>} />
          <Route path="/anime/watch/:episodeId" element={<VideoStreaming type="anime" provider="gogoanime" server="gogocdn" />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/news" element={<News />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

      </div>
    </>
  )
}

export default App
