import React from 'react';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, Filter, Download } from 'lucide-react';

const mockTransactions = Array.from({ length: 20 }).map((_, i) => ({
  id: `TRX-${9000 + i}`,
  userId: `USR-${500 + i}`,
  type: i % 4 === 0 ? 'deposit' : i % 4 === 1 ? 'purchase' : i % 4 === 2 ? 'refund' : 'adjustment',
  amount: i % 4 === 1 ? `-PKR ${300 + (i * 10)}` : `+PKR ${1000 + (i * 100)}`,
  balanceAfter: `PKR ${5000 + (i * 100)}`,
  date: new Date(Date.now() - i * 3600000).toLocaleString(),
  status: ['completed', 'completed', 'completed', 'failed'][i % 4] as any,
}));

export function Transactions() {
  const columns = [
    { header: 'Tx ID', accessorKey: 'id' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'User ID', accessorKey: 'userId' },
    { 
      header: 'Type', 
      cell: (row: any) => (
        <StatusBadge 
          status={
            row.type === 'deposit' || row.type === 'refund' || row.type === 'adjustment' ? 'credit' : 'debit'
          } 
        />
      ) 
    },
    { header: 'Description', accessorKey: 'type', cell: (row: any) => <span className="capitalize">{row.type}</span> },
    { 
      header: 'Amount', 
      cell: (row: any) => (
        <span className={row.amount.startsWith('+') ? 'text-success font-medium' : 'text-danger font-medium'}>
          {row.amount}
        </span>
      ) 
    },
    { header: 'Balance After', accessorKey: 'balanceAfter' },
    { header: 'Status', cell: (row: any) => <StatusBadge status={row.status} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">Wallet Transactions</h1>
          <p className="text-sm text-textMuted mt-1">Full audit log of all system wallet movements.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search user or Tx ID..." 
              className="glass-input pl-9 w-64"
            />
          </div>
          <button className="glass-button-secondary">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="glass-button-secondary">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={mockTransactions} />
    </div>
  );
}
