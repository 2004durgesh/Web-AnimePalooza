/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Confused from "/assets/images/confused.gif";
import Loading from "/assets/images/loading.gif";
import lozad from 'lozad'
import { Helmet } from "react-helmet-async";

const Trending = ({ type, provider, typeOfContent }) => {
  const observer = lozad(); // Lazy loads elements with default selector as '.lozad'
  observer.observe();

  const [data, setData] = useState();
  const [hasNextPage, setNextPage] = useState();
  let [currentPage, setCurrentPage] = useState('');
  const [isloading, setIsLoading] = useState(true)
  const location = useLocation();
  const currentPathname = location.pathname;

  const url = `${import.meta.env.VITE_API_BASE_URL}/${type}/${provider}/${typeOfContent}`;
  console.log(url)
  const fetchData = async (currentPage) => {
    try {
      const { data } = await axios.get(url, { 
        params: { page: currentPage } ,
        headers:{'x-api-key':import.meta.env.VITE_API_KEY}});
      setData(data.results);
      setNextPage(data.hasNextPage);
      setCurrentPage(Number(data.currentPage));
      setIsLoading(false)
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReachEnd = () => {
    if (hasNextPage) {
      currentPage = currentPage + 1;
      fetchData(currentPage);
    }
  };

  const handleReachBeginning = () => {
    if (currentPage > 1) {
      currentPage = currentPage - 1;
      fetchData(currentPage);
    }
  };

  return (
    <>
      <Helmet>
        {type === 'anime' ? (
          <>
            <title>AnimePalooza - Trending Anime Episodes | Watch Anime Online</title>
            <meta
              name="description"
              content="Discover the hottest anime and trending shows on AnimePalooza. Explore a collection of popular anime series and movies that are capturing the hearts of fans. Join the anime hype today!"
            />
          </>
        ) : (
          <>
            <title>AnimePalooza - Trending Movies and TV-Shows Episodes | Watch Movies-TV-Shows Online</title>
            <meta
              name="description"
              content="Explore the hottest trending movies and TV shows on AnimePalooza. Stay up to date with the latest buzz in the world of entertainment. Join our community and discover what's currently popular!"
            />
          </>
        )}
      </Helmet>

      <section>
        {isloading ?
          <div className="flex flex-col justify-center items-center">
            <img src={type === 'anime' ? Loading : Confused} alt={type === 'anime' ? "Loading... gif, saitama getting hit by stone" : "Loading... gif, Kevin Hart confused"} className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
            <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
              {type === 'anime' ?
                `Just like Saitama, we are taking hits to bring you the best anime!`
                :
                `Just like Kevin Hart, we are confused too!`}
            </p>
          </div>
          :
          <>
            <header className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-pro-red pl-4 my-8">
              {type === 'anime' ?
                <h1 >
                  Trending like Goku going Super Saiyan!
                </h1>
                :
                <h1>
                  Trending like Tony Stark in an Iron Man suit!
                </h1>}
            </header>

            {hasNextPage ? <span className="text-white font-pro-bold font-semibold flex items-center justify-between mx-4">
              {currentPage === 1 ? null : (
                <button className="flex items-center cursor-pointer" onClick={handleReachBeginning}>
                  <AiOutlineLeft color="white" size={30} cursor={"pointer"} /> Back to previous page
                </button>
              )}
              <span className="text-white font-pro-bold text-center">Page : {currentPage}</span>
              <button className="flex items-center cursor-pointer" onClick={handleReachEnd}>
                On to the next page <AiOutlineRight color="white" size={30} cursor={"pointer"} />
              </button>
            </span> : null}
            <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
              {data.map((result, index) => (
                <div className="bg-black" key={index}>
                  <div className="relative h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                    <img
                      src={result.image}
                      alt={result.title}
                      className="z-0 h-full w-full rounded-md object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-left">
                      <h1 className="text-lg font-semibold text-white">{result.title}</h1>
                      <Link to={`${currentPathname}/info/${result.id}`}>
                        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                          {type === 'anime' ?
                            'View Anime \u2192'
                            :
                            'View Shows \u2192'
                          }
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      </section>
    </>
  );
};

export default Trending;
