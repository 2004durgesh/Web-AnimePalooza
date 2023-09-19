// Import the anime video and the download button components
import AnimeGif from "/assets/images/anime-video-bg.gif";
import DownloadButton from "./DownloadButton";
import lozad from 'lozad'

// Define a functional component that renders the anime slides
const AnimeSlides = () => {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="relative">
          <img src={AnimeGif} className="lozad object-cover w-screen h-screen" loading="eager"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute inset-0 top-36 flex flex-col justify-center items-start">
            <h1 className="text-white text-2xl sm:text-4xl font-pro-bold font-bold  pl-4">Embark on an Epic Journey<br /> through the World of Anime</h1>
            <DownloadButton btnText={'Watch Now'} />
          </div>
        </div>
      </div>
    </>
  )
}

// Export the component as default
export default AnimeSlides
