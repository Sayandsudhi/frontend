'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function FamilyDashboard() {
    const router = useRouter();

    // Mock data for linked family members
    // In a real app, this would come from an API call
    const [familyMembers, setFamilyMembers] = useState([
        { id: 1, name: 'Grandma Sarah', status: 'Safe at Home', lastSeen: '2 hours ago', battery: '85%' },
        { id: 2, name: 'Uncle Bob', status: 'In Transit', lastSeen: 'Just now', battery: '42%' },
    ]);

    return (
        <main className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden p-4 md:p-8">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => router.back()}
                        className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Family Circle
                    </h1>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {familyMembers.map((member) => (
                        <motion.div
                            key={member.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{member.name}</h3>
                                    <p className={`text-sm mt-1 ${member.status === 'In Transit' ? 'text-green-400' : 'text-slate-400'}`}>
                                        {member.status === 'In Transit' ? '🚗' : '🏠'} {member.status}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500">Last update: {member.lastSeen}</span>
                                    <div className="flex items-center justify-end gap-1 mt-1 text-xs text-slate-400">
                                        🔋 {member.battery}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                                    📍 Track
                                </button>
                                <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm transition-colors font-medium">
                                    🏥 Book Ride
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add Member Card */}
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(30, 41, 59, 0.8)' }}
                        className="bg-slate-800/20 border-2 border-dashed border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-white transition-all min-h-[180px]"
                    >
                        <span className="text-4xl mb-2">+</span>
                        <span className="font-medium">Link New Member</span>
                    </motion.button>
                </div>

                {/* Recent Alerts */}
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-bold mb-4">Recent Alerts</h3>
                    <div className="space-y-3">
                        <div className="flex gap-4 items-center p-3 bg-slate-900/50 rounded-lg border-l-4 border-green-500">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div>
                                <p className="text-sm">Uncle Bob arrived at General Hospital.</p>
                                <p className="text-xs text-slate-500">10 minutes ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center p-3 bg-slate-900/50 rounded-lg border-l-4 border-yellow-500">
                            <div className="w-2 h-2 rounded-full bg-yellow-500" />
                            <div>
                                <p className="text-sm">Grandma Sarah battery is low (15%).</p>
                                <p className="text-xs text-slate-500">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
