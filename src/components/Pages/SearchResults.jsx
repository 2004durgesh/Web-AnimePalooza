/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "/assets/images/loading.gif";
import lozad from 'lozad'

const SearchResults = ({ type, provider }) => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

    const { query } = useParams();
    const [data, setData] = useState([]);
    const [hasNextPage, setNextPage] = useState();
    let [currentPage, setCurrentPage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const url = `https://api.consumet.org/${type}/${provider}/${query}`;

    // Function to fetch data
    const fetchData = async (currentPage) => {
        try {
            const { data } = await axios.get(url, { params: { page: currentPage } });
            setData(data.results);
            setNextPage(data.hasNextPage);
            setCurrentPage(Number(data.currentPage));
            setIsLoading(false);
            console.log(data);
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
            <section>
                {isLoading ?
                    <div className="flex flex-col justify-center items-center h-screen">
                        <img src={Loading} alt="Loading..." loading='lazy'/>
                        <p className="lozad text-pro-red font-pro-bold font-semibold text-2xl text-center">
                            Just like Saitama, we are taking hits to bring you the best anime!
                        </p>
                    </div>
                    : <>
                        <span className="text-white font-pro-bold font-semibold flex items-center justify-between mx-4">
                            {currentPage === 1 ? null : (
                                <span className="flex items-center">
                                    <AiOutlineLeft color="white" size={30} onClick={handleReachBeginning} cursor={"pointer"} /> Back to the previous page
                                </span>
                            )}
                            <span className="text-white font-pro-bold text-center">Page : {currentPage}</span>
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
                                            className="lozad z-0 h-full w-full rounded-md object-cover"
                                            loading='lazy'
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 text-left">
                                            <h1 className="text-lg font-semibold text-white">{result.title}</h1>
                                            <Link to={`/anime/info/${result.id}`}>
                                                <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                                                    View Anime &rarr;
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>}
            </section>
        </>
    )
}

export default SearchResults;
