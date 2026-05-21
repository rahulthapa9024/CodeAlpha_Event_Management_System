import React from 'react';
import { LogOut } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Background click-away handler to close the popover */}
      <div 
        className="fixed inset-0 z-40 bg-transparent cursor-default" 
        onClick={onClose}
      />
      
      {/* Elegant Floating Confirm Card */}
      <div 
        className="absolute right-0 top-full mt-3 w-80 bg-white border border-slate-100 rounded-2xl p-5 shadow-2xl z-50 animate-fade-in text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
            <LogOut size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Confirm Logout</h4>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Are you sure you want to log out? You will need to log back in to register for events.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-2.5 pt-2 border-t border-slate-50">
          <button 
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-md hover:shadow-red-500/10 rounded-lg transition-all cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutModal;
