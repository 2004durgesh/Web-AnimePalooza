/* eslint-disable react/prop-types */
import { FaAndroid } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const DownloadButton = ({ btnText }) => {
  

  return (
    <>
      <Link to="https://github.com/2004durgesh/AnimePalooza-Immerse-in-the-Anime-Wonderland-/releases/latest" className=" bg-green-500 text-white font-pro-regular py-2 px-4 ml-4 my-2 rounded-lg hover:bg-green-600 flex items-center space-x-2 cursor-pointer"
      >
        <FaAndroid /> <span>{btnText}</span>
      </Link>
    </>
  )
}

// Export the component as default
export default DownloadButton
