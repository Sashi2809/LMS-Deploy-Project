import BuyCourseButton from "@/components/BuyCourseButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreateCommentMutation, useGetCommentsQuery } from "@/features/api/courseApi";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";


import { FaLockOpen } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";



const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1><Loading/></h1>;
  if (isError) return <h>Failed to load course details</h>;

  const { course, purchased } = data;
  console.log(purchased);

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-r from-violet-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course?.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course?.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5 ">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
  className="text-sm leading-loose rounded-3xl p-4 md:p-4 
             shadow-xl border border-gray-400 "
  dangerouslySetInnerHTML={{ __html: course.description }}
/>

          <Card className='bg-gradient-to-r from-violet-900 to-purple-900 text-white'>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className='text-gray-300'>{course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="space-y-5">
  <h1 className="font-bold text-xl md:text-2xl">Discussion</h1>
  
  <Card>
    <CardContent className="p-4">
      <CommentSection courseId={courseId} />
    </CardContent>
  </Card>
</div>
        </div>
        <div className="w-full lg:w-1/3 lg:sticky lg:top-20 h-fit">
        
  <Card>
    <CardContent className="p-4 flex flex-col ">
      <div className="w-full aspect-video mb-4 ">
        <ReactPlayer
          width="100%"
          height={"100%"}
          url={course.lectures[0].videoUrl}
          controls={true}
        />
      </div>
      <h1>{course.lectures[0].lectureTitle}</h1>
      <Separator className="my-2" />
      {purchased ? (
        <p>Click below to continue course</p>
      ) : (
        <h1 className="text-lg md:text-xl font-semibold">₹{course.coursePrice}</h1>
      )}
    </CardContent>
    <CardFooter className="flex justify-center p-4">
      {purchased ? (
        // <Button onClick={handleContinueCourse} className="w-full bg-gradient-to-r from-violet-900 to-purple-900 text-white">Continue Course</Button>
        <div className="w-full" onClick={handleContinueCourse}>
          <ContinueCourseButton/>
        </div>
      ) : (
        <BuyCourseButton courseId={courseId} />
      )}
    </CardFooter>
  </Card>
</div>

      </div>
      </div>
  );
};

export default CourseDetail;

const CommentSection = ({ courseId }) => {
  const { 
    data: comments, 
    isLoading, 
    isError,
    refetch
  } = useGetCommentsQuery(courseId);
  
  const [createComment] = useCreateCommentMutation();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async ({ content }) => {
    try {
      setIsSubmitting(true);
      await createComment({ courseId, content }).unwrap();
      reset();
      refetch(); // Force immediate refresh
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <textarea
          {...register("content", { required: true })}
          placeholder="Add a comment..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          disabled={isSubmitting}
        />
        <Button type="submit" disabled={isSubmitting} className='bg-gradient-to-r from-violet-900 to-purple-900 text-white'>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <Loading />
        ) : comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-3 items-start">
              <Avatar>
                <AvatarImage src={comment.user?.photoUrl} />
                <AvatarFallback>
                  {comment.user?.name[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{comment.user?.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};




const ContinueCourseButton = ({ handleContinueCourse }) => {
  const TARGET_TEXT = "Continue Course";
  const CYCLES_PER_LETTER = 2;
  const SHUFFLE_TIME = 50;
  const CHARS = "!@#$%^&*():{};|,.<>/?";
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(TARGET_TEXT);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={handleContinueCourse}
      className="w-full relative overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 px-6 py-3 font-mono font-medium uppercase text-white transition-all hover:text-white"
    >
      <div className="relative z-10 flex items-center gap-2 justify-center">
      <FaLockOpen />
      {/* Unlock Icon */}
        <span>{text}</span>
      </div>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 scale-125 bg-gradient-to-t from-indigo-400/0 from-40% via-white to-white to-0% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.button>
  );
};
