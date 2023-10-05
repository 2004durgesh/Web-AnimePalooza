import { useParams } from "react-router-dom"
import SearchBar from "../SearchBar";
const Manga = () => {
  const { provider } = useParams()
  return (<>
    <SearchBar placeholder="Search for your favorite manga..." type="manga" provider={provider} />
  </>
  )
}

export default Manga