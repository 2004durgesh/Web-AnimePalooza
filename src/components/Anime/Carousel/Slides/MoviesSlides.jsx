import MovieVideo from "../../../../assets/movies-bg.mp4";
import DownloadButton from "./DownloadButton";


const MoviesSlides = () => {
  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="relative">
          <video src={MovieVideo} autoPlay muted loop className="object-cover w-screen h-screen" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black"></div>
          <div className="absolute inset-0 top-36 flex flex-col justify-center items-start">
            <h1 className="text-white text-2xl sm:text-4xl font-pro-bold font-bold  pl-4">Streaming Asian Dramas and Global 
            <br />Entertainment at Your Fingertips</h1>
            <DownloadButton btnText={'Watch Now'}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviesSlides