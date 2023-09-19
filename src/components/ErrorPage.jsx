/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import lozad from 'lozad'
import { Helmet } from "react-helmet";

const ErrorPage = () => {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    return (<>
        <Helmet>
            <title>AnimePalooza - Lost in Gojo's Infinity Void</title>
            <meta
                name="description"
                content="Oops! You've stumbled into Gojo's Infinity Void, just like Jogo encountering the limitless darkness. Let the Six Eyes oversee the Cursed Technique of Broken Links. Find your way back to the world of anime and more on AnimePalooza."
            />
        </Helmet>
        <div className="lozad h-screen  bg-cover bg-center bg-gradient-to-r from-black/80 via-transparent to-black/80 flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url('/assets/images/404.gif')`,
            }}
        >
            <div className="text-pro-red drop-shadow-xl text-2xl sm:text-4xl text-center font-pro-bold font-extrabold mix-blend-difference">
                Lost in Gojo's Infinity Void, just like Jogo encountering the limitless darkness, where the Six Eyes oversee the Cursed Technique of Broken Links.
            </div>
            <button className="bg-pro-red text-white font-semibold py-2 px-4 rounded-md my-6 font-pro-medium">
                <Link to='/'>Break the curse</Link>
            </button>
        </div>
    </>

    );
};

export default ErrorPage;
