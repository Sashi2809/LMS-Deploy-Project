import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import Footer from "@/components/Footer";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl text-center mb-8">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            You are not enrolled in any course.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <div key={index} className="h-full">
                <Course course={course}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Updated Skeleton component with matching dimensions
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="h-64 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
      >
        <div className="h-36 bg-gray-300 dark:bg-gray-700 rounded-t-xl" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-20" />
            </div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
          </div>
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16" />
        </div>
      </div>
    ))}
  </div>
);

export default MyLearning;