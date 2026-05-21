import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Inbox, CheckCircle2, AlertTriangle, ArrowRight, LayoutDashboard } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Loader from '../components/Loader';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const res = await api.get('/registrations');
        setRegistrations(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your registrations");
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await api.put(`/registrations/${id}`);
      setRegistrations(registrations.map(r => r._id === id ? { ...r, status: 'cancelled' } : r));
      toast.success("Registration cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel registration");
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-6">
       <div className="w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6">
          <AlertTriangle size={40} className="text-yellow-500" />
       </div>
       <h2 className="text-3xl font-black mb-4">Access Denied</h2>
       <p className="text-gray-400 mb-8">Please log in to view your dashboard.</p>
       <Link to="/login" className="bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 rounded-xl font-bold">Login Now</Link>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full -z-10" />

      {/* DASHBOARD HEADER */}
      <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-cyan-400 uppercase tracking-[4px] text-sm mb-4">
              <LayoutDashboard size={18} />
              User Portal
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-gray-400 mt-4 text-lg md:text-xl max-w-xl font-light">
              Welcome back, <span className="text-white font-semibold">{user.name}</span>. 
              Track and manage your upcoming event experiences here.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <div className="relative">
          {/* Section Label */}
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            Registered Events 
            <span className="text-sm font-normal bg-white/10 px-3 py-1 rounded-full text-gray-400">
              {registrations.filter(r => r.event).length}
            </span>
          </h2>
          
          {registrations.filter(r => r.event).length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-20 text-center flex flex-col items-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 text-gray-600">
                <Inbox size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No registrations found</h3>
              <p className="text-gray-400 mb-10 max-w-sm">You haven't booked any seats for our upcoming live experiences yet.</p> 
              <Link 
                to="/" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-purple-500/20 flex items-center gap-2"
              >
                Browse Events <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {registrations.filter(r => r.event).map((reg) => (
                <div 
                  key={reg._id} 
                  className="group relative"
                >
                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500" />
                  
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    
                    {/* Event Info */}
                    <div className="flex gap-6 items-center">
                      <div className="hidden sm:block w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
                        <img 
                            src={reg.event.imageUrl || reg.event.image} 
                            alt="" 
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          <Link to={`/events/${reg.event._id}`}>
                            {reg.event.title}
                          </Link>
                        </h3>
                        
                        <div className="flex flex-wrap gap-5 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-purple-400" />
                            <span>{new Date(reg.event.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-cyan-400" />
                            <span>{reg.event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status & Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                      <div className="w-full sm:w-auto text-center">
                        {reg.status === 'confirmed' ? (
                          <span className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider rounded-xl">
                            <CheckCircle2 size={14} /> Confirmed
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider rounded-xl">
                            <AlertTriangle size={14} /> Cancelled
                          </span>
                        )}
                      </div>
                      
                      {reg.status === 'confirmed' && (
                        <button 
                          onClick={() => handleCancel(reg._id)}
                          className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-300 bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 hover:text-red-400 rounded-xl transition-all"
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      <Link 
                        to={`/events/${reg.event._id}`}
                        className="w-full sm:w-auto px-6 py-3 text-sm font-bold bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;