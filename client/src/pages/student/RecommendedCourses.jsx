// components/RecommendedCourses.jsx
import React from 'react';
import { useGetRecommendedCoursesQuery } from '@/features/api/recommendationApi';
import Course from './Course';
import { Skeleton } from '@/components/ui/skeleton';

const RecommendedCourses = () => {
  const { data, isLoading, isError } = useGetRecommendedCoursesQuery();

  if (isError) return null;

  return (
    <div className="mt-12">
      <h2 className="font-bold text-3xl text-center mb-8 text-white">
        Recommended For You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CourseSkeleton key={index} />
          ))
        ) : (
          data?.map((course, index) => (
            <Course key={index} course={course} />
          ))
        )}
      </div>
    </div>
  );
};

const CourseSkeleton = () => (
  <div className="bg-gray-900 shadow-md rounded-lg overflow-hidden">
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

export default RecommendedCourses;