import { Helmet } from "react-helmet-async";
import Mangadex from "/assets/images/gogoanime.png";
import { useLocation } from 'react-router-dom';
import ProviderCard from '../ProviderCard';

const AnimeProviders = () => {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <>
      <Helmet>
        <title>Explore Anime Streaming Providers - AnimePalooza</title>
        <meta name="description" content="Explore a diverse selection of anime provider channels on AnimePalooza. Discover your favorite anime providers, ranging from popular streaming services to specialized platforms, all in one place. Stream anime content, discover new series, and access an extensive library of episodes from various providers." />
      </Helmet>
      <section className="text-2xl sm:text-3xl md:text-4xl pl-4">
        <h1 className="font-pro-bold font-bold text-white mb-10 mt-20">
          Explore Manga Providers
        </h1>
        <div className="flex flex-col text-white space-y-4">
          <ProviderCard
            providerName="Gogoanime"
            logoSrc={Mangadex}
            description="Explore endless anime series and movies on GoGoAnime, your gateway to animated adventures."
            linkTo={`${currentPathName}/gogoanime`}
          />
          <hr />
        </div>
      </section>
    </>
  );
}

export default AnimeProviders;
