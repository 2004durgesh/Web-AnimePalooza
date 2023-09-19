import Trending from "../Pages/Trending";
import Recent from "../Pages/Recent";
import Divider from "../Divider";
import SearchBar from "../SearchBar";


const Anime = () => {
  return (
    <>
      <SearchBar placeholder="Search for action-packed anime adventures..."/>
      <Trending type={'anime'} provider={'gogoanime'} />
      <Divider />
      <Recent type={'anime'} provider={'gogoanime'} />
    </>
  );
};

export default Anime;
