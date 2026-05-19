import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Search, Filter, RotateCcw, XCircle, Eye } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const mockOrders = Array.from({ length: 20 }).map((_, i) => ({
  id: `ORD-${1000 + i}`,
  userId: `USR-${500 + i}`,
  product: i % 2 === 0 ? 'PUBG UC (60)' : 'Free Fire Diamonds (100)',
  provider: i % 3 === 0 ? 'Smile.one' : 'Codashop',
  amount: `PKR ${300 + (i * 10)}`,
  date: new Date(Date.now() - i * 3600000).toLocaleString(),
  status: ['completed', 'processing', 'pending', 'failed'][i % 4] as any,
}));

export function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const columns = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Product', accessorKey: 'product' },
    { header: 'Provider', accessorKey: 'provider' },
    { header: 'Amount', accessorKey: 'amount' },
    { header: 'Status', cell: (row: any) => <StatusBadge status={row.status} /> },
    { 
      header: 'Actions', 
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedOrder(row)}
            className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-primary transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {row.status === 'failed' && (
            <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-warning transition-colors" title="Retry">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          {(row.status === 'pending' || row.status === 'processing') && (
            <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-danger transition-colors" title="Cancel">
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">Orders Management</h1>
          <p className="text-sm text-textMuted mt-1">View and manage all digital product orders.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search order ID..." 
              className="glass-input pl-9 w-64"
            />
          </div>
          <button className="glass-button-secondary">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={mockOrders} />

      <Modal 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)}
        title="Order Details"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4" noPadding>
                <p className="text-xs text-textMuted mb-1">Order ID</p>
                <p className="font-semibold text-textMain">{selectedOrder.id}</p>
              </GlassCard>
              <GlassCard className="p-4" noPadding>
                <p className="text-xs text-textMuted mb-1">Status</p>
                <StatusBadge status={selectedOrder.status} />
              </GlassCard>
              <GlassCard className="p-4" noPadding>
                <p className="text-xs text-textMuted mb-1">User ID</p>
                <p className="font-semibold text-primary cursor-pointer hover:underline">{selectedOrder.userId}</p>
              </GlassCard>
              <GlassCard className="p-4" noPadding>
                <p className="text-xs text-textMuted mb-1">Date</p>
                <p className="font-semibold text-textMain">{selectedOrder.date}</p>
              </GlassCard>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-textMain border-b border-border pb-2 mb-4">Product Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-textMuted text-sm">Product Name</span>
                  <span className="text-textMain font-medium">{selectedOrder.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted text-sm">Provider</span>
                  <span className="text-textMain font-medium">{selectedOrder.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textMuted text-sm">Total Amount</span>
                  <span className="text-textMain font-bold">{selectedOrder.amount}</span>
                </div>
              </div>
            </div>

            {selectedOrder.status === 'failed' && (
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-4">
                <p className="text-sm text-danger font-medium">Error: Provider API returned timeout.</p>
              </div>
            )}

            <div className="flex gap-3 justify-end pt-4 border-t border-border mt-6">
              <button className="glass-button-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
              {selectedOrder.status === 'failed' && (
                <button className="glass-button bg-warning hover:bg-warning/90 shadow-warning/20">Retry Order</button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
