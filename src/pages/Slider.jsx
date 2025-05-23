import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import slider1 from "../assets/pexels-photo-7862657.webp";
import slider2 from "../assets/slider-twos.webp";
import slider3 from "../assets/slider2thre.webp";

const Slider = () => {
  const slides = [
    {
      img: slider1,
      title: "Explore Your Creativity",
      description: "Turn your passion into your next big thing.",
    },
    {
      img: slider2,
      title: "Start a New Hobby Today",
      description: "Discover the joy of learning something new.",
    },
    {
      img: slider3,
      title: "Make Time for What You Love",
      description: "Hobbies make life more beautiful and fulfilling.",
    },
  ];

  return (
    <div className="w-11/12 mx-auto mt-6 md:mt-12">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-white text-sm md:text-lg mb-4">
                  {slide.description}
                </p>
                <button className="bg-white text-black font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition">
                  Create Hobbies
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
