'use client';

import { motion } from 'framer-motion';

interface EmergencyButtonProps {
    onClick: () => void;
}

export default function EmergencyButton({ onClick }: EmergencyButtonProps) {
    return (
        <div className="flex flex-col items-center justify-center p-6">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.7)",
                        "0 0 0 20px rgba(239, 68, 68, 0)",
                    ],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
                onClick={onClick}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white font-bold text-2xl shadow-xl border-4 border-red-400/30 flex items-center justify-center flex-col z-10"
            >
                <span className="text-4xl mb-2">🚑</span>
                SOS
                <span className="text-xs font-normal opacity-90 mt-1">One-Tap Call</span>
            </motion.button>
            <p className="mt-4 text-slate-500 text-sm font-medium">Press for Immediate Help</p>
        </div>
    );
}
