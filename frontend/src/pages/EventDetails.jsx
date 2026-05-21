import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ArrowLeft, CheckCircle2, Calendar, MapPin, Users, User } from "lucide-react";
import toast from "react-hot-toast";
import api from "../api/axios"; // Adjust path to your axios instance
import Loader from "../components/Loader";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [shareCount, setShareCount] = useState(128);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Event Details
        const eventRes = await api.get(`/events/${id}`);
        setEvent(eventRes.data);

        // Check registration if user is logged in
        if (user) {
          const regRes = await api.get("/registrations");
          const reg = regRes.data.find(
            (r) => r.event && r.event._id === id && r.status === "confirmed"
          );
          if (reg) {
            setIsRegistered(true);
            setRegistrationId(reg._id);
          }
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user]);

  const handleRegister = async () => {
    if (!user) {
      toast.error("Please login to register");
      navigate("/login");
      return;
    }

    try {
      const res = await api.post("/registrations", { eventId: id });
      toast.success("Successfully registered!");
      setIsRegistered(true);
      setRegistrationId(res.data._id);
      setEvent((prev) => ({ ...prev, capacity: prev.capacity - 1 }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  const handleCancelRegistration = async () => {
    try {
      await api.put(`/registrations/${registrationId}`);
      toast.success("Registration cancelled");
      setIsRegistered(false);
      setRegistrationId(null);
      setEvent((prev) => ({ ...prev, capacity: prev.capacity + 1 }));
    } catch (err) {
      toast.error("Failed to cancel registration");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied!");
      setShareCount((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loader />;
  if (!event) return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Event not found</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full -z-10" />

      {/* BACK BUTTON */}
      <div className="absolute top-10 left-10 z-50">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors group bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Events
        </button>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={event.imageUrl || event.image}
          alt={event.title}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/40 to-transparent" />

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center px-6 w-full max-w-5xl">
          <p className="text-cyan-400 uppercase tracking-[8px] mb-6 text-sm">Live Experience</p>
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">{event.title}</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-8 line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT IMAGE WITH GLOW */}
          <div className="relative group sticky top-24">
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-70 transition duration-500" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl">
              <img
                src={event.imageUrl || event.image}
                alt={event.title}
                className="w-full h-[550px] object-cover rounded-[1.5rem]"
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Quick Info Grid */}
            <div className="grid sm:grid-cols-2 gap-5 mb-10">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:border-cyan-400/40 transition duration-300 flex items-center gap-4">
                <MapPin className="text-cyan-400" />
                <div>
                  <p className="text-gray-400 text-xs">Location</p>
                  <p className="font-semibold text-sm">{event.location}</p>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:border-pink-400/40 transition duration-300 flex items-center gap-4">
                <Calendar className="text-pink-400" />
                <div>
                  <p className="text-gray-400 text-xs">Date & Time</p>
                  <p className="font-semibold text-sm">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:border-purple-400/40 transition duration-300 flex items-center gap-4">
                <Users className="text-purple-400" />
                <div>
                  <p className="text-gray-400 text-xs">Availability</p>
                  <p className="font-semibold text-sm">
                    {event.capacity > 0 ? `${event.capacity} spots left` : 'Fully Booked'}
                  </p>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 hover:border-orange-400/40 transition duration-300 flex items-center gap-4">
                <User className="text-orange-400" />
                <div>
                  <p className="text-gray-400 text-xs">Organizer</p>
                  <p className="font-semibold text-sm">{event.organizer?.name || event.createdBy?.name}</p>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 mb-10 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">About This Event</h2>
              <p className="text-gray-300 leading-9 text-lg whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-6">
              {isRegistered ? (
                <div className="flex flex-col gap-4">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-5 rounded-2xl flex items-center justify-center gap-3 font-bold">
                    <CheckCircle2 /> You are registered for this event!
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 py-4 rounded-2xl font-bold transition"
                    >
                      Go to Dashboard
                    </button>
                    <button 
                      onClick={handleCancelRegistration}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 py-4 rounded-2xl font-bold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={event.capacity <= 0}
                  className={`w-full py-5 rounded-2xl font-black text-xl transition duration-300 shadow-2xl ${
                    event.capacity <= 0 
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:scale-[1.02] active:scale-95"
                  }`}
                >
                  {event.capacity <= 0 ? "EVENT FULL" : "REGISTER NOW"}
                </button>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventDetails;