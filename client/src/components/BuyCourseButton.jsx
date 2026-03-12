import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiUnlock } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";

const TARGET_TEXT = "Purchase Course";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

const BuyCourseButton = ({ courseId }) => {
  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] =
    useCreateCheckoutSessionMutation();
  const intervalRef = useRef(null);
  const [text, setText] = useState(TARGET_TEXT);

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        toast.error("Invalid response from server.");
      }
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout");
    }
  }, [data, isSuccess, isError, error]);

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
      onClick={purchaseCourseHandler}
      disabled={isLoading}
      className="w-full relative overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 px-6 py-3 font-mono font-medium uppercase text-white transition-all hover:text-white"
    >
      <div className="relative z-10 flex items-center gap-2 justify-center">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          <>
            <FiUnlock />
            <span>{text}</span>
          </>
        )}
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

export default BuyCourseButton;
