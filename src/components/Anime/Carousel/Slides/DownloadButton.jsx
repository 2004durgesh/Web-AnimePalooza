/* eslint-disable react/prop-types */
import { FaAndroid } from 'react-icons/fa';
import fileDownload from 'js-file-download';

const DownloadButton = ({ btnText }) => {
  const downloadFile = () => {
    // Fetch the file data from the URL as a blob
    fetch('/animepalooza.apk')
      .then(res => res.blob())
      .then(blob => {
        // Save the blob as an apk file using fileDownload
        fileDownload(blob, 'animepalooza.apk');
      })
  }

  return (
    <>
      <a className=" bg-green-500 text-white font-pro-regular py-2 px-4 ml-4 my-2 rounded-lg hover:bg-green-600 flex items-center space-x-2"
        onClick={downloadFile}
        download
      >
        <FaAndroid /> <span>{btnText}</span>
      </a>
    </>
  )
}

// Export the component as default
export default DownloadButton
