import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { FcCalendar, FcFilmReel, FcGlobe } from 'react-icons/fc'
import { useMediaQuery } from 'react-responsive';
import { Link } from "react-router-dom"

const serverOptions = ["mixdrop", "vidcloud", "upcloud"];
const FlixhqInfo = () => {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [casts, setCasts] = useState([]);
    const [selectedServer, setSelectedServer] = useState("");
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { provider, providerHeader, id } = useParams()
    const url = `https://consumet-api-pied.vercel.app/movies/${provider}/info?id=${providerHeader}/${id}`;

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data);
            setGenres(data.genres);
            setEpisodes(data.episodes);
            setCasts(data.casts);
        } catch (err) {
            throw new Error(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <section className="flex flex-col-reverse md:flex-row items-center justify-center mx-auto my-4 max-w-5xl">
                <div className="md:w-1/2 px-3 bg-[length:200px_100px]"
                    style={{
                        backgroundSize: "contain",
                        background: isMobile ? `linear-gradient(to top, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 100%),url(${data.cover}) no-repeat top` : 'none',
                    }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-white my-4">{data.title}</h1>
                    {genres.map((genre, index) => (
                        <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] text-gray-200 md:text-gray-400 border-gray-400 px-3 py-1 text-[10px] font-pro-medium font-semibold tracking-wider">{genre}</span>
                    ))}
                    <p className="font-pro-medium font-semibold text-gray-200 md:text-gray-400 my-2 text-xs sm:text-sm">Plot summary: {data.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-400">
                        {[
                            { icon: <FcCalendar color="gray" size={20} />, text: data.releaseDate },
                            { icon: <AiOutlineStar color="#FFD700" size={20} />, text: data.rating },
                            { icon: <FcGlobe size={20} />, text: data.country },
                            { icon: <FcFilmReel color="gray" size={20} />, text: data.production },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                {item.icon}
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className=" text-gray-200 md:text-gray-400 my-2 font-pro-medium">
                        Othername(s): {casts.map((genre, index) => (
                            <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider">{genre}</span>
                        ))}
                    </div>
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
                                console.log("Selected Server:", e.target.value);
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
                    <img src={data.image} alt="" className="h-full w-full transition duration-300 ease-in-out hover:scale-125" />
                </div>

            </section>
            <section className="flex items-center justify-center mx-auto my-4 max-w-5xl">
                <div className="w-full">
                    <h1 className="text-pro-red text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-4 font-pro-bold font-semibold">
                        {episodes.length} Episodes
                    </h1>
                    {episodes.map((element) => (
                        <Link to={`/movies/${provider}/watch/${element.id}/${data.id}/${data.title}/${element.number || 1}/${selectedServer || "vidcloud"}`} key={element.id}>
                            <div className="flex flex-col hover:bg-gray-800 border-b-2 border-gray-800 rounded-lg p-4 my-2 transition duration-300 ease-in-out hover:scale-105">
                                <span className="text-white text-lg font-pro-regular">{element.title}</span>
                                {data.type === 'TV Series' ? <span className='text-xs text-[#D3D3D3]'>Episode {element.number} Season{element.season}</span> : null}
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}

export default FlixhqInfo