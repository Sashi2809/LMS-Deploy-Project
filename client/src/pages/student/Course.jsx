import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <motion.div 
        whileHover={{ y: -4 }} 
        whileTap={{ scale: 0.98 }}
        className="group relative h-full"
      >
        <Card className="h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
          <div className="relative overflow-hidden">
            <motion.img
              src={course.courseThumbnail}
              alt="course"
              className="h-36 w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            {course.isPopular && (
              <Badge className="absolute left-2 top-2 bg-green-500/90 hover:bg-green-500 text-white backdrop-blur-xs">
                Popular
              </Badge>
            )}
          </div>

          <CardContent className="space-y-3 p-4">
          <h1 className="font-semibold text-gray-800 transition-all duration-300  dark:text-gray-100 inline-block relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-purple-600 after:transition-all after:duration-300 ">
  {course.courseTitle}
</h1>


            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                  <AvatarImage 
                    src={course.creator?.photoUrl} 
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <AvatarFallback className="bg-gray-100 dark:bg-gray-800">
                    {course.creator?.name?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {course.creator?.name}
                </span>
              </div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Badge 
                  variant="outline" 
                  className="border-purple-200 bg-purple-100/50 text-purple-600 transition-all duration-300 hover:bg-purple-200/70 hover:text-purple-700 hover:shadow-sm dark:border-purple-800/50 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-800/30 dark:hover:text-purple-300"
                >
                  {course.courseLevel}
                </Badge>
              </motion.div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ₹{course.coursePrice}
                </span>
                {course.discountPrice && (
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    ₹{course.discountPrice}
                  </span>
                )}
              </div>
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-transform hover:scale-105 dark:bg-purple-700 dark:hover:bg-purple-800"
              >
                See Details
              </Button>
            </div>
          </CardContent>

          {/* Progress indicator */}
          {course.progress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
              <div 
                className="h-full bg-purple-500 transition-all duration-500" 
                style={{ width: `${course.progress}%` }}
              />
            </div>
          )}
        </Card>
      </motion.div>
    </Link>
  );
};

export default Course;