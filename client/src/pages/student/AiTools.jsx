import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AiTools = () => {
    const cards = [
      { id: 1, image: "https://www.tabnine.com/wp-content/uploads/2023/10/AI-Code-Review.png.webp", text: "CODE REVIEWER" },
      { id: 2, image: "https://learnsql.com/blog/practice-for-sql-job-interview/practice-for-sql-job-interview.png", text: "INTERVIEW PRACTICE" },
      { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBy0dM7sgsqD-AChhryudogf2o6mbLEMoCuA&s", text: "AI ROADMAP GENERATOR" },
      { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKGp5QW0aefPOUrR0O3o-8W2DfrkH6awSKcA&s", text: "CODE EDITOR" },
    ];

    const colors = [
        'linear-gradient(to right, #7c3aed, #3b82f6)',      // Violet to Blue
        'linear-gradient(to right, #ef4444, #ec4899)',      // Blue to Navy Blue
        'linear-gradient(to right, #f59e0b, #f97316)',      // Yellow to Orange
        'linear-gradient(to right, #10b981, #0d9488)'       // Green to Teal/Blue-Green
    ];

    const codeReview = ["ai-code-reviewer","ai-interview","roadmap","code"];
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        if (autoRotate) {
            const interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % cards.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [autoRotate, cards.length]);

    return (
        <div 
            className="pt-10 pb-14 px-4 md:px-8 transition-all duration-500"
            style={{ backgroundImage: colors[activeIndex] }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-bold text-white text-3xl md:text-4xl text-center mb-8 md:mb-12"
                >
                    Features Built for You
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Section - Text Content */}
                    <div className="text-white space-y-6 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ staggerChildren: 0.2 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Supercharge Your Coding Journey with AI
                            </h2>
                            
                            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
                                Discover powerful AI tools designed to accelerate your learning, improve code quality, 
                                and help you master technical interviews.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="pt-4"
                            >
                                <Link to="/ai-features">
                                    <Button 
                                        className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-6 text-lg md:text-xl rounded-lg transition-all"
                                        size="lg"
                                    >
                                        Explore All Features →
                                    </Button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Right Section - Carousel */}
                    <div className="relative overflow-hidden rounded-xl"
                         onMouseEnter={() => setAutoRotate(false)}
                         onMouseLeave={() => setAutoRotate(true)}>
                        <div className="flex transition-transform duration-500 ease-out"
                             style={{ transform: `translateX(-${activeIndex * 50}%)` }}>
                            {cards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    className="w-1/2 flex-shrink-0 px-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ 
                                        opacity: 1,
                                        scale: [0, 0].includes(index - activeIndex) ? 0.95 : 1
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="overflow-hidden rounded-lg shadow-xl bg-white/10 backdrop-blur-sm h-full">
                                        <img
                                            src={card.image}
                                            alt={card.text}
                                            className="w-full h-48 md:h-56 object-cover"
                                        />
                                        <CardContent className="p-4 flex flex-col items-center">
                                            <h3 className="text-lg font-semibold text-white mb-4">{card.text}</h3>
                                            <Link to={`ai-features/${codeReview[index]}`}>
                                                <Button className="bg-white text-purple-900 hover:bg-gray-100 px-6 py-3">
                                                    Try Now
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
                            onClick={() => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)}
                        >
                            ←
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition-colors"
                            onClick={() => setActiveIndex((prev) => (prev + 1) % cards.length)}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiTools;