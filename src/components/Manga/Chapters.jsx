/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const Chapters = ({ data, provider }) => {
  let noChaptersFound = true;
  return (
    <>
      <section className="flex flex-col justify-center mx-auto my-4 max-w-5xl">
        <div className="py-4 px-6 text-pro-red text-2xl sm:text-3xl md:text-4xl  font-pro-bold font-semibold">
          Chapters
        </div>
        {data.map((element) => {
          if (element.pages > 0) {
            noChaptersFound = false; // Chapters were found, so set the variable to false
            return (
              <Link key={element.id} to={`/manga/${provider}/read/${element.id}/${element.title}/${element.chapterNumber}`}>
                <div className="flex flex-col hover:bg-gray-800 border-b-2 border-gray-800 rounded-lg p-4 my-2 transition duration-300 ease-in-out hover:scale-105 font-pro-regular">
                  <span className="text-white text-xl font-medium">
                    {element.title}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Chapter: {element.chapterNumber} | Volume: {element.volumeNumber}
                  </span>
                </div>
              </Link>
            );
          }
          return null; // Return null for elements with no chapters
        })}

        {noChaptersFound && (
          <h1 className="text-white text-xl font-medium">
            No Chapters Found
          </h1>
        )}
      </section>
    </>
  )
}

export default Chapters