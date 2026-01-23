'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      title: "Emergency Response",
      description: "One-tap emergency booking for immediate medical assistance.",
      icon: "🚑"
    },
    {
      title: "Real-time Tracking",
      description: "Live tracking of ambulances with status updates.",
      icon: "📍"
    },
    {
      title: "Family Monitoring",
      description: "Keep your loved ones informed with notifications and tracking.",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      title: "Secure Transport",
      description: "Safe return-to-home transport after hospital visits.",
      icon: "🛡️"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">

        {/* Navigation / Header */}
        <nav className="w-full flex justify-between items-center mb-16 md:mb-24">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            D-Care
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">
              Log In
            </Link>
            <Link href="/signup" className="bg-white text-slate-900 px-5 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg shadow-white/10">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24 md:mb-32"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your Health, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Our Priority.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the future of medical transport and care.
            Reliable, fast, and connected—D-Care ensures you and your loved ones are never alone in an emergency.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
            >
              Get Started Now
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
            >
              Member Login
            </Link>
          </motion.div>
        </motion.section>

        {/* About / Info Section */}
        <section className="w-full mb-24 md:mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-slate-800/30 p-8 md:p-12 rounded-3xl border border-slate-700/50 backdrop-blur-sm">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Why D-Care?</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                D-Care bridges the gap between emergency needs and medical response.
                We provide a seamless platform for booking medical transport, tracking rides in real-time,
                and keeping family members informed every step of the way.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Instant Booking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> 24/7 Availability
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">✓</span> Verified Medical Partners
                </li>
              </ul>
            </div>
            <div className="relative h-64 md:h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl flex items-center justify-center overflow-hidden">
              {/* Abstract Visual Representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-indigo-500 rounded-full blur-[60px] opacity-40 animate-pulse" />
                <div className="w-24 h-24 bg-purple-400 rounded-full blur-[40px] opacity-30 absolute top-1/4 right-1/4" />
              </div>
              <div className="relative z-10 text-6xl">🏥</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all cursor-default"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full mt-24 py-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} D-Care Platform. All rights reserved.</p>
        </footer>

      </div>
    </main>
  );
}
