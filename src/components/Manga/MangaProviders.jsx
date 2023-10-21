import { Helmet } from "react-helmet-async";
import Mangadex from "/assets/images/mangadex.jpg";
import Mangareader from "/assets/images/mangareader.jpg";
import { useLocation } from 'react-router-dom';
import ProviderCard from '../ProviderCard';

const MangaProviders = () => {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <>
      <Helmet>
        <title>Explore Manga Streaming Providers - AnimePalooza</title>
        <meta name="description" content="Explore top manga sources on AnimePalooza. Dive into the world of manga with options like Mangadex for a wide range of manga titles and Mangareader for classic manga adventures. Start reading your favorite manga today!" />
      </Helmet>
      <section className="text-2xl sm:text-3xl md:text-4xl pl-4">
        <h1 className="font-pro-bold font-bold text-white mb-10 mt-20">
          Explore Manga Providers
        </h1>
        <div className="flex flex-col text-white space-y-4">
          <ProviderCard
            providerName="Mangadex"
            logoSrc={Mangadex}
            description="Unleash Your Imagination, One Page at a Time"
            linkTo={`${currentPathName}/mangadex`}
          />
          <hr />
          <ProviderCard
            providerName="Mangareader"
            logoSrc={Mangareader}
            description="Manga Dreams Unfold with Every Page, Endless Adventures Await."
            linkTo={`${currentPathName}/mangareader`}
          />
        </div>
      </section>
    </>
  );
}

export default MangaProviders;
