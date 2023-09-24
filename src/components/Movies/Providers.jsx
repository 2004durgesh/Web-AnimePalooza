import { Helmet } from "react-helmet";
import Dramacool from "/assets/images/dramacool.jpeg"
import Flixhq from "/assets/images/flixhq.jpeg"
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Providers = () => {
    const location = useLocation()
    const currentPathName = location.pathname
    return (
        <>
            <Helmet>
                <title>Explore Movie Streaming Providers - AnimePalooza</title>
                <meta name="description" content="Discover the best movie streaming providers on AnimePalooza. Explore a variety of options, from Dramacool for Asian dramas and movies to FlixHQ for global entertainment. Find your favorite movies and shows today!"/>
            </Helmet>
            <section className="text-2xl sm:text-3xl md:text-4xl pl-4">
                <h1 className=" font-pro-bold font-bold text-white mb-10 mt-20">
                    Explore Movies Providers
                </h1>
                <div className="flex flex-col text-white space-y-4">
                    <Link to={`${currentPathName}/dramacool`}>
                        <div className="flex items-center space-x-4">
                            <img src={Dramacool} alt="Dramacool Providers logo" className="w-20 sm:w-32 md:w-40" />
                            <div className="flex flex-col">
                                <p className="font-pro-medium font-semibold">Dramacool</p>
                                <span className="text-lg sm:text-2xl md:text-3xl font-pro-regular">Your Ultimate destination for Asian Dramas and Movies</span>
                            </div>
                        </div>
                    </Link>
                    <hr />
                    <Link to={`${currentPathName}/flixhq`}>
                        <div className="flex items-center space-x-4">
                            <img src={Flixhq} alt="FlixHQ Providers logo" className="w-20 sm:w-32 md:w-40" />
                            <div className="flex flex-col">
                                <p className="font-pro-medium font-semibold">FlixHQ</p>
                                <span className="text-lg sm:text-2xl md:text-3xl font-pro-regular">Streaming Global Entertainment at Your FingerTips</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>
        </>

    )
}

export default Providers