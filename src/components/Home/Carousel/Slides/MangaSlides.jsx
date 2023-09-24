import MangaPoster from "/assets/images/manga-bg.png";
import DownloadButton from "./DownloadButton";
import lozad from 'lozad'

const MangaSlides = () => {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  return (<>
    <div className="fixed top-0 left-0">
      <div className="relative">
        <img src={MangaPoster} alt="MangaPoster" className="lozad object-cover w-screen h-screen" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
        <div className="absolute inset-0 top-36 flex flex-col justify-center items-start">
          <h1 className="text-white text-2xl sm:text-4xl font-pro-bold font-bold pl-4">Unleash Your Imagination,<br />One Page at a Time</h1>
          <DownloadButton btnText={'Read Now'} />
        </div>
      </div>
    </div>
  </>
  )
}

export default MangaSlides