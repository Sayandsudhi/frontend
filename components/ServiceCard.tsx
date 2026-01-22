'use client';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    title: string;
    icon: string;
    description: string;
    onClick: () => void;
    color?: string;
}

export default function ServiceCard({ title, icon, description, onClick, color = "bg-white" }: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            onClick={onClick}
            className={`relative overflow-hidden cursor-pointer rounded-2xl p-6 ${color} bg-opacity-10 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-xl transition-all`}
        >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full -mr-4 -mt-4" />
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
}
