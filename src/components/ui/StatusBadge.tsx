import React from 'react';
import { cn } from '../../lib/utils';

interface StatusBadgeProps {
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'active' | 'inactive' | 'credit' | 'debit' | 'refund';
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
      case 'active':
      case 'credit':
        return 'bg-[rgba(16,185,129,0.15)] text-emerald-400 border-[rgba(16,185,129,0.3)] backdrop-blur-md shadow-[0_0_10px_rgba(16,185,129,0.1)]';
      case 'failed':
      case 'inactive':
      case 'debit':
        return 'bg-[rgba(239,68,68,0.15)] text-rose-400 border-[rgba(239,68,68,0.3)] backdrop-blur-md shadow-[0_0_10px_rgba(239,68,68,0.1)]';
      case 'processing':
      case 'refund':
        return 'bg-[rgba(59,130,246,0.15)] text-blue-400 border-[rgba(59,130,246,0.3)] backdrop-blur-md shadow-[0_0_10px_rgba(59,130,246,0.1)]';
      case 'pending':
        return 'bg-[rgba(245,158,11,0.15)] text-amber-400 border-[rgba(245,158,11,0.3)] backdrop-blur-md shadow-[0_0_10px_rgba(245,158,11,0.1)]';
      default:
        return 'bg-white/5 text-textMuted border-white/10 backdrop-blur-md';
    }
  };

  return (
    <span className={cn(
      'px-2.5 py-1 rounded-full text-xs font-medium border uppercase tracking-wider',
      getStatusStyles(),
      className
    )}>
      {status}
    </span>
  );
}
