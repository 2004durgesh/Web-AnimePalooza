import Trending from "../Pages/Trending";
import Recent from "../Pages/Recent";
import Divider from "../Divider";
import SearchBar from "../SearchBar";


const Anime = () => {
  return (
    <>
      <SearchBar placeholder="Search for action-packed anime adventures..."/>
      <Trending provider={'gogoanime'} />
      <Divider />
      <Recent provider={'gogoanime'} />
    </>
  );
};

export default Anime;
