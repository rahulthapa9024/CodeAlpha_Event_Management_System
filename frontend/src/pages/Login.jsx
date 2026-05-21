import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Img from "../assets/Event.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] flex flex-col lg:flex-row overflow-hidden font-sans">
      
      {/* LEFT SIDE: The Brand & Event Experience */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center p-12 overflow-hidden border-r border-white/5">
        {/* Cinematic Background Image */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={Img} 
            alt="Event Atmosphere" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        </motion.div>

        {/* Content Over Image */}
        <div className="relative z-10 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-white font-black text-3xl tracking-tight uppercase">
                Event<span className="text-purple-400">ura</span>
              </span>
            </div>

            <h2 className="text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Craft the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Unforgettable
              </span> <br />
              Moments.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Access Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-[#050505] relative">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 blur-[120px] -z-10 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/5 blur-[100px] -z-10 rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Form Header */}
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">
              Sign In
            </h1>
            <p className="text-neutral-500">Welcome back, Coordinator. Access your Eventura dashboard.</p>
          </div>

          {/* Error Message Section */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm text-center font-medium backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-500 group-focus-within:text-purple-400 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#0a0a0a] border-2 border-neutral-900 focus:border-purple-500/50 py-4 pl-12 pr-5 rounded-xl text-white outline-none transition-all duration-300 focus:ring-4 ring-purple-500/5 font-medium placeholder-neutral-600"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-neutral-500 group-focus-within:text-purple-400 transition-colors">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border-2 border-neutral-900 focus:border-purple-500/50 py-4 pl-12 pr-5 rounded-xl text-white outline-none transition-all duration-300 focus:ring-4 ring-purple-500/5 font-medium placeholder-neutral-600"
                  required
                />
              </div>
            </div>

            {/* Action Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/10 transition-all cursor-pointer"
            >
              Sign In to Arena
            </motion.button>
          </form>

          {/* Bottom Call to Action */}
          <p className="mt-12 text-center text-xs text-neutral-600 dynamic-link-wrapper">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-purple-400 font-bold hover:underline hover:text-purple-300 transition-colors px-1">
              Sign up
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}