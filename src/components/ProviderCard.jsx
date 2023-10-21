/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MangaProviderCard = ({ providerName, logoSrc, description, linkTo }) => {
  return (
    <Link to={linkTo}>
      <div className="flex items-center space-x-4">
        <img src={logoSrc} alt={`${providerName} Providers logo`} className="w-20 sm:w-32 md:w-40"/>
        <div className="flex flex-col">
          <p className="font-pro-medium font-semibold">{providerName}</p>
          <span className="text-lg sm:text-2xl md:text-3xl font-pro-regular">{description}</span>
        </div>
      </div>
    </Link>
  );
};

export default MangaProviderCard;
