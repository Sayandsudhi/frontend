'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import EmergencyButton from '@/components/EmergencyButton';
import ServiceCard from '@/components/ServiceCard';
import TrackingMap from '@/components/TrackingMap';
import ProfileModal from '@/components/ProfileModal';
import BookingModal from '@/components/BookingModal';
import api from '@/lib/api';

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; profile?: any } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeRide, setActiveRide] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [bookings, setBookings] = useState<any[]>([]);

    const fetchDashboardData = async () => {
        try {
            const res = await api.get('/dashboard');
            setUser(res.data.user);

            // If user has no profile, show modal
            if (!res.data.user.profile) {
                setShowProfileModal(true);
            }

            // Fetch bookings
            const booksRes = await api.get('/bookings');
            setBookings(booksRes.data);
        } catch (error) {
            console.error(error);
            router.push('/');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [router]);

    const handleProfileComplete = (profile: any) => {
        setUser(prev => prev ? { ...prev, profile } : null);
        setShowProfileModal(false);
    };

    const handleEmergency = async () => {
        try {
            await api.post('/bookings', {
                serviceType: 'EMERGENCY',
                pickupLocation: 'Current Location (GPS)', // In a real app, use Geolocation API
                dropoffLocation: 'Nearest Hospital',
                scheduledTime: new Date().toISOString()
            });
            setActiveRide(true);
            alert("🚨 EMERGENCY ALERT SENT! \n\nDriver dispatched to your location.\nHospital pre-alerted.");
            fetchDashboardData();
        } catch (error) {
            console.error(error);
            alert("Failed to send alert. Please call 911/112 immediately.");
        }
    };

    const handleService = (service: string) => {
        setSelectedService(service);
    };

    if (loading || !user) return <div className="text-white text-center mt-20">Loading dashboard...</div>;

    return (
        <main className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden pb-20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-900/40 to-slate-900 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                            D-Care
                        </h1>
                        <p className="text-slate-400 text-sm">Hello, {user.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Profile Avatar */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowProfileModal(true)}
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg border border-white/20"
                        >
                            {user.profile?.fullName ? user.profile.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </motion.button>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                router.push('/');
                            }}
                            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-medium hover:bg-red-500/20 transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Modals */}
                <AnimatePresence>
                    {showProfileModal && (
                        <ProfileModal
                            initialData={user.profile}
                            onComplete={handleProfileComplete}
                            onClose={() => setShowProfileModal(false)}
                        />
                    )}
                    {selectedService && (
                        <BookingModal
                            serviceType={selectedService}
                            onClose={() => { setSelectedService(null); fetchDashboardData(); }}
                        />
                    )}
                </AnimatePresence>

                {/* Active Ride Status */}
                {activeRide && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Live Status
                        </h2>
                        <TrackingMap />
                    </motion.div>
                )}

                {/* Main Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Left: Emergency */}
                    <div className="flex flex-col items-center justify-center p-8 bg-red-900/10 rounded-3xl border border-red-500/20 order-first md:order-last lg:order-first relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 z-0 animate-pulse" />
                        <h2 className="text-2xl font-bold text-red-400 mb-6 relative z-10">Emergency Access</h2>
                        <div className="relative z-10">
                            <EmergencyButton onClick={handleEmergency} />
                        </div>
                        <p className="mt-4 text-red-400/60 text-sm relative z-10">Hold for 3 seconds to cancel</p>
                    </div>

                    {/* Right: Services */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ServiceCard
                            title="Medical Transport"
                            icon="🚑"
                            description="Safe ride to hospital with assistance."
                            onClick={() => handleService('Transport')}
                            color="bg-blue-500"
                        />
                        <ServiceCard
                            title="Helper / Assistant"
                            icon="🤝"
                            description="Trained companion for mobility support."
                            onClick={() => handleService('Helper')}
                            color="bg-teal-500"
                        />
                        <ServiceCard
                            title="Dialysis / Chemo"
                            icon="🏥"
                            description="Scheduled recurring trips."
                            onClick={() => handleService('Recurring')}
                            color="bg-purple-500"
                        />
                        <ServiceCard
                            title="Family Dashboard"
                            icon="👨‍👩‍👧‍👦"
                            description="Connect and monitor loved ones."
                            onClick={() => router.push('/dashboard/family')}
                            color="bg-indigo-500"
                        />
                    </div>
                </div>

                {/* Recent Activity / Info */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                    <h3 className="text-lg font-bold mb-4">Recent Bookings</h3>
                    {bookings.length === 0 ? (
                        <div className="text-slate-400 text-sm text-center py-8">
                            No recent activity.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookings.map((booking) => (
                                <div key={booking.id} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700 group">
                                    <div>
                                        <p className="font-medium text-teal-400">{booking.serviceType}</p>
                                        <p className="text-xs text-slate-400">{booking.pickupLocation} ➔ {booking.dropoffLocation}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xs px-2 py-1 rounded-full ${booking.status === 'URGENT_DISPATCH' ? 'bg-red-500/20 text-red-500 transform animate-pulse' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                            {booking.status}
                                        </span>
                                        <button
                                            onClick={async () => {
                                                if (confirm('Cancel this booking?')) {
                                                    try {
                                                        await api.delete(`/bookings?id=${booking.id}`);
                                                        fetchDashboardData();
                                                    } catch (e) { alert('Failed to cancel'); }
                                                }
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                            title="Cancel Booking"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
