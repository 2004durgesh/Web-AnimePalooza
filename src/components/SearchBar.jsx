/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { useLocation} from 'react-router-dom';

const SearchBar = ({ placeholder }) => {
  const [search, setSearch] = useState('');
  const location=useLocation()
  const currentPathName=location.pathname

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the search query as a URL parameter
    // eslint-disable-next-line no-undef
    navigation.navigate(`${currentPathName}/search/${search}`);
  };
  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="bg-black px-4 py-2 rounded-full flex items-center mx-2 md:mx-10 mt-20 border-[2px] border-gray-400 font-pro-bold">
          <input
            className="bg-transparent text-white outline-none placeholder-gray-400 flex-grow"
            type="search"
            placeholder={placeholder}
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
          // placeholder="Search for movies, TV shows, and more"
          />
          <button type="submit" className="bg-transparent cursor-pointer border-none">
            <AiOutlineSearch color="#DB202C" size={20} />
          </button>
        </div>
      </form>
    </>
  )
}

export default SearchBar