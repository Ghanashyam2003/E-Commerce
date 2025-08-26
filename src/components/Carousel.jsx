import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Category from "./Category.jsx";


const Carousel = () => {
  const { data, fetchAllProducts } = getData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Custom Prev Arrow
  const SamplePrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
    >
      <AiOutlineArrowLeft
        size={45}
        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white 
                   hover:bg-red-500 hover:scale-110 hover:shadow-lg transition-all duration-300"
      />
    </div>
  );

  // Custom Next Arrow
  const SampleNextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
    >
      <AiOutlineArrowRight
        size={45}
        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white 
                   hover:bg-red-500 hover:scale-110 hover:shadow-lg transition-all duration-300"
      />
    </div>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    fade: true, // smooth fade transition
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          bottom: "20px",
        }}
      >
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-red-500 transition-all" />
    ),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row gap-10 justify-center h-[600px] items-center px-6 md:px-20">
              {/* Text Section */}
              <div className="md:space-y-6 space-y-3 max-w-lg text-center md:text-left">
                <h3 className="text-red-400 font-semibold tracking-wide text-sm uppercase">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="md:text-5xl text-2xl font-extrabold uppercase line-clamp-3 text-white drop-shadow-lg">
                  {item.title}
                </h1>
                <p className="line-clamp-3 text-gray-300">{item.description}</p>
                <button className="bg-gradient-to-r from-red-500 to-purple-600 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-red-500/50 transition-all">
                  Shop Now
                </button>
              </div>

              {/* Image Section */}
              <div>
                <img
                  src={
                    item.thumbnail ||
                    item.images?.[0] ||
                    "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={item.title}
                  className="w-[300px] md:w-[400px] object-contain hover:scale-105 transition-all"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Category />
    </div>
  );
};

export default Carousel;
