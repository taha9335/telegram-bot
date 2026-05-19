import React from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, ShieldAlert, Wallet, Eye } from 'lucide-react';

const mockUsers = Array.from({ length: 15 }).map((_, i) => ({
  id: `USR-${5000 + i}`,
  telegramId: `12345${i}678`,
  username: `@user${i}_xyz`,
  balance: `PKR ${(Math.random() * 5000).toFixed(0)}`,
  joinedDate: new Date(Date.now() - i * 86400000 * 5).toLocaleDateString(),
  status: i % 7 === 0 ? 'inactive' : 'active',
}));

export function Users() {
  const columns = [
    { header: 'System ID', accessorKey: 'id' },
    { header: 'Telegram ID', accessorKey: 'telegramId' },
    { header: 'Username', accessorKey: 'username' },
    { header: 'Balance', accessorKey: 'balance' },
    { header: 'Joined Date', accessorKey: 'joinedDate' },
    { header: 'Status', cell: (row: any) => <StatusBadge status={row.status} /> },
    { 
      header: 'Actions', 
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-primary transition-colors" title="View Profile">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-success transition-colors" title="Add Balance">
            <Wallet className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-danger transition-colors" title={row.status === 'active' ? 'Ban User' : 'Unban User'}>
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">Users Management</h1>
          <p className="text-sm text-textMuted mt-1">Manage Telegram bot users and their wallets.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search by ID or username..." 
              className="glass-input pl-9 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Total Users</span>
          <span className="text-3xl font-bold text-textMain">12,450</span>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Active (24h)</span>
          <span className="text-3xl font-bold text-success">842</span>
        </GlassCard>
        <GlassCard className="flex flex-col gap-2">
          <span className="text-textMuted text-sm font-medium">Total Wallet Balances</span>
          <span className="text-3xl font-bold text-primary">PKR 4.2M</span>
        </GlassCard>
      </div>

      <DataTable columns={columns} data={mockUsers} />
    </div>
  );
}
