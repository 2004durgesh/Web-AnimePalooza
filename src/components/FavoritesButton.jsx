/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {setFavoriteShowsLocalStorage} from './redux/actions/FavoritesActions'
const FavoritesButton = ({ type, id, title, image,provider }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const dispatch = useDispatch();
    const favoritesInfo = {
        id: id,
        title: title,
        image: image,
        type: type,
        provider:provider,
    };

    const favoriteShows = JSON.parse(localStorage.getItem('favoriteShows')) || [];
    useEffect(() => {
        setIsFavorite(favoriteShows.some(favorite => favorite.id === id));
    }, [id, favoriteShows]);

    const addToFavoritesHandler = () => {
        if (isFavorite) {
            const newFavorites = favoriteShows.filter(favorite => favorite.id !== id);
            localStorage.setItem('favoriteShows', JSON.stringify(newFavorites));
            dispatch(setFavoriteShowsLocalStorage(newFavorites));
            
        } else {
            favoriteShows.push(favoritesInfo);
            localStorage.setItem('favoriteShows', JSON.stringify(favoriteShows));
            dispatch(setFavoriteShowsLocalStorage(favoriteShows));
        }
    };

    const favoriteIcon = isFavorite ? <FcLike size={20} /> : <AiOutlineHeart size={20} color="white" />;
    const favoriteText = isFavorite ? "Added to Favorites" : "Add to Favorites";
    const favoriteShowsArray = useSelector((state) => state.favoriteShows.favoriteShows);
    console.log(favoriteShowsArray)
    return (
        <div>
            <button className="flex flex-col items-center" onClick={addToFavoritesHandler}>
                {favoriteIcon}
                <span className="text-gray-200 md:text-gray-400 my-2 font-pro-medium">{favoriteText}</span>
            </button>
        </div>
    );
};

export default FavoritesButton;
