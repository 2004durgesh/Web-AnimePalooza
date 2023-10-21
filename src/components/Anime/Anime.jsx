import Trending from "../Pages/Trending";
import Recent from "../Pages/Recent";
import Divider from "../Divider";
import SearchBar from "../SearchBar";
import { useParams } from "react-router-dom";


const Anime = () => {
  const {provider}=useParams()
  return (
    <>
      <SearchBar placeholder="Search for action-packed anime adventures..." type="anime" provider={provider}/>
      <Trending type={'anime'} provider={provider} typeOfContent={'top-airing'}/>
      <Divider />
      <Recent type={'anime'} provider={provider} typeOfContent={'recent-episodes'}/>
    </>
  );
};

export default Anime;
