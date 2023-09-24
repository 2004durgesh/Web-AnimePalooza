import { useParams } from "react-router-dom"
import Trending from "../Pages/Trending";
import Recent from "../Pages/Recent";
import Divider from "../Divider";
import SearchBar from "../SearchBar";
const Movies = () => {
  const { provider } = useParams()
  return (<>
    <SearchBar placeholder="Search for movies, TV shows, and more" type="movies" provider={provider}/>
    <Trending type={'movies'} provider={provider} typeOfContent={'trending'}/>
    <Divider />
    <Recent type={'movies'} provider={provider} typeOfContent={'recent-movies'}/>
  </>
  )
}

export default Movies