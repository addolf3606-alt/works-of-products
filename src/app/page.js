"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Zap, 
  Cpu, 
  Home as HomeIcon, 
  Gamepad2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

export default function Home() {
  const categories = [
    { 
      slug: "electronics", 
      title: "Electronics", 
      desc: "Daily tools, soldering gear & power essentials.",
      icon: Zap,
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30"
    },
    { 
      slug: "tech", 
      title: "Tech Gadgets", 
      desc: "Smart devices, audio gear & computing tech.",
      icon: Cpu,
      color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30"
    },
    { 
      slug: "home", 
      title: "Home Appliances", 
      desc: "Everyday household & kitchen appliances.",
      icon: HomeIcon,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30"
    },
    { 
      slug: "toys", 
      title: "Toys & Hobby", 
      desc: "Interactive gadgets and learning kits.",
      icon: Gamepad2,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30"
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Detailed Guides",
      desc: "Step-by-step operating instructions and safety rules for every tool."
    },
    {
      icon: ShieldCheck,
      title: "Practical Knowledge",
      desc: "Understand internal components, specifications, and maintenance tips."
    },
    {
      icon: Sparkles,
      title: "Pakistani Context",
      desc: "Curated insights tailored to products commonly used across Pakistan."
    }
  ];

  // Framer Motion Parent & Child Variants for Grid Stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Har card 0.1s ke gap se aayega
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        
        {/* Hero Section with Motion */}
        <motion.header 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Pakistan's Premier Product Knowledge Hub 🇵🇰
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight mb-6">
            Products & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Their Practical Works
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Welcome to Pakistan’s dedicated portal for product understanding. Explore everyday electronics, home tools, and gadgets—learn how they operate, their key safety precautions, and step-by-step usage guides.
          </p>
        </motion.header>

        {/* Categories Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Explore Categories</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Select a category frame to view interactive product sliders</p>
            </div>
          </div>

          {/* Interactive Animated Responsive Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <motion.div key={cat.slug} variants={cardVariants}>
                  <Link
                    href={`/${cat.slug}`}
                    className="group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1 block h-full"
                  >
                    <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${cat.color} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                    
                    <div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-purple-400 transition-colors">
                        {cat.title}
                      </h3>
                      
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                      <span>Explore Frame</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Informational Feature Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-t border-slate-900 pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, index) => {
              const FeatIcon = feat.icon;
              return (
                <div key={index} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 flex flex-col items-start">
                  <div className="p-3 rounded-lg bg-slate-800/60 text-purple-400 mb-4">
                    <FeatIcon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-200 mb-2">{feat.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-slate-500 text-xs bg-slate-950/80 backdrop-blur-sm">
        <p>© 2026 Products & Their Works (Pakistan Knowledge Portal). All rights reserved.</p>
      </footer>
    </div>
  );
}