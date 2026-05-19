import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const mockProducts = [
  { id: 'PRD-1', name: 'PUBG UC (60)', category: 'Games', provider: 'Smile.one', cost: 250, price: 300, stock: -1, status: 'active' },
  { id: 'PRD-2', name: 'PUBG UC (325)', category: 'Games', provider: 'Smile.one', cost: 1200, price: 1400, stock: -1, status: 'active' },
  { id: 'PRD-3', name: 'Free Fire (100)', category: 'Games', provider: 'Codashop', cost: 200, price: 250, stock: -1, status: 'active' },
  { id: 'PRD-4', name: 'Valorant Points (475)', category: 'Games', provider: 'Codashop', cost: 1250, price: 1400, stock: -1, status: 'active' },
  { id: 'PRD-5', name: 'Mobile Legends (86)', category: 'Games', provider: 'Smile.one', cost: 380, price: 450, stock: -1, status: 'active' },
  { id: 'PRD-6', name: 'Steam Gift Card ($10)', category: 'Gift Cards', provider: 'SeagmAPI', cost: 2800, price: 3000, stock: 50, status: 'inactive' },
  { id: 'PRD-7', name: 'Google Play ($10)', category: 'Gift Cards', provider: 'SeagmAPI', cost: 2800, price: 3000, stock: 25, status: 'active' },
];

export function Products() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns = [
    { header: 'Product Name', accessorKey: 'name' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Provider', accessorKey: 'provider' },
    { header: 'Cost (PKR)', accessorKey: 'cost' },
    { header: 'Price (PKR)', accessorKey: 'price' },
    { header: 'Stock', cell: (row: any) => row.stock === -1 ? 'Unlimited' : row.stock },
    { header: 'Status', cell: (row: any) => <StatusBadge status={row.status} /> },
    { 
      header: 'Actions', 
      cell: () => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-primary transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded bg-surface border border-border text-textMain hover:text-danger transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) 
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">Products Catalog</h1>
          <p className="text-sm text-textMuted mt-1">Manage digital products, pricing, and providers.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="glass-input pl-9 w-64"
            />
          </div>
          <button className="glass-button" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      <DataTable columns={columns} data={mockProducts} />

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Product">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">Product Name</label>
            <input type="text" className="w-full glass-input" placeholder="e.g. PUBG UC (60)" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Category</label>
              <select className="w-full glass-input appearance-none bg-surface">
                <option>Games</option>
                <option>Gift Cards</option>
                <option>Subscriptions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Provider</label>
              <select className="w-full glass-input appearance-none bg-surface">
                <option>Smile.one</option>
                <option>Codashop</option>
                <option>SeagmAPI</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Provider Cost (PKR)</label>
              <input type="number" className="w-full glass-input" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1.5">Selling Price (PKR)</label>
              <input type="number" className="w-full glass-input" placeholder="0" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">Provider Product Code/ID</label>
            <input type="text" className="w-full glass-input" placeholder="e.g. pubg_60" />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border mt-6">
            <button type="button" className="glass-button-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
            <button type="submit" className="glass-button">Save Product</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
