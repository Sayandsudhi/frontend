'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';

interface ProfileModalProps {
    initialData?: any;
    onComplete: (profile: any) => void;
    onClose?: () => void;
}

export default function ProfileModal({ initialData, onComplete, onClose }: ProfileModalProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        dateOfBirth: '',
        emergencyContact: '',
        homeAddress: '',
        medicalConditions: '',
        mobilityNeeds: 'None'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullName: initialData.fullName || '',
                dateOfBirth: initialData.dateOfBirth ? new Date(initialData.dateOfBirth).toISOString().split('T')[0] : '',
                emergencyContact: initialData.emergencyContact || '',
                homeAddress: initialData.homeAddress || '',
                medicalConditions: Array.isArray(initialData.medicalConditions)
                    ? initialData.medicalConditions.join(', ')
                    : initialData.medicalConditions || '',
                mobilityNeeds: initialData.mobilityNeeds || 'None'
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                medicalConditions: formData.medicalConditions.split(',').map((s: string) => s.trim()).filter(Boolean)
            };

            const { data } = await api.post('/patient/profile', payload);
            onComplete(data);
        } catch (error) {
            console.error('Failed to save profile', error);
            alert('Failed to save profile. Please try again.');
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
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                        type="button"
                    >
                        ✕
                    </button>
                )}

                <h2 className="text-2xl font-bold text-white mb-6">
                    {initialData ? 'Edit Profile' : 'Complete Your Profile'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Full Name</label>
                        <input
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Emergency Contact (Phone)</label>
                        <input
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.emergencyContact}
                            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Home Address</label>
                        <textarea
                            required
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={2}
                            value={formData.homeAddress}
                            onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Medical Conditions (comma separated)</label>
                        <input
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Diabetes, Hypertension"
                            value={formData.medicalConditions}
                            onChange={(e) => setFormData({ ...formData, medicalConditions: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Mobility Needs</label>
                        <select
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.mobilityNeeds}
                            onChange={(e) => setFormData({ ...formData, mobilityNeeds: e.target.value })}
                        >
                            <option value="None">None (Independent)</option>
                            <option value="Wheelchair">Wheelchair</option>
                            <option value="Stretcher">Stretcher</option>
                            <option value="Walker">Walker / Cane</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
