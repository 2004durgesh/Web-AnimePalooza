import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import FavoritesButton from "../FavoritesButton";

const serverOptions = ["asianload", "mixdrop", "streamtape", "streamsb"];
const DramacoolInfo = () => {
    const [data, setData] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [otherNames, setOtherNames] = useState([]);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [selectedServer, setSelectedServer] = useState("");
    const { provider, providerHeader, id } = useParams()
    const url = `https://consumet-api-pied.vercel.app/movies/${provider}/info?id=${providerHeader}/${id}`;


    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data);
            setEpisodes(data.episodes);
            setOtherNames(data.otherNames);
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
                <title>{`${data.title} - ${data.releaseDate}`} | Your DramaCool Streaming</title>
                <meta name="description" content={`Watch ${data.title} on DramaCool. ${data.type} with episodes, cast, and more. Explore ${data.title} now.`} />
            </Helmet>
            <section className="flex flex-col-reverse md:flex-row items-center justify-center mx-auto my-4 max-w-5xl">
                <div className="md:w-1/2 px-3 bg-[length:200px_100px]"
                    style={{
                        backgroundSize: "30rem 30rem",
                        background: isMobile ? `linear-gradient(to top, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 100%),url(${data.image}) no-repeat top` : 'none',
                    }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-white my-4">{data.title}</h1>
                    <p className="font-pro-medium font-semibold text-gray-200 md:text-gray-400 my-2 text-xs sm:text-sm">Plot summary: {data.description}</p>
                    <div className=" text-gray-200 md:text-gray-400 my-2 font-pro-medium">
                        Othername(s): {otherNames.map((name, index) => (
                            <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider">{name}</span>
                        ))}
                    </div>
                    <FavoritesButton type="movies" id={data.id} title={data.title} image={data.image} provider={provider} />
                    <div className="flex items-center">
                        {/* Server options */}
                        <label className="text-gray-200 md:text-gray-400 font-pro-bold font-semibold">
                            Choose Server:
                        </label>
                        <select
                            className="border-b-2 border-white text-white py-2 px-3 focus:outline-none focus:border-pro-red transition-all duration-300 w-auto ml-2 bg-black rounded-md capitalize"
                            value={selectedServer}
                            onChange={(e) => {
                                setSelectedServer(e.target.value);
                            }}
                        >
                            <option value="">Select a server</option>
                            {serverOptions.map((option) => (
                                <option key={option} value={option} className="bg-gray-800 text-white">
                                    {option}
                                </option>
                            ))}
                        </select>
                        <AiOutlineClose
                            className={`h-6 w-6 text-pro-red cursor-pointer transform ${selectedServer ? "rotate-0" : "rotate-180"
                                } transition-transform duration-300 ml-2`}
                            onClick={() => setSelectedServer("")}
                        />
                    </div>
                </div>
                <div
                    className="h-96 w-96 bg-no-repeat float-right hidden md:block overflow-hidden"
                    style={{
                        clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)'
                    }}
                >
                    <img src={data.image} alt={`image of ${data.title}`} className="h-full w-full transition duration-300 ease-in-out hover:scale-125" loading="lazy" />
                </div>
            </section>
            <section className="flex items-center justify-center mx-auto my-4 max-w-5xl">
                <div className="w-full">
                    <h1 className="text-pro-red text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-4 font-pro-bold font-semibold">
                        {episodes.length} Episodes
                    </h1>
                    {episodes.map((element) => (
                        <Link to={`/movies/${provider}/watch/${element.id}/${data.id}/${data.title}/${element.episode}/${selectedServer || "asianload"}`} key={element.id}>
                            <div className="flex flex-col hover:bg-gray-800 border-b-2 border-gray-800 rounded-lg p-4 my-2 transition duration-300 ease-in-out hover:scale-105">
                                <span className="text-white text-lg font-pro-regular">Episode {element.episode}</span>
                                <span className="text-xs text-[#D3D3D3]">Episode {element.releaseDate}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default DramacoolInfo