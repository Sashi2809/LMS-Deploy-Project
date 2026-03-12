import React, { useRef, useState, useEffect } from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const CurrentLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const mylearncur = data?.user.enrolledCourses || [];
  const scrollContainer = useRef(null);
  const [isScrollable, setIsScrollable] = useState({ left: false, right: false });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Scroll check and event listeners
  const checkScroll = () => {
    const { current } = scrollContainer;
    if (current) {
      const hasSpaceLeft = current.scrollLeft > 0;
      const hasSpaceRight = current.scrollLeft + current.clientWidth < current.scrollWidth - 1;
      setIsScrollable({ left: hasSpaceLeft, right: hasSpaceRight });
    }
  };

  useEffect(() => {
    const current = scrollContainer.current;
    const handleResize = () => checkScroll();
    
    if (current) {
      current.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", handleResize);
      checkScroll();
    }
    return () => {
      if (current) current.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mylearncur]);

  // Scroll handlers
  const handleScroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const cardWidth = container.firstChild?.offsetWidth || 0;
      const scrollAmount = cardWidth * 2;
      container.scrollTo({
        left: direction === "right" 
          ? container.scrollLeft + scrollAmount 
          : container.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Drag handlers
  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.current.offsetLeft);
    setScrollLeft(scrollContainer.current.scrollLeft);
    document.body.style.cursor = "grabbing";
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  return (
    <div className="max-w-8xl mx-auto my-10 px-4 md:px-12 relative">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-bold text-3xl md:text-4xl text-center mb-8 gradient-text"
      >
        My Learning Journey
      </motion.h1>

      <div className="relative group">
        {/* Desktop Navigation Buttons */}
        <div className="hidden sm:flex">
          <button
            onClick={() => handleScroll("left")}
            disabled={!isScrollable.left}
            className={`absolute -left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
              isScrollable.left 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl active:scale-95"
                : "bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            <FiChevronLeft className="w-6 h-6 text-white mx-auto" />
          </button>

          <button
            onClick={() => handleScroll("right")}
            disabled={!isScrollable.right}
            className={`absolute -right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ${
              isScrollable.right 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl active:scale-95"
                : "bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            <FiChevronRight className="w-6 h-6 text-white mx-auto" />
          </button>
        </div>

        {/* Course Container */}
        <div
          ref={scrollContainer}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`flex overflow-x-auto gap-6 pb-6 scrollbar-hide px-2 mx-4 sm:mx-0 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {isLoading ? (
            <MyLearningSkeleton />
          ) : mylearncur.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center w-full py-12 text-gray-500 dark:text-gray-400"
            >
              Start your learning journey by enrolling in courses!
            </motion.div>
          ) : (
            mylearncur.map((course, index) => (
              <motion.div
                key={course._id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[85%] sm:min-w-[45%] md:min-w-[0%] lg:min-w-[25%] transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <Course course={course} />
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="sm:hidden flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleScroll("left")}
            disabled={!isScrollable.left}
            className={`p-3 rounded-full transition-all duration-300 ${
              isScrollable.left 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl active:scale-95"
                : "bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            <FiChevronLeft className="w-6 h-6 text-white mx-auto" />
          </button>

          <button
            onClick={() => handleScroll("right")}
            disabled={!isScrollable.right}
            className={`p-3 rounded-full transition-all duration-300 ${
              isScrollable.right 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg hover:shadow-xl active:scale-95"
                : "bg-gray-200 dark:bg-gray-700 opacity-50 cursor-not-allowed"
            }`}
            style={{ width: "48px", height: "48px" }}
          >
            <FiChevronRight className="w-6 h-6 text-white mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Skeleton Loader
const MyLearningSkeleton = () => (
  <div className="flex gap-6 pb-6 px-2 w-full">
    {[...Array(4)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-w-[85%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[23%] h-64 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative flex-shrink-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent -skew-x-12 animate-shimmer" />
        <div className="h-40 bg-gray-300 dark:bg-gray-700 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
);

export default CurrentLearning;