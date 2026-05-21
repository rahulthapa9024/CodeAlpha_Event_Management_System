import { FaGlobe, FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socials = [
    { href: "https://portfolio-ten-xi-mee38qjyjs.vercel.app/", Icon: FaGlobe, label: "Portfolio", color: "group-hover:text-cyan-400", bg: "group-hover:border-cyan-400/50" },
    { href: "https://github.com/rahulthapa9024", Icon: FaGithub, label: "GitHub", color: "group-hover:text-white", bg: "group-hover:border-white/50" },
    { href: "https://www.linkedin.com/in/rahul-thapa-02a168320/", Icon: FaLinkedin, label: "LinkedIn", color: "group-hover:text-blue-400", bg: "group-hover:border-blue-400/50" },
    { href: "mailto:rahulthapa9024@gmail.com", Icon: Mail, label: "Email", color: "group-hover:text-pink-400", bg: "group-hover:border-pink-400/50" },
  ];

  const quickLinks = [
    { name: "Discover Events", path: "/", highlight: true },
    { name: "My Dashboard", path: "/dashboard" },
  ];

  return (
    <footer className="relative z-10 bg-gradient-to-b from-slate-950/90 via-slate-950 to-slate-950 border-t border-white/10 pt-16 pb-8">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-evenly md:grid-cols-2 lg:grid-cols-4 gap-12 gap-y-10 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5 group">
              <span className="tracking-tight font-black text-3xl bg-gradient-to-r from-white via-white to-purple-300 bg-clip-text text-transparent">
                EVENT
                <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                  URA
                </span>
              </span>
              <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-transparent transition-all duration-500 mt-1"></div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-6 w-xl">
              Crafting unforgettable live experiences through modern technology and community.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>All systems operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-6 h-px bg-purple-500"></span>
              Platform
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.path}
                    className={`text-gray-400 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 group ${
                      link.highlight ? "font-medium" : ""
                    }`}
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-purple-500 transition-all duration-300"></span>
                    {link.name}
                    {link.highlight && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-6 h-px bg-purple-500"></span>
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-lg ${social.bg}`}
                >
                  <social.Icon size={18} className={`transition-all duration-300 ${social.color}`} />
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}