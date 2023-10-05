import { Helmet } from "react-helmet-async";
import Dramacool from "/assets/images/dramacool.jpeg";
import Flixhq from "/assets/images/flixhq.png";
import { useLocation } from 'react-router-dom';
import ProviderCard from './MovieProviderCard';

const MovieProviders = () => {
  const location = useLocation();
  const currentPathName = location.pathname;

  return (
    <>
      <Helmet>
        <title>Explore Movie Streaming Providers - AnimePalooza</title>
        <meta name="description" content="Discover the best movie streaming providers on AnimePalooza. Explore a variety of options, from Dramacool for Asian dramas and movies to FlixHQ for global entertainment. Find your favorite movies and shows today!" />
      </Helmet>
      <section className="text-2xl sm:text-3xl md:text-4xl pl-4">
        <h1 className="font-pro-bold font-bold text-white mb-10 mt-20">
          Explore Movies Providers
        </h1>
        <div className="flex flex-col text-white space-y-4">
          <ProviderCard
            providerName="Dramacool"
            logoSrc={Dramacool}
            description="Your Ultimate destination for Asian Dramas and Movies"
            linkTo={`${currentPathName}/dramacool`}
          />
          <hr />
          <ProviderCard
            providerName="FlixHQ"
            logoSrc={Flixhq}
            description="Streaming Global Entertainment at Your FingerTips"
            linkTo={`${currentPathName}/flixhq`}
          />
        </div>
      </section>
    </>
  );
}

export default MovieProviders;
