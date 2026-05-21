import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Calendar, User, LogOut, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import LogoutModal from './LogoutModal';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  // Helper function to handle premium active link highlighting
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 flex justify-center pointer-events-none font-sans">
      <nav className="w-full max-w-6xl pointer-events-auto bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 px-6 py-3.5 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative">
        
        {/* Underlay Ambient Light Beam */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        
        <div className="flex justify-between items-center">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 text-3xl font-black tracking-tight uppercase group text-white"
          >
            <span className="tracking-tight font-black text-white">
              Event<span className="text-purple-400">ura</span>
            </span>
          </Link>

          {/* Navigation Links & User Controls */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors relative py-1 ${
                isActive('/') ? 'text-purple-400' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Home
              {isActive('/') && (
                <motion.div layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 rounded-full" />
              )}
            </Link>

            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive('/dashboard') ? 'text-purple-400' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Dashboard
                  {isActive('/dashboard') && (
                    <motion.div layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 rounded-full" />
                  )}
                </Link>

                {['admin', 'organizer'].includes(user.role) && (
                  <Link 
                    to="/create-event" 
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive('/create-event') ? 'text-purple-400' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Create Event
                    {isActive('/create-event') && (
                      <motion.div layoutId="activeNavIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 rounded-full" />
                    )}
                  </Link>
                )}

                {/* User Session Controller */}
                <div className="flex items-center gap-4 ml-2 border-l pl-4 border-white/10">
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-neutral-200">
                    <User size={13} className="text-purple-400" /> 
                    {user.name}
                  </span>
                  
                  <button 
                    onClick={() => setIsLogoutModalOpen(true)} 
                    className="flex items-center gap-1.5 text-neutral-500 hover:text-red-400 text-xs font-bold transition-colors cursor-pointer group"
                  >
                    <LogOut size={14} className="group-hover:translate-x-0.5 transition-transform" /> 
                    Logout
                  </button>

                  <LogoutModal 
                    isOpen={isLogoutModalOpen} 
                    onClose={() => setIsLogoutModalOpen(false)} 
                    onConfirm={() => {
                      logout();
                      setIsLogoutModalOpen(false);
                    }} 
                  />
                </div>
              </>
            ) : (
              // Guest Entry Points
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
                >
                  <LogIn size={15} /> Login
                </Link>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/10 transition-all cursor-pointer inline-block"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;