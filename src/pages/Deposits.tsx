import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, Filter, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

const mockDeposits = Array.from({ length: 15 }).map((_, i) => ({
  id: `DEP-${2000 + i}`,
  userId: `USR-${500 + i}`,
  amount: `PKR ${1000 + (i * 500)}`,
  cryptoAmount: `${(10 + (i * 2.5)).toFixed(2)} USDT`,
  network: i % 2 === 0 ? 'TRC20' : 'BEP20',
  txHash: `0x${Math.random().toString(16).substr(2, 10)}...${Math.random().toString(16).substr(2, 4)}`,
  date: new Date(Date.now() - i * 3600000).toLocaleString(),
  status: ['completed', 'pending', 'failed'][i % 3] as any,
}));

export function Deposits() {
  const columns = [
    { header: 'Deposit ID', accessorKey: 'id' },
    { header: 'User ID', accessorKey: 'userId' },
    { header: 'Amount (PKR)', accessorKey: 'amount' },
    { header: 'Crypto (USDT)', accessorKey: 'cryptoAmount' },
    { header: 'Network', accessorKey: 'network' },
    { 
      header: 'Tx Hash', 
      cell: (row: any) => (
        <a href="#" className="flex items-center gap-1 text-primary hover:underline">
          {row.txHash}
          <ExternalLink className="w-3 h-3" />
        </a>
      ) 
    },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Status', cell: (row: any) => <StatusBadge status={row.status} /> },
    { 
      header: 'Actions', 
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          {row.status === 'pending' && (
            <>
              <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-success transition-colors" title="Approve">
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-danger transition-colors" title="Reject">
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">Deposit Approvals</h1>
          <p className="text-sm text-textMuted mt-1">Manage user wallet deposits via Crypto.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search TX hash..." 
              className="glass-input pl-9 w-64"
            />
          </div>
          <button className="glass-button-secondary">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Pending Approvals</span>
          <span className="text-3xl font-bold text-warning">24</span>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Today's Deposits</span>
          <span className="text-3xl font-bold text-success">PKR 145,000</span>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Total USDT Volume</span>
          <span className="text-3xl font-bold text-textMain">1,240.50</span>
        </GlassCard>
      </div>

      <DataTable columns={columns} data={mockDeposits} />
    </div>
  );
}
