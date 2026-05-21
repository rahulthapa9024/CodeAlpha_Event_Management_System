import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, AlignLeft, Clock, Users, MapPin, Image, Sparkles, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const CreateEvent = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', capacity: '', imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authorization Check
  if (!user || !['admin', 'organizer'].includes(user.role)) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white px-6">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl border border-red-500/20 flex items-center justify-center mb-6">
          <Sparkles size={40} className="text-red-500" />
        </div>
        <h2 className="text-3xl font-black mb-2">Access Denied</h2>
        <p className="text-gray-400 mb-8">You don't have permission to host events.</p>
        <button onClick={() => navigate('/')} className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-xl font-bold transition">
          Return Home
        </button>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.post('/events', formData);
      toast.success("Event created successfully!");
      navigate(`/events/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full -z-10" />

      {/* Header Section */}
      <div className="relative pt-24 pb-12 px-6 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg shadow-purple-500/20">
            <Sparkles className="text-white" size={28} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Create <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Event</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Launch your next legendary experience into the world.</p>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          
          {/* Form Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Title Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Event Title</label>
            <div className="relative group">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Neo-Tokyo Music Festival"
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-lg placeholder:text-gray-600"
                required 
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Description</label>
            <div className="relative group">
              <AlignLeft className="absolute left-5 top-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows="5" 
                placeholder="What makes this event special?"
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-lg placeholder:text-gray-600 resize-none"
                required
              />
            </div>
          </div>

          {/* Dual Column: Date & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Date & Time</label>
              <div className="relative group">
                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <input 
                  type="datetime-local" 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 transition-all [color-scheme:dark]"
                  required 
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Max Capacity</label>
              <div className="relative group">
                <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                <input 
                  type="number" 
                  name="capacity" 
                  value={formData.capacity} 
                  onChange={handleChange} 
                  placeholder="Unlimited?"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 transition-all"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                placeholder="Venue name or city"
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 transition-all"
                required 
              />
            </div>
          </div>

          {/* Image URL Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-cyan-400 uppercase tracking-[3px] ml-1">Cover Image URL</label>
            <div className="relative group">
              <Image className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="url" 
                name="imageUrl" 
                value={formData.imageUrl} 
                onChange={handleChange} 
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
            {formData.imageUrl && (
              <div className="mt-4 rounded-2xl overflow-hidden h-32 w-full border border-white/10">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 py-5 rounded-2xl font-black text-xl tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "CREATING..." : "PUBLISH EVENT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;