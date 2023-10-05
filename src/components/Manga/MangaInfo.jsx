import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import Loading from "/assets/images/loading.gif";
import { AiOutlineClockCircle, AiOutlineStar } from "react-icons/ai";
import { FcCalendar } from 'react-icons/fc'
import { RiCheckDoubleFill } from "react-icons/ri";
import lozad from 'lozad'
import parse from 'html-react-parser';
import Recommendations from "./Recommendations";
import Relations from "./Relations";
import Characters from "./Characters";
import Chapters from "./Chapters";
const MangaInfo = () => {
  const { provider, id } = useParams()
  const [data, setData] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [relations, setRelations] = useState([])
  const [characters, setCharacters] = useState([])
  const [chapters, setChapters] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();

  const url = `https://consumet-api-pied.vercel.app/meta/anilist-manga/info/${id}?provider=${provider}`
  
console.log(url)
  // Fetch data when the component mounts
  useEffect(() => {
    // Function to fetch data
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url);
      setData(data);
      setRecommendations(data.recommendations);
      setRelations(data.relations);
      setCharacters(data.characters);
      setChapters(data.chapters);
      setIsLoading(false);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  fetchData()
  }, [url]);
  return (
    <>
      {isLoading ?
        (<div className="flex flex-col justify-center items-center h-screen">
          <img src={Loading} alt={"Loading... gif, saitama getting hit by stone"} className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
          <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
            Just like Saitama, we are taking hits to bring you the best manga!
          </p>
        </div>) :
        (
          <>
            <section className="">
              <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center mx-auto mb-4 max-w-7xl"
                style={{
                  background: `linear-gradient(to top, ${data.color ? data.color : 'rgba(0,0,0,.2)'} -35%, rgba(0,0,0,.5) 20% 80%, ${data.color ? data.color : 'rgba(0,0,0,1)'} 150%),url(${data.cover}) no-repeat top`,
                  backgroundSize: "100% 100%",
                }}>
                <div className="md:w-1/2 mx-auto px-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-pro-bold font-bold text-white my-4">{data.title.english}</h1>
                  {data.genres.map((genre, index) => (
                    <span key={index} className="mb-2 mr-2 inline-block rounded-full border-[2px] text-gray-200 border-gray-400 px-3 py-1 text-[10px] font-pro-medium font-semibold tracking-wider">{genre}</span>
                  ))}
                  <p className="font-pro-medium font-semibold text-gray-200  my-2 text-xs sm:text-sm">
                    Plot summary: {parse(`${data.description}`)}</p>
                  <span className="flex flex-row items-center font-pro-medium text-gray-200  gap-4">
                    {data.status === "Ongoing" ? (
                      <>
                        <AiOutlineClockCircle color="gray" size={20} />Ongoing
                      </>
                    ) : (
                      <>
                        <RiCheckDoubleFill color="gray" size={20} />Completed
                      </>
                    )}
                  </span>

                  <div className="grid grid-cols-2 gap-2 text-gray-200">
                    {[
                      {
                        icon: <FcCalendar color="gray" size={20} />,
                        text: data.startDate.year
                          ? `StartDate ${data.startDate.year}/${data.startDate.month}/${data.startDate.day}`
                          : "Not available",
                      },
                      {
                        icon: <FcCalendar color="gray" size={20} />,
                        text: data.endDate.year
                          ? `EndDate ${data.endDate.year}/${data.endDate.month}/${data.endDate.day}`
                          : "Not available since ongoing",
                      },
                      {
                        icon: <AiOutlineStar color="#FFD700" size={20} />,
                        text: data.rating !== null
                          ? data.rating / 10
                          : "Not available",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 font-pro-medium font-medium">
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className=" text-gray-100  my-2 font-pro-medium">
                    Othername(s):
                    <span className="mb-2 mx-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider">{data.title.romaji}</span>
                    <span className="mb-2 mx-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider">{data.title.native}</span>
                  </div>
                  <div className="">

                  </div>
                </div>
                <div
                  className="hidden md:block overflow-hidden pr-4">
                  <img src={data.image} alt={`image of ${data.title}`} className="w-52 transition duration-300 ease-in-out hover:scale-125 hover:opacity-0" loading="lazy" />
                </div>
              </div>
            </section>
            <Characters data={characters} provider={provider} />
            <Recommendations data={recommendations} provider={provider} />
            <Relations data={relations} provider={provider} />
            <Chapters data={chapters} provider={provider} />
          </>
        )
      }
    </>
  )
}

export default MangaInfo