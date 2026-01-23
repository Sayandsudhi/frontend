'use client';
import { motion } from 'framer-motion';

export default function DashboardLoader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0f172a] text-white">
            <div className="relative flex items-center justify-center">
                {/* Ripple Effect */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full border border-indigo-500/30"
                        initial={{ width: 0, height: 0, opacity: 0.8 }}
                        animate={{
                            width: ['0px', '200px'],
                            height: ['0px', '200px'],
                            opacity: [0.8, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: i * 0.6,
                            ease: "easeOut"
                        }}
                    />
                ))}

                {/* Central Icon */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="relative z-10 text-6xl"
                >
                    🩺
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                className="mt-8 text-lg font-medium text-indigo-300 tracking-wider"
            >
                Loading D-Care...
            </motion.p>
        </div>
    );
}
