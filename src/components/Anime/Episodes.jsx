/* eslint-disable react/prop-types */

import { Link} from "react-router-dom"


const Episodes = ({ episodes,title }) => {

    return (
        <>
            <section className="flex items-center justify-center mx-auto my-4 max-w-5xl">
                <div className="w-full">
                    <h1 className="text-pro-red text-2xl md:text-3xl lg:text-4xl xl:text-5xl p-4 font-pro-bold font-semibold">
                        {episodes.length} Episodes
                    </h1>
                    {episodes.map((element) => (
                        <Link to={`/anime/gogoanime/watch/${element.id}/${title}`} key={element.id}>
                            <div className=" hover:bg-gray-800 border-b-2 border-gray-800 rounded-lg p-4 my-2 transition duration-300 ease-in-out hover:scale-105">
                                <span className="text-white text-lg font-pro-regular">Episode {element.number}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </>
    )
}

export default Episodes