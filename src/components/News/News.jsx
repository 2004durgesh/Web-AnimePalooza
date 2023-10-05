import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loading from "/assets/images/loading.gif";
import lozad from 'lozad';
import { Link, useLocation } from "react-router-dom";

const News = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const currentPathname = location.pathname;
  const url = `https://consumet-api-pied.vercel.app/news/ann/recent-feeds`;
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>AnimePalooza - Latest News | Stay Updated with Anime, Manga, and More</title>
        <meta name="description" content="Explore the latest news on AnimePalooza. Stay updated with the latest announcements, releases, and updates from the world of anime, manga, and more. Get all the information you need to know about your favorite series and genres." />
      </Helmet>
      <section className="mt-20">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center">
            <img src={Loading} alt="Loading... gif, saitama getting hit by stone" className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
            <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
              Just like Saitama, we are taking hits to bring you the best anime!
            </p>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
            {data.map((element) => (
              <div className="bg-black" key={element.id}>
                <div className="relative h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                  <img
                    src={element.thumbnail}
                    alt={element.title}
                    className="lozad z-0 h-full w-full rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-left">
                    <h1
                      className="text-lg font-semibold text-white"
                      style={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        maxWidth: "100%",
                      }}
                    >
                      {element.title}
                    </h1>
                    <div className="text-gray-200 md:text-gray-400 font-pro-medium">
                      {element.topics.map((topic) => (
                        <span className="mb-2 mr-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider capitalize" key={topic}>
                          {topic}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={{
                        pathname: `${currentPathname}/info/${element.id}`,
                        search: `?thumbnail=${encodeURIComponent(element.thumbnail)}&topics=${encodeURIComponent(element.topics.join(','))}`,
                      }}
                    >
                      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                        Read News &rarr;
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default News;
