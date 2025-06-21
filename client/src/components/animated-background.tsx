export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Moving geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/40 dark:bg-blue-500/20 rounded-full animate-float-slow transform-gpu"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200/40 dark:bg-purple-500/20 rotate-45 animate-spin-slow transform-gpu"></div>
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-indigo-200/40 dark:bg-indigo-500/20 rounded-full animate-bounce-slow transform-gpu"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-teal-200/40 dark:bg-teal-500/20 animate-pulse-slow transform-gpu"></div>
        
        {/* Animated triangles */}
        <div className="absolute top-1/5 right-1/5 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-cyan-200/30 dark:border-b-cyan-500/15 animate-float-reverse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-pink-200/30 dark:border-b-pink-500/15 animate-bounce-reverse"></div>
        
        {/* Flowing wave effect */}
        <div className="absolute inset-0">
          <svg className="w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <path d="M0,300 Q250,200 500,300 T1000,300 L1000,1000 L0,1000 Z" fill="url(#wave-gradient)" className="animate-wave"/>
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/6 left-1/6 w-2 h-2 bg-blue-400/60 dark:bg-blue-400/30 rounded-full animate-float-particle-1"></div>
        <div className="absolute top-2/5 right-1/3 w-3 h-3 bg-purple-400/60 dark:bg-purple-400/30 rounded-full animate-float-particle-2"></div>
        <div className="absolute bottom-1/3 left-2/5 w-2 h-2 bg-indigo-400/60 dark:bg-indigo-400/30 rounded-full animate-float-particle-3"></div>
        <div className="absolute top-3/5 right-1/6 w-1 h-1 bg-teal-400/60 dark:bg-teal-400/30 rounded-full animate-float-particle-4"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        {/* Dynamic gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-300/30 to-transparent dark:from-blue-600/15 animate-float-orb-1"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-300/30 to-transparent dark:from-purple-600/15 animate-float-orb-2"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-radial from-indigo-300/25 to-transparent dark:from-indigo-600/12 animate-float-orb-3 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}
