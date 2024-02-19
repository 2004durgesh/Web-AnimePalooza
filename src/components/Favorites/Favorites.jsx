/* eslint-disable react/prop-types */
import lozad from "lozad";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { useSelector } from "react-redux"
const Favorites = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    const favoriteShows = localStorage.getItem("favoriteShows");
    setData(JSON.parse(favoriteShows))
  }, [])
  const observer = lozad(); // Lazy loads elements with default selector as '.lozad'
  observer.observe();

  return (
    <>
      <section className="mt-32">
        <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
          {data.length > 0 ? (
            data.map((result) => (
              <div className="bg-black" key={result.id}>
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
                    <Link to={`/${result.type}/${result.provider}/info/${result.id}`}>
                      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                        {result.type === 'anime'
                          ? 'View Anime \u2192'
                          : result.type === 'movies'
                            ? 'View Shows \u2192'
                            : 'Read Manga \u2192'}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-white font-bold flex flex-col justify-center gap-4">
              <span className="text-4xl md:text-6xl lg:text-7xl">{'.·´¯`(>__<)´¯`·.'}</span>
              <span className="md:text-xl lg:text-2xl">No favorites found</span>
            </div>

          )}
        </div>
      </section>

    </>
  )
}

export default Favorites