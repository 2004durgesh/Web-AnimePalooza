// Import the react-icons and js-file-download packages
import { FaAndroid } from 'react-icons/fa';
import fileDownload from 'js-file-download';

// Define a functional component that takes a prop called btnText
// eslint-disable-next-line react/prop-types
const DownloadButton = ({ btnText }) => {
  // Define a function that downloads the apk file from a URL using fetch and fileDownload
  const downloadFile = () => {
    // Fetch the file data from the URL as a blob
    fetch('/animepalooza.apk')
      .then(res => res.blob())
      .then(blob => {
        // Save the blob as an apk file using fileDownload
        fileDownload(blob, 'animepalooza.apk');
      })
  }

  // Return the JSX element that renders the download button with an icon and a text
  return (
    <>
      <button 
        className=" bg-green-500 text-white font-pro-regular py-2 px-4 ml-4 my-2
        rounded-lg hover:bg-green-600 flex items-center space-x-2" 
        onClick={downloadFile}
      >
        <FaAndroid /> <span>{btnText}</span>
      </button>
    </>
  )
}

// Export the component as default
export default DownloadButton
