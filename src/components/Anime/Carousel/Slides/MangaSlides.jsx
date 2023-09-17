import MangaPoster from "../../../../assets/manga-bg.png";
import DownloadButton from "./DownloadButton";

const MangaSlides = () => {
  return (<>
    <div className="fixed top-0 left-0">
        <div className="relative">
          <img src={MangaPoster} alt="MangaPoster" className="object-cover w-screen h-screen" loading="lazy"/>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
          <div className="absolute inset-0 top-36 flex flex-col justify-center items-start">
            <h1 className="text-white text-2xl sm:text-4xl font-pro-bold font-bold pl-4">Unleash Your Imagination,<br />One Page at a Time</h1>
            <DownloadButton btnText={'Read Now'}/>
          </div>
        </div>
      </div>
  </>
  )
}

export default MangaSlides