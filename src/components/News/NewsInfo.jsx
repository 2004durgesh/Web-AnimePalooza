import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import lozad from 'lozad';
import Loading from "/assets/images/loading.gif";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const NewsInfo = () => {
    const { date, id, newsNumber } = useParams();
    const [data, setData] = useState({});
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const thumbnail = new URLSearchParams(location.search).get("thumbnail");
    const topics = new URLSearchParams(location.search).get("topics").split(",").join(" ").toUpperCase();
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();

    const newsId = `${date}/${id}/${newsNumber}`;
    const url = `https://consumet-api-pied.vercel.app/news/ann/info?id=${newsId}`;

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data);
            setIsLoading(false);
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
                <title>{`AnimePalooza - ${data.title} | Latest ${topics} News`}</title>
                <meta name="description" content={`Read the latest news about ${data.title} in the ${topics} category on AnimePalooza. Stay updated with all the details, announcements, and insights about this ${topics}. Get in-depth information about ${data.title} and its latest developments.`} />
            </Helmet>
            <section className="text-white px-6">
                {isLoading ? (
                    <div className="h-screen flex flex-col justify-center items-center">
                        <img src={Loading} alt="Loading... gif, saitama getting hit by stone" className="lozad w-3/4 md:w-1/2 h-[303px]" loading="eager" />
                        <p className="text-pro-red font-pro-bold font-semibold text-2xl text-center">
                            Just like Saitama, we are taking hits to bring you the best news!
                        </p>
                    </div>
                ) : (
                    <div className="px-4 md:px-0">
                        <div className="mb-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold font-pro-bold">
                                {data.title}
                            </h2>
                            <p className="text-gray-400 text-sm font-pro-medium mt-5">{data.uploadedAt}</p>
                        </div>
                        <div className="mb-4 flex justify-center">
                            <img
                                src={thumbnail}
                                alt={data.title}
                                className="lozad w-full md:max-w-[32rem] rounded-lg hover:scale-110 duration-300 ease-in-out"
                                loading="eager"
                            />
                        </div>
                        <p className="text-lg md:text-xl lg:text-2xl font-pro-medium mb-4">{data.intro}</p>
                        <p className="text-gray-400 font-pro-regular mb-4">{data.description}</p>
                        <Link
                            to={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pro-red p-3 rounded-lg font-pro-medium transition-colors duration-300 ease-in-out hover:text-pro-red hover:bg-white inline-block"
                        >
                            Read more
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
};

export default NewsInfo;
