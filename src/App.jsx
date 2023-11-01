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
import MovieProviders from "./components/Movies/MovieProviders";
import MangaProviders from "./components/Manga/MangaProviders";
import MangaSearchResults from "./components/Manga/MangaSearchResults";
import MangaInfo from "./components/Manga/MangaInfo";
import MangaRead from "./components/Pages/MangaRead";
import NewsInfo from "./components/News/NewsInfo";
import Favorites from "./components/Favorites/Favorites";
import AnimeProviders from "./components/Anime/AnimeProviders";

function App() {
  const location = useLocation();
  const showNavbarRoutes = ['/', '/anime', '/anime/gogoanime', '/manga', '/manga/mangadex', '/manga/mangareader', '/movies', '/movies/dramacool', '/movies/flixhq', '/news', '/favorites'];

  return (
    <>
      <div>
        {/* Display Navbar on specific routes */}
        {(showNavbarRoutes.includes(location.pathname)) && <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/anime" element={<AnimeProviders />} />
          <Route path="/anime/:provider" element={<Anime />} />
          <Route path="/anime/:provider/info/:id" element={<AnimeInfo />} />
          <Route path="/anime/:provider/search/:query" element={<SearchResults type="anime" />} />
          <Route path="/anime/:provider/watch/:episodeId/:title" element={<VideoStreaming type="anime" />} />

          <Route path="/manga" element={<MangaProviders />} />
          <Route path="/manga/:provider" element={<Manga />} />
          <Route path="/manga/:provider/search/:query" element={<MangaSearchResults />} />
          <Route path="/manga/:provider/info/:id" element={<MangaInfo />} />
          <Route path="/manga/:provider/read/:chapterId/:title/:chapterNumber" element={<MangaRead />} />


          <Route path="/movies" element={<MovieProviders />} />
          <Route path="/movies/:provider" element={<Movies />} />
          <Route path="/movies/:provider/info/:providerHeader/:id" element={<MoviesInfo />} /> {/* here type can be movie or tv for flixhq and drama-detail for dramacool */}
          <Route path="/movies/:provider/search/:query" element={<SearchResults type="movies" />} />
          <Route path="/movies/:provider/watch/:episodeId/:providerHeader/:mediaId/:title/:episodeNumber/:server" element={<VideoStreaming type="movies" />} />

          <Route path="/news" element={<News />} />
          <Route path="/news/info/:date/:id/:newsNumber" element={<NewsInfo />} />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
