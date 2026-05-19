import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  Server, 
  ArrowDownToLine, 
  ArrowLeftRight, 
  Radio, 
  Settings 
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/providers', icon: Server, label: 'Providers' },
  { path: '/deposits', icon: ArrowDownToLine, label: 'Deposits' },
  { path: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { path: '/broadcast', icon: Radio, label: 'Broadcast' },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background/40 backdrop-blur-xl border-r border-white/5 flex flex-col z-30 shadow-2xl">
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">AdminPortal</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-8 px-5 custom-scrollbar flex flex-col gap-2">
        <div className="text-xs font-bold text-textMuted uppercase tracking-widest mb-4 px-3">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-300 group relative overflow-hidden",
              isActive 
                ? "bg-[rgba(99,102,241,0.15)] border-l-4 border-[#6366f1] text-white" 
                : "text-textMuted hover:bg-white/5 hover:text-white border-l-4 border-transparent"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-5 h-5 transition-colors relative z-10",
                  isActive ? "text-[#6366f1]" : "group-hover:text-white"
                )} />
                <span className="font-semibold relative z-10">{item.label}</span>
                
                {/* Hover gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </>
            )}
          </NavLink>
        ))}

        <div className="mt-auto pt-6 border-t border-white/5">
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-300 group relative",
              isActive 
                ? "bg-[rgba(99,102,241,0.15)] border-l-4 border-[#6366f1] text-white" 
                : "text-textMuted hover:bg-white/5 hover:text-white border-l-4 border-transparent"
            )}
          >
            <Settings className="w-5 h-5 group-hover:text-white" />
            <span className="font-semibold">Settings</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
