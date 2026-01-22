'use client';
import AuthForm from '../components/AuthForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs for aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="z-10 w-full flex flex-col items-center gap-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-400">
            NextGen Auth
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-lg mx-auto">
            Experience the future of secure and seamless authentication.
          </p>
        </div>

        <AuthForm />
      </div>
    </main>
  );
}
