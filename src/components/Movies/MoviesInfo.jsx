import { useParams } from "react-router-dom"
import FlixhqInfo from "./FlixhqInfo"
import DramacoolInfo from "./DramacoolInfo"

const MoviesInfo = () => {
    const{provider,type,id}=useParams()
    console.log(provider,type,id)
    
  return (
    <>
      {provider==="flixhq"?<FlixhqInfo/>:<DramacoolInfo/>}
    </>

  )
}

export default MoviesInfo