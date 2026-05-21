import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Search, Sparkles } from 'lucide-react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const SkeletonCard = () => (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-5 space-y-4 animate-pulse border border-white/10">
      <div className="h-60 bg-white/5 rounded-2xl w-full" />
      <div className="h-8 bg-white/5 rounded-xl w-3/4" />
      <div className="space-y-3">
        <div className="h-5 bg-white/5 rounded-lg w-1/2" />
        <div className="h-5 bg-white/5 rounded-lg w-1/3" />
      </div>
      <div className="h-12 bg-white/5 rounded-2xl w-full mt-4" />
    </div>
  );

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-950 pt-10">
      
      {/* Cinematic Ambient Glow Background */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full -z-10" />

      {/* Main Container */}
      <div className="px-6 py-10 max-w-7xl mx-auto relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center mb-24 pt-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-cyan-400 text-sm font-semibold mb-6 border border-white/10 backdrop-blur-md uppercase tracking-[4px]">
            Discover The Best Events
          </span>

          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              Experience
            </span>
            <br />
            <span className="text-white">
              The Future Of Events
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-8 font-light mb-12">
            Join thousands of people discovering unique experiences. Explore concerts, 
            tech conferences, gaming tournaments, startup meetups and unforgettable live experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 max-w-md mx-auto">
            <button 
              onClick={() => {
                document.getElementById('upcoming-events')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 py-4 px-8 rounded-2xl text-white font-bold hover:scale-[1.03] transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group"
            >
              Explore Events
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            {user && ['admin', 'organizer'].includes(user.role) && (
              <Link 
                to="/create-event" 
                className="w-full py-4 px-8 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl text-center"
              >
                Create Event
              </Link>
            )}
          </div>
        </section>

        {/* --- EVENTS SECTION --- */}
        <section id="upcoming-events" className="mt-16">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/5 pb-8">
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight">Upcoming Events</h2>
              <p className="text-gray-400 mt-2">Discover what's happening around you</p>
            </div>
          </div>

          {/* Conditional Grid Rendering */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {events.map((event) => (
                <div 
                  key={event._id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-3 hover:border-cyan-400/40 transition duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Wrapper */}
                    <div className="h-64 overflow-hidden relative">
                      {event.imageUrl ? (
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center group-hover:scale-110 transition duration-700">
                          <Calendar size={40} className="text-slate-700" />
                        </div>
                      )}
                      
                      {/* Radial Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                      
                      {/* Premium Glassmorphic Floating Date Badge */}
                      <div className="absolute top-5 left-5 bg-slate-950/70 backdrop-blur-xl rounded-2xl p-2.5 px-4 text-center border border-white/15 shadow-2xl">
                        <span className="block text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="block text-2xl font-black text-white">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-7 pb-0">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-300 text-[10px] font-bold uppercase tracking-widest rounded-full border border-purple-500/20">
                          {event.category || 'Experience'}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-white mb-3 line-clamp-1 leading-tight">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 line-clamp-2 leading-7 font-light">
                        {event.description}
                      </p>
                      
                      <div className="space-y-3 text-gray-300">
                        <div className="flex items-center gap-3 group/item">
                          <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover/item:border-cyan-400/30 transition-colors">
                            <MapPin size={16} className="text-cyan-400" />
                          </div>
                          <span className="text-sm font-medium">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 group/item">
                          <div className="p-2 bg-white/5 rounded-xl border border-white/5 group-hover/item:border-pink-500/30 transition-colors">
                            <Users size={16} className="text-pink-400" />
                          </div>
                          <span className="text-sm font-medium">{event.capacity} Spots available</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Button Container */}
                  <div className="p-7">
                    <Link 
                      to={`/events/${event._id}`} 
                      className="flex items-center justify-center w-full py-3.5 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 text-white font-semibold rounded-2xl border border-white/10 hover:from-purple-600 hover:to-cyan-500 hover:border-transparent hover:scale-[1.02] transition-all duration-300 text-center shadow-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State Fallback */}
          {!loading && events.length === 0 && (
            <div className="text-center py-28 bg-white/5 rounded-[2.5rem] border border-dashed border-white/15 backdrop-blur-md">
              <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                <Search size={32} className="text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
              <p className="text-gray-400 font-light">Check back later for upcoming premium experiences.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;