'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';

interface BookingModalProps {
    serviceType: string;
    onClose: () => void;
}

export default function BookingModal({ serviceType, onClose }: BookingModalProps) {
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropoffLocation: '',
        scheduledTime: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/bookings', {
                serviceType,
                ...formData
            });
            alert('Booking Confirmed!');
            onClose(); // Ideally refresh dashboard bookings here
        } catch (error) {
            console.error('Failed to create booking', error);
            alert('Failed to create booking.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Book {serviceType}</h2>
                <p className="text-slate-400 text-sm mb-6">Enter trip details below.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Pickup Location</label>
                        <input
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g. Home Address"
                            value={formData.pickupLocation}
                            onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Drop-off Location</label>
                        <input
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="e.g. General Hospital"
                            value={formData.dropoffLocation}
                            onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Date & Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-teal-500 outline-none custom-date-input"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold py-3 rounded-lg mt-4 transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Confirming...' : 'Confirm Request'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
