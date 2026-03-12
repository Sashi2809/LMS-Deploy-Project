import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const images = [
    'https://icsblog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2021/08/26133229/ICS-Blog-Getty-5.jpg',
    'https://blogassets.leverageedu.com/blog/wp-content/uploads/2020/03/24185535/Online-Learning.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWF2dpfzW4kjiziGz-Tag5M6BKdnopbmdPJQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzf4dKcnKHm-M72VvRDEADX6L0JduryUhxhQ&s'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Parallax Image Slider Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ 
            width: `${images.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / images.length)}%)`
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                flex: `0 0 ${100 / images.length}%`,
                transform: `translateY(${scrollY * 0.3}px)`, // Parallax effect
                transition: 'transform 0.2s ease-out'
              }}
            />
          ))}
        </div>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="rubik-mono-one-regular text-white text-4xl md:text-6xl font-bold mb-4">
          
        <motion.h1 
      className="rubik-mono-one-regular text-white text-4xl md:text-6xl font-bold mb-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10,
      }}
    >
      Find the Best <br /> Courses for You.
    </motion.h1>

          {/* Find the Best <br /> Courses for You. */}
        </h1>
        <p className="text-gray-200 mb-6 md:mb-8 text-sm md:text-base">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-4 md:px-6 py-2 md:py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base"
          />
          <Button
            type="submit"
            className="bg-black text-white px-4 md:px-6 py-2 md:py-3 rounded-r-full hover:bg-gray-800 text-sm md:text-base"
          >
            Search
          </Button>
        </form>
        
        {/* Explore Courses Button */}
        <button
          onClick={() => navigate(`/course/search?query`)}
          className="relative inline-block px-8 py-4 text-white text-lg font-bold bg-gradient-to-b from-violet-500 to-blue-500 rounded-md shadow-[inset_0_1px_0_#D1B3FF,0_10px_0_#4B0082] active:top-2 active:bg-gradient-to-b active:from-violet-600 active:to-blue-600 active:shadow-[inset_0_1px_0_#D1B3FF,inset_0_-3px_0_#4B0082] transition-all duration-150"
        >
          Explore Courses
          <span className="absolute bottom-[-15px] left-[-4px] w-full h-full bg-[#2B1800] rounded-md -z-10"></span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
