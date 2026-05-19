import React from 'react';
import { GlassCard } from './GlassCard';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  iconBackground?: string;
}

export function StatCard({ title, value, icon: Icon, trend, className, iconBackground }: StatCardProps) {
  return (
    <GlassCard className={cn('flex flex-col gap-5 group', className)}>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-textMuted font-semibold tracking-wide uppercase">{title}</p>
          <h3 className="text-3xl font-extrabold text-white mt-1.5">{value}</h3>
        </div>
        <div 
          className="p-3.5 rounded-xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300"
          style={iconBackground ? { background: iconBackground } : { background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 mt-auto relative z-10">
          <span className={cn(
            "text-xs font-bold px-2.5 py-1 rounded-md border",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]" : "bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-xs text-textMuted font-medium">vs last month</span>
        </div>
      )}

      {/* Subtle hover gradient glow inside the card */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </GlassCard>
  );
}
