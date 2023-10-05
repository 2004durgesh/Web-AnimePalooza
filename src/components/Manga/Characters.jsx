/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import lozad from 'lozad'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Characters = ({ data }) => {
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
  return (
    <><section className="">
      <div className="py-4 px-6 text-pro-red text-2xl sm:text-3xl md:text-4xl  font-pro-bold font-semibold">
        Meet the Cast
      </div>
      <Swiper
        centeredSlides={true}
        cssMode={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          1200: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 3,
          },
        }}
      >
        {data.map((element) => {
          return (
            <SwiperSlide key={element.id} className='mx-4'>
              <div className="bg-black mx-4">
                <div className="relative h-[226.6px] w-[170px] sm:h-[266.6px] sm:w-[200px] md:h-[400px] md:w-[300px] rounded-md my-4">
                  <img
                    src={element.image}
                    alt={element.title}
                    className="lozad z-0 h-full w-full rounded-md object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-left">
                    <h1 className="text-lg font-semibold text-white">{element.name.userPreferred} <br />
                      {element.name.native}</h1>
                    <h1 className="mb-2 mx-2 inline-block rounded-full border-[2px] border-gray-400 px-3 py-1 text-[10px] font-semibold tracking-wider text-white">{element.role}</h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

      </Swiper>
    </section></>
  )
}

export default Characters