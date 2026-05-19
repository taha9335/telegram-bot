import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-20 border-b border-white/5 bg-background/30 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full glass-input pl-11"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <button className="relative p-2 text-textMuted hover:text-white transition-colors rounded-xl hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] animate-pulse"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-8 border-l border-white/10">
          <div className="text-right">
            <p className="text-sm font-semibold text-white leading-none">Admin User</p>
            <p className="text-xs text-blue-400 mt-1 font-medium">Super Admin</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
            <User className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
