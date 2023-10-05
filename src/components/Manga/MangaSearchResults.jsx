/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineUp } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "/assets/images/loading.gif";
import lozad from 'lozad'
import parse from 'html-react-parser';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from "react-helmet-async";

const MangaSearchResults = () => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    const { provider, query } = useParams();
    const [data, setData] = useState([]);
    const [hasNextPage, setNextPage] = useState();
    let [currentPage, setCurrentPage] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const url = `https://consumet-api-pied.vercel.app/meta/anilist-manga/${query}`;

    // Function to fetch data
    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data.results);
            setNextPage(false);
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
                <title>AnimePalooza - Manga Search Results | Find Your Favorite Manga</title>
                <meta name="description" content="Explore the search results on AnimePalooza to find your favorite manga series. Discover a diverse collection of manga titles, including genres like action, romance, fantasy, and more. Start your manga adventure today!" />
            </Helmet>
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <img src={Loading} alt="Loading... gif, saitama getting hit by stone" className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
                    <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
                        Just like Saitama, we are taking hits to bring you the best anime!
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
                            {isMobile ? (
                                <div className="flex flex-col flex-wrap gap-4 flex-auto font-pro-bold">
                                    {data.map((result, index) => (
                                        <div className="bg-black" key={index}>
                                            <div className="h-[226.6px] rounded-md mx-4 my-4">
                                                <div className="flex flex-row  h-full">
                                                    <img
                                                        src={result.image}
                                                        alt={result.title}
                                                        className="lozad z-0 h-full w-[170px] rounded-md object-cover"
                                                        loading='lazy'
                                                    />
                                                    <div className="flex flex-col p-4"
                                                        style={{
                                                            backgroundImage: result.color ? `linear-gradient(to right, ${result.color} -50%, transparent)` : 'linear-gradient(to top, #000000 75%, transparent)'
                                                        }}
                                                    >
                                                        <div className="text-white font-pro-medium font-semibold overflow-hidden">
                                                            {parse(`${result.description || result.title.userPreferred}`)}
                                                        </div>
                                                        <div className="mt-2">
                                                            <h1 className="text-lg font-semibold text-white">{result.title.userPreferred}</h1>
                                                            <Link to={`/manga/${provider}/info/${result.id}`}>
                                                                <button className="mt-1 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                                                                    Read This Manga &rarr;
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            ) : (
                                <div className="flex flex-row flex-wrap gap-4 justify-center flex-auto font-pro-bold">
                                    {data.map((result, index) => (
                                        <div className="bg-black" key={index}>
                                            <div className="relative overflow-hidden h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                                                <div>
                                                    <img
                                                        src={result.image}
                                                        alt={result.title.userPreferred}
                                                        className="lozad z-0 h-full w-full rounded-md object-cover"
                                                        loading='lazy'
                                                    />
                                                    <div className='absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent'>

                                                    </div>
                                                    <div className="absolute inset-0 transition-transform duration-700 z-50 translate-y-[85%] hover:translate-y-0"
                                                        style={{
                                                            backgroundImage: result.color ? `linear-gradient(to top, ${result.color} 75%, transparent)` : 'linear-gradient(to top, #000000 75%, transparent)'
                                                        }}
                                                    >
                                                        <AiOutlineUp size={40} color='white' className='-mb-7'/>
                                                        <div className="text-white font-pro-medium font-semibold p-4">
                                                            {parse(`${result.description || result.title.userPreferred}`)}
                                                        </div>
                                                    </div>
                                                    <div className="absolute top-4 left-4 text-left">
                                                        <h1 className="text-lg font-semibold text-white">{result.title.userPreferred}</h1>
                                                        <Link to={`/manga/${provider}/info/${result.id}`}>
                                                            <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white capitalize">
                                                                Read This Manga &rarr;
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            }

                        </section>
                    ) : (
                        <div className="lozad h-screen  bg-cover bg-center bg-gradient-to-r from-black/80 via-transparent to-black/80 flex flex-col items-center justify-center"
                            style={{
                                backgroundImage: 'url(/assets/images/No-Search-Results.gif)',

                            }}
                        >
                            <p className="lozad text-pro-red font-pro-bold font-semibold text-2xl md:text-4xl text-center flex items-center justify-center h-screen mix-blend-difference">
                                Gojo: Can You Find it, Itadori<br />
                                Itadori: No Sensei, I cant Find {query}
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default MangaSearchResults;
