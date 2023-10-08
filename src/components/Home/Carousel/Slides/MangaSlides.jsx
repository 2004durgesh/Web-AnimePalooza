import DownloadButton from "./DownloadButton";
import lozad from 'lozad'

const MangaSlides = () => {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="relative">
          <picture className="lozad object-cover w-screen h-screen" loading="eager" alt="MangaPoster">
            <source srcSet="/assets/images/manga-bg-images/main/4055.png" media="(min-width: 1920px)" />
            <source srcSet="/assets/images/manga-bg-images/main/3755.png" media="(min-width: 1280px)" />
            <source srcSet="/assets/images/manga-bg-images/main/3638.png" media="(min-width: 1600px)" />
            <source srcSet="/assets/images/manga-bg-images/main/3058.png" media="(min-width: 1024px)" />
            <source srcSet="/assets/images/manga-bg-images/main/2445.png" media="(min-width: 800px)" />
            <source srcSet="/assets/images/manga-bg-images/main/1295.png" media="(min-width: 640px)" />
            <source srcSet="/assets/images/manga-bg-images/main/480.png" media="(min-width: 320px)" />
            <img src="/assets/images/manga-bg-images/main/4340.png" className="lozad object-cover w-screen h-screen" loading="eager" alt="MangaPoster" />
          </picture>

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