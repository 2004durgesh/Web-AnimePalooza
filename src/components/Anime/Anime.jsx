import Trending from "../Pages/Trending";
import Recent from "../Pages/Recent";
import Divider from "../Divider";
import SearchBar from "../SearchBar";


const Anime = () => {
  return (
    <>
      <SearchBar placeholder="Search for action-packed anime adventures..." type="anime" provider="gogoanime"/>
      <Trending type={'anime'} provider={'gogoanime'} typeOfContent={'top-airing'}/>
      <Divider />
      <Recent type={'anime'} provider={'gogoanime'} typeOfContent={'recent-episodes'}/>
    </>
  );
};

export default Anime;
