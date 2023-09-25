/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiCheckDoubleFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import Episodes from "./Episodes";

const Info = () => {
    const [data, setData] = useState({});
    const [genres, setGenres] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [otherName, setOtherName] = useState([]);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { id } = useParams();

    const url = `https://consumet-api-pied.vercel.app/anime/gogoanime/info/${id}`;

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data);
            setGenres(data.genres);
            setEpisodes(data.episodes);
            setOtherName(data.otherName.split("/"));
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
                        backgroundSize: "30rem 30rem",
                        background: isMobile ? `linear-gradient(to top, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 100%),url(${data.image}) no-repeat top` : 'none',
                    }}>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-white my-4">{data.title}</h1>
                    {genres.map((genre, index) => (
                        <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] text-gray-200 md:text-gray-400 border-gray-400 px-3 py-1 text-[10px] font-pro-medium font-semibold tracking-wider">{genre}</span>
                    ))}
                    <p className="font-pro-medium font-semibold text-gray-200 md:text-gray-400 my-2 text-xs sm:text-sm">{data.description}</p>
                    {data.status === "Ongoing" ?
                        <span className="flex flex-row items-center font-pro-medium text-gray-200 md:text-gray-400 gap-4">
                            <AiOutlineClockCircle color="gray" size={20} />Ongoing
                        </span>
                        :
                        <span className="flex flex-row items-center text-gray-400 gap-4">
                            <RiCheckDoubleFill color="gray" size={20} />Completed
                        </span>}
                    <div className=" text-gray-200 md:text-gray-400 my-2 font-pro-medium">
                        Othername(s): {otherName.map((genre, index) => (
                            <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider">{genre}</span>
                        ))}
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
            <Episodes episodes={episodes} title={data.title}/>
        </>
    );
};

export default Info;
