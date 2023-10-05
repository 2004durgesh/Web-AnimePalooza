/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "/assets/images/loading.gif";
import Confused from "/assets/images/confused.gif";
import lozad from 'lozad'
import { Helmet } from "react-helmet-async";
const SearchResults = ({ type }) => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    const { provider, query } = useParams();
    const [data, setData] = useState([]);
    const [hasNextPage, setNextPage] = useState();
    let [currentPage, setCurrentPage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const url = `https://consumet-api-pied.vercel.app/${type}/${provider}/${query}`;
    // Function to fetch data
    const fetchData = async (currentPage) => {
        try {
            const { data } = await axios.get(url, { params: { page: currentPage } });
            setData(data.results);
            setNextPage(data.hasNextPage);
            setCurrentPage(Number(data.currentPage));
            setIsLoading(false);
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to handle reaching the end of results
    const handleReachEnd = () => {
        if (hasNextPage) {
            currentPage = currentPage + 1;
            fetchData(currentPage);
        }
    };

    // Function to handle reaching the beginning of results
    const handleReachBeginning = () => {
        if (currentPage > 1) {
            currentPage = currentPage - 1;
            fetchData(currentPage);
        }
    };

    return (
        <>
            <Helmet>
                {type === 'anime' ?
                    <>
                        <title>AnimePalooza - Anime Search Results | Find Your Favorite Shows</title>
                        <meta name="description" content="Explore the search results on AnimePalooza to find your favorite anime shows and movies. Discover a vast collection of anime content, including episodes, movies, and more. Start your anime journey today!" />
                    </>
                    :
                    <>
                        <title>AnimePalooza - Movie and TV Show Streaming Providers | Watch Your Favorites</title>
                        <meta name="description" content="Discover the best movie and TV show streaming providers on AnimePalooza. Explore a variety of options, from Dramacool for Asian dramas and movies to FlixHQ for global entertainment. Find your favorite movies and shows today!" />
                    </>
                }
            </Helmet>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <img src={type === 'anime' ? Loading : Confused} alt={type === 'anime' ? "Loading... gif, saitama getting hit by stone" : "Loading... gif, Kevin Hart confused"} className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
                    <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
                        {type === 'anime' ?
                            `Just like Saitama, we are taking hits to bring you the best anime!`
                            :
                            `Just like Kevin Hart, we are confused too!`}
                    </p>
                </div>
            ) : (
                <>
                    {data.length > 0 ? (
                        <section>
                            {hasNextPage ? (
                                <span className="text-white font-pro-bold font-semibold flex items-center justify-between mx-4">
                                    {currentPage === 1 ? null : (
                                        <button className="flex items-center cursor-pointer" onClick={handleReachBeginning}>
                                            <AiOutlineLeft color="white" size={30} cursor={"pointer"} /> Back to the previous page
                                        </button>
                                    )}
                                    <span className="text-white font-pro-bold text-center">Page : {currentPage}</span>
                                    <button className="flex items-center cursor-pointer" onClick={handleReachEnd}>
                                        On to the next page <AiOutlineRight color="white" size={30} cursor={"pointer"} />
                                    </button>
                                </span>
                            ) : null}
                            <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
                                {data.map((result, index) => (
                                    <div className="bg-black" key={index}>
                                        <div className="relative h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                                            <img
                                                src={result.image}
                                                alt={result.title}
                                                className="lozad z-0 h-full w-full rounded-md object-cover"
                                                loading='lazy'
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 text-left">
                                                <h1 className="text-lg font-semibold text-white">{result.title}</h1>
                                                {type === 'anime' ?
                                                    <Link to={`/anime/info/${result.id}`}>
                                                        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                                                            View Anime &rarr;
                                                        </button>
                                                    </Link>
                                                    :
                                                    <Link to={`/movies/${provider}/info/${result.id}`}>
                                                        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                                                            View Shows &rarr;
                                                        </button>
                                                    </Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : (
                        <div className="lozad h-screen  bg-cover bg-center bg-gradient-to-r from-black/80 via-transparent to-black/80 flex flex-col items-center justify-center"
                            style={{
                                backgroundImage: `url(${type === 'anime' ? '/assets/images/No-Search-Results.gif' : '/assets/images/Where-Search-Results.gif'})`,

                            }}
                        >
                            <p className="lozad text-pro-red font-pro-bold font-semibold text-2xl md:text-4xl text-center flex items-center justify-center h-screen mix-blend-difference">
                                {type === 'anime' ? `Gojo: Can You Find it, Itadori<br />
                                Itadori: No Sensei, I cant Find ${query}` : `Where is ${query}`}
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default SearchResults;
