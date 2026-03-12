import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { FiMousePointer } from "react-icons/fi";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ card, idx, codeReview }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-full w-full perspective-1000"
    >
      <Card className="overflow-hidden rounded-xl shadow-2xl border border-gray-700 transform-gpu bg-gradient-to-br from-gray-900 to-gray-800 relative  w-auto">
        <div className="absolute inset-0 bg-blue-500 opacity-10 blur-xl rounded-xl" />
        
        <motion.img
          src={card.image}
          alt={card.text}
          style={{ transform: "translateZ(40px)" }}
          className="w-full h-32 object-cover rounded-t-lg shadow-lg"
        />

        <CardContent className="p-6 flex flex-col items-center relative z-10" style={{ transformStyle: "preserve-3d" }}>
          <motion.h2 
            style={{ transform: "translateZ(50px)" }}
            className="text-lg font-extrabold text-white mb-4 drop-shadow-lg uppercase tracking-wide"
          >
            {card.text}
          </motion.h2>

          <motion.div 
            style={{ transform: "translateZ(60px)" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiMousePointer className="text-4xl text-white/50" />
          </motion.div>

          <motion.div style={{ transform: "translateZ(75px)" }}>
            <Link to={codeReview[idx]}>
              <button
                className="mt-3 px-7 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl shadow-xl border border-white/20 backdrop-blur-lg hover:scale-105 transition-transform"
              >
                Try Here
              </button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AiBoard = () => {
  const headingRef = useRef(null);
  const containerRef = useRef(null);
  const buttonsRef = useRef([]);

  useGSAP(
    () => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 }
      );

      // Button hover effects
      buttonsRef.current.forEach((button, idx) => {
        if (!button) return;

        const onButtonEnter = () => {
          gsap.to(button, {
            scale: 1.15,
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
            duration: 0.3,
          });
        };

        const onButtonLeave = () => {
          gsap.to(button, {
            scale: 1,
            boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
            duration: 0.3,
          });
        };

        button.addEventListener("mouseenter", onButtonEnter);
        button.addEventListener("mouseleave", onButtonLeave);

        return () => {
          button.removeEventListener("mouseenter", onButtonEnter);
          button.removeEventListener("mouseleave", onButtonLeave);
        };
      });
    },
    { scope: containerRef }
  );

  const cards = [
    { id: 1, image: "https://www.tabnine.com/wp-content/uploads/2023/10/AI-Code-Review.png.webp", text: "CODE REVIEWER" },
    { id: 2, image: "https://learnsql.com/blog/practice-for-sql-job-interview/practice-for-sql-job-interview.png", text: "INTERVIEW PRACTICE" },
    { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBy0dM7sgsqD-AChhryudogf2o6mbLEMoCuA&s", text: "AI ROADMAP GENERATOR" },
    { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGp5QW0aefPOUrR0O3o-8W2DfrkH6awSKcA&s", text: "CODE EDITOR" },
  ];

  const codeReview = ["ai-code-reviewer", "ai-interview", "roadmap", "code"];

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center p-12 bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 ref={headingRef} className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg">
        Learning Tools 🚀
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {cards.map((card, idx) => (
          <TiltCard 
            key={card.id}
            card={card}
            idx={idx}
            codeReview={codeReview}
          />
        ))}
      </div>

      <Link to="/">
        <button
          ref={(el) => (buttonsRef.current[cards.length] = el)}
          className="mt-16 px-10 py-3 bg-gray-700 text-white font-extrabold text-xl rounded-xl shadow-2xl border border-gray-500 backdrop-blur-lg hover:bg-gray-600 transition-colors"
        >
          HOME
        </button>
      </Link>
    </div>
  );
};

export default AiBoard;