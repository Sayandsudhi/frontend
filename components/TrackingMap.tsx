'use client';

export default function TrackingMap() {
    return (
        <div className="w-full h-64 bg-slate-200 rounded-xl overflow-hidden relative border border-slate-300">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-20 bg-cover bg-center" />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-500 font-medium">Live Map Mockup</div>
            </div>

            {/* Mock Driver Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-8">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute" />
                <div className="w-4 h-4 bg-blue-600 rounded-full relative border-2 border-white" />
            </div>

            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-xs font-semibold text-slate-700">
                🚗 Driver: 3 mins away
            </div>
        </div>
    );
}
