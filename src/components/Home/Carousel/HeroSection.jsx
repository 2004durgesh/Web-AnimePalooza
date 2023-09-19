// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AnimeSlides from './Slides/AnimeSlides';
import MangaSlides from './Slides/MangaSlides';
import MoviesSlides from './Slides/MoviesSlides';

const HeroSection = () => {
    return (
        <>
            <div className="h-screen">
                <Swiper
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: true,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide><AnimeSlides /></SwiperSlide>
                    <SwiperSlide><MangaSlides /></SwiperSlide>
                    <SwiperSlide><MoviesSlides /></SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}

export default HeroSection