// Import the anime video and the download button components
import AnimeVideo from "../../../../assets/anime-video-bg.mp4";
import DownloadButton from "./DownloadButton";

// Define a functional component that renders the anime slides
const AnimeSlides = () => {
  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="relative">
          <video src={AnimeVideo} autoPlay muted loop className="object-cover w-screen h-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute inset-0 top-36 flex flex-col justify-center items-start">
            <h1 className="text-white text-2xl sm:text-4xl font-pro-bold font-bold  pl-4">Embark on an Epic Journey<br /> through the World of Anime</h1>
            <DownloadButton btnText={'Watch Now'}/>
          </div>
        </div>
      </div>
    </>
  )
}

// Export the component as default
export default AnimeSlides
