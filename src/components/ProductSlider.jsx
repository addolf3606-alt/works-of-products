"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Tag, 
  Layers, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function ProductSlider({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = Next, -1 = Back
  const [isExpanded, setIsExpanded] = useState(false); // Read More / Less State

  const currentProduct = items?.[currentIndex];

  // Slide change hone par description ko wapas wrap (close) kar do
  useEffect(() => {
    setIsExpanded(false);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleBack = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900/50 border border-slate-800 rounded-3xl text-slate-400">
        <Info className="w-8 h-8 mb-2 text-purple-400" />
        <p className="text-sm font-medium">No products found in this category.</p>
      </div>
    );
  }

  // Safe Image Path Normalization
  const getImagePath = (path) => {
    if (!path) return "/placeholder.jpg";
    if (path.startsWith("/") || path.startsWith("http")) return path;
    return `/${path}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-8 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl text-white shadow-2xl relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Top Header Bar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800/80">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-xs sm:text-sm font-semibold transition active:scale-95 border border-slate-700/50"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Counter Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>{currentIndex + 1}</span>
          <span className="text-slate-600">/</span>
          <span>{items.length}</span>
        </div>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-semibold transition active:scale-95 shadow-lg shadow-purple-950/50"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Main Slider Content (Image Top, Details Bottom) */}
      <div className="relative overflow-hidden min-h-[420px] flex flex-col justify-between">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentProduct.id || currentIndex}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="flex flex-col items-center text-center gap-6"
          >
            {/* TOP: Image Card */}
            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-inner flex items-center justify-center group">
              <Image
                src={getImagePath(currentProduct.image)}
                alt={currentProduct.name || "Product Image"}
                fill
                priority={currentIndex === 0}
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* BOTTOM: Information & Details */}
            <div className="w-full flex flex-col items-center">
              
              {/* Category Badge */}
              {currentProduct.category && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[11px] font-bold tracking-wider uppercase mb-2">
                  <Tag className="w-3 h-3" />
                  <span>{currentProduct.category}</span>
                </div>
              )}

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {currentProduct.name}
              </h2>

              {/* Description Box with Read More Toggle */}
              <div className="mt-4 w-full p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/60 text-left transition-all">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>How it Works & Usage</span>
                </div>

                <p 
                  className={`text-slate-300 text-xs sm:text-sm leading-relaxed ${
                    !isExpanded ? "line-clamp-2" : ""
                  }`}
                >
                  {currentProduct.description}
                </p>

                {/* Read More / Read Less Toggle Button */}
                {currentProduct.description && currentProduct.description.length > 90 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
                  >
                    <span>{isExpanded ? "Show Less" : "Read More"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Interactive Thumbnails Bar */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 overflow-x-auto pb-1">
        {items.map((item, idx) => (
          <button
            key={item.id || idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`relative w-12 h-12 rounded-xl overflow-hidden border transition-all duration-200 shrink-0 ${
              idx === currentIndex
                ? "border-purple-500 ring-2 ring-purple-500/30 bg-slate-950 scale-105"
                : "border-slate-800 bg-slate-950/50 opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={getImagePath(item.image)}
              alt={item.name || "Thumbnail"}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

    </div>
  );
}