import { useParams } from "react-router-dom"
import FlixhqInfo from "./FlixhqInfo"
import DramacoolInfo from "./DramacoolInfo"

const MoviesInfo = () => {
    const{provider}=useParams()
    
  return (
    <>
      {provider==="flixhq"?<FlixhqInfo/>:<DramacoolInfo/>}
    </>

  )
}

export default MoviesInfo