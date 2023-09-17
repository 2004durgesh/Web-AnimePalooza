/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import Loading from "/loading.gif";

const Recent = ({ provider }) => {
  const [data, setData] = useState([]);
  const [hasNextPage, setNextPage] = useState();
  let [currentPage, setCurrentPage] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation();
  const currentPathname = location.pathname;

  const url = `https://consumet-api-pied.vercel.app/anime/${provider}/recent-episodes`;

  const fetchData = async (currentPage) => {
    try {
      const { data } = await axios.get(url, { params: { page: currentPage } });
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
    <section>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-pro-red pl-4 my-10">
        Boost Your Anime Journey with the Latest Episodes!
      </h1>

      {isLoading ?
        <div className="flex flex-col justify-center items-center">
          <img src={Loading} alt="Loading..." className="w-3/4 md:w-1/2" />
          <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
            Just like Saitama, we are taking hits to bring you the best anime!
          </p>
        </div>
        :
        <>
          <span className="text-white font-pro-bold font-semibold flex items-center justify-between mx-4">
            {currentPage === 1 ? null : (
              <span className="flex items-center">
                <AiOutlineLeft color="white" size={30} onClick={handleReachBeginning} cursor={"pointer"} /> Back to the previous page
              </span>
            )}
            <span className="text-white font-pro-bold text-center">Page: {currentPage}</span>
            <span className="flex items-center">
              On to the next page <AiOutlineRight color="white" size={30} onClick={handleReachEnd} cursor={"pointer"} />
            </span>
          </span>
          <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
            {data.map((result, index) => (
              <div className="bg-black" key={index}>
                <div className="relative h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="z-0 h-full w-full rounded-md object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-left">
                    <h1 className="text-lg font-semibold text-white">{result.title}</h1>
                    <Link to={`${currentPathname}/info/${result.id}`}>
                      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                        View Anime &rarr;
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
  );
};

export default Recent;
