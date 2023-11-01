import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import lozad from "lozad";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Helmet } from "react-helmet-async";
import Loading from "/assets/images/loading.gif";

const MangaRead = () => {
    const { chapterId, provider,title,chapterNumber } = useParams();
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const url = `${import.meta.env.VITE_API_BASE_URL}/meta/anilist-manga/read?chapterId=${chapterId}&provider=${provider}`;

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url,{
                headers:{'x-api-key':import.meta.env.VITE_API_KEY}
            });
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
                <title>{`Read ${title} Chapter ${chapterNumber} Online | AnimePalooza Manga | Manga Chapter ${chapterNumber} of ${title}`}</title>
                <meta
                    name="description"
                    content={`Read ${title} Chapter ${chapterNumber} online on AnimePalooza Manga. Dive into the manga world with Chapter ${chapterNumber} of ${title}. Enjoy your manga reading adventure!`}
                />
            </Helmet>

            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-screen">
                    <img src={Loading} alt="Loading... gif, saitama getting hit by stone" className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
                    <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
                        Just like Saitama, we are taking hits to bring you the best manga!
                    </p>
                </div>
            ) : (
                <Swiper
                    centeredSlides={true}
                    cssMode={true}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        1200: {
                            slidesPerView: 4,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        900: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        480: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {data.map((element) => (
                        <SwiperSlide key={element.id} className="mx-4 h-screen">
                            <div className="">
                                <img
                                    src={element.img}
                                    alt={`Manga Page ${element.id}`}
                                    className="lozad w-screen"
                                    loading="eager"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
};

export default MangaRead;
