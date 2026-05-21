export default function Loader() {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950">
        {/* Background Glows to match the page */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full animate-pulse" />
  
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-20 h-20 rounded-full border-2 border-white/5 border-t-cyan-500 animate-spin" />
          
          {/* Inner Ring (Reverse direction) */}
          <div className="absolute inset-2 w-16 h-16 rounded-full border-2 border-white/5 border-b-purple-500 animate-[spin_1.5s_linear_infinite_reverse]" />
          
          {/* Center Glow */}
          <div className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full shadow-[0_0_15px_#fff]" />
        </div>
  
        <p className="mt-8 text-cyan-400 uppercase tracking-[0.3em] text-xs font-bold animate-pulse">
          Loading Experience
        </p>
      </div>
    );
  }