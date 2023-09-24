import { useParams } from "react-router-dom"
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { AiOutlineClockCircle } from "react-icons/ai";
// import { RiCheckDoubleFill } from "react-icons/ri";
// import { useMediaQuery } from 'react-responsive';
// import Episodes from "./Episodes";



const FlixhqInfo = () => {
    // const [data, setData] = useState({});
    // const [genres, setGenres] = useState([]);
    // const [episodes, setEpisodes] = useState([]);
    // const [otherName, setOtherName] = useState([]);
    // const isMobile = useMediaQuery({ maxWidth: 767 });
    const { provider, type, id } = useParams()
    console.log(provider, type, id)
    const url = `https://consumet-api-pied.vercel.app/movies/${provider}/info?id=${type}/${id}`;
    console.log(url)


    // const fetchData = async () => {
    //     try {
    //         const { data } = await axios.get(url);
    //         setData(data);
    //         setGenres(data.genres);
    //         setEpisodes(data.episodes);
    //         setOtherName(data.otherName);
    //     } catch (err) {
    //         throw new Error(err.message);
    //     }
    // };

    // useEffect(() => {
    //     fetchData();
    // }, []);
    return (
        <div className="bg-red-500">FlixhqInfo</div>
    )
}

export default FlixhqInfo