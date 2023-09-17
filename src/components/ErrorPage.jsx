/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen  bg-cover bg-center bg-gradient-to-r from-black/80 via-transparent to-black/80 flex flex-col items-center justify-center" 
        style={{
            backgroundImage: `url('/404.gif')`,
        }}
        >
            <div className="text-pro-red drop-shadow-xl text-2xl sm:text-4xl text-center font-pro-bold font-extrabold mix-blend-difference">
                Lost in Gojo's Infinity Void, just like Jogo encountering the limitless darkness, where the Six Eyes oversee the Cursed Technique of Broken Links.
            </div>
            <button className="bg-pro-red text-white font-semibold py-2 px-4 rounded-md my-6 font-pro-medium">
                <Link to='/'>Break the curse</Link>
            </button>
        </div>
    );
};

export default ErrorPage;
