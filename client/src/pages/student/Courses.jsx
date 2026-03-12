import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useRef, useState } from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery, useGetRecommendedCoursesQuery } from "@/features/api/courseApi";
import Footer from "@/components/Footer";
import CurrentLearning from "./CurrentLearning";
import AiTools from "./AiTools";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import UserCardCarousel from "./UserCardCorousel";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import TerminalContactForm from "@/components/TerminalContactForm";

const Courses = () => {
  const { data: publishedData, isLoading: isLoadingPublished, isError: isErrorPublished } = useGetPublishedCourseQuery();
  const { data: recommendedData, isLoading: isLoadingRecommended, isError: isErrorRecommended } = useGetRecommendedCoursesQuery();

    const navigate = useNavigate();
  
  // if (isErrorPublished || isErrorRecommended) {
  //   return <h1 className="text-white bg-red-900 p-4 rounded-lg text-center">Some error occurred while fetching courses.</h1>;
  // }

  const carouselRef = useRef(null);
const [currentIndex, setCurrentIndex] = useState(0);

// Auto-rotate effect
useEffect(() => {
  const interval = setInterval(() => {
    if (recommendedData?.courses?.length > 0) {
      const nextIndex = (currentIndex + 1) % recommendedData.courses.length;
      scrollToIndex(nextIndex);
    }
  }, 1000000);

  return () => clearInterval(interval);
}, [currentIndex, recommendedData]);

const scrollToIndex = (index) => {
  if (carouselRef.current && carouselRef.current.children.length > 0) {
    const card = carouselRef.current.children[index];
    const container = carouselRef.current;
    const cardWidth = card.offsetWidth;
    const gap = 24; // Matches gap-6 (1.5rem = 24px)
    
    container.scrollTo({
      left: (cardWidth + gap) * index,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
  }
};

const handleNext = () => {
  const nextIndex = (currentIndex + 1) % recommendedData.courses.length;
  scrollToIndex(nextIndex);
};

const handlePrev = () => {
  const prevIndex = (currentIndex - 1 + recommendedData.courses.length) % recommendedData.courses.length;
  scrollToIndex(prevIndex);
};

  return (
    <div className="min-h-screen">
      {/* Current Learning Section with White Background */}
      <div className="bg-white py-8 dark:bg-gray-800">
        <div className="max-w-10xl mx-auto px-6">
          <CurrentLearning />
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div className="bg-gradient-to-r from-violet-900 to-purple-900 py-12">
  <div className="max-w-10xl mx-auto px-8">
    <div className="flex flex-col md:flex-row gap-8 items-center">
      {/* Left Text Section */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-[90%] font-extrabold text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg"
        >
          Recommended Courses
          For You
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-200 text-lg"
        >
          Discover courses tailored to your learning journey. Our recommendations 
          are carefully curated based on your interests and progress.
        </motion.p>
      </div>

      {/* Right Carousel Section */}
      <div className="md:w-1/2 w-full relative group">
        <div className="relative overflow-hidden">
          {/* Navigation Buttons */}
          <div className="hidden md:flex">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <FiChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <FiChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Courses Container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-6 pb-4"
          >
            {isLoadingRecommended ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={`rec-skel-${index}`} className="min-w-[75%] md:min-w-[45%] flex-shrink-0">
                  <CourseSkeleton />
                </div>
              ))
            ) : recommendedData?.courses?.length > 0 ? (
              recommendedData.courses.map((course, index) => (
                <motion.div
                  key={`rec-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center transform transition-transform hover:scale-105"
                >
                  <Course course={course} />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center p-8">
                <p className="text-white bg-gray-800/50 p-4 rounded-lg">
                  No new courses to recommend at this time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Dots */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {recommendedData?.courses?.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

      {/* All Courses Section with White Background */}
      <div className="bg-white py-12 dark:bg-gray-800">
        <div className="max-w-10xl mx-auto px-6">
          <h2 className="font-bold text-4xl text-center mb-10 text-black bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent drop-shadow-lg">
            Our Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingPublished ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            ) : (
              publishedData?.courses &&
              [...publishedData.courses]
                .sort(() => Math.random() - 0.5)
                .slice(0, 8)
                .map((course, index) => <Course key={index} course={course} />)
            )}
          </div>
        </div>
         <Button onClick={() => navigate(`/course/search?query`)} className="flex items-center justify-center mx-auto mt-7 p-6 border border-black text-white bg-black hover:bg-white hover:text-black transition-colors">
  Explore Courses  →
</Button>
      </div>
      <AiTools/>
      <UserCardCarousel/>
      <Footer />
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-gray-900 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36 bg-gray-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
            <Skeleton className="h-4 w-20 bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-700" />
      </div>
    </div>
  );
};