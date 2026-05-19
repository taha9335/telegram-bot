import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Server, Settings, RefreshCw, Plus } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const mockProviders = [
  { id: '1', name: 'Smile.one', status: 'active', balance: 'USD 1,250.00', health: 'operational', lastSync: '2 mins ago' },
  { id: '2', name: 'Codashop', status: 'active', balance: 'USD 450.50', health: 'operational', lastSync: '5 mins ago' },
  { id: '3', name: 'SeagmAPI', status: 'inactive', balance: 'USD 0.00', health: 'down', lastSync: '2 hours ago' },
  { id: '4', name: 'RazerGold', status: 'active', balance: 'USD 890.20', health: 'degraded', lastSync: '10 mins ago' },
];

export function Providers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="page-title text-gradient">API Providers</h1>
          <p className="text-sm text-textMuted mt-1">Manage external API integrations and balances.</p>
        </div>
        
        <button className="glass-button" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProviders.map((provider) => (
          <GlassCard key={provider.id} className="flex flex-col relative overflow-hidden">
            {/* Top decorative gradient based on health */}
            <div className={`absolute top-0 left-0 w-full h-1 ${
              provider.health === 'operational' ? 'bg-success' : 
              provider.health === 'down' ? 'bg-danger' : 'bg-warning'
            }`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center">
                  <Server className="w-5 h-5 text-textMuted" />
                </div>
                <div>
                  <h3 className="font-semibold text-textMain">{provider.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      provider.health === 'operational' ? 'bg-success' : 
                      provider.health === 'down' ? 'bg-danger' : 'bg-warning'
                    }`} />
                    <span className="text-xs text-textMuted capitalize">{provider.health}</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={provider.status as any} />
            </div>

            <div className="space-y-4 flex-1">
              <div className="bg-surface/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-textMuted mb-1">API Balance</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-textMain">{provider.balance}</span>
                  <button className="p-1 text-textMuted hover:text-primary transition-colors" title="Refresh Balance">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
              <span className="text-xs text-textMuted">Last sync: {provider.lastSync}</span>
              <button className="glass-button-secondary text-sm px-3 py-1.5">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add API Provider">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">Provider Name</label>
            <input type="text" className="w-full glass-input" placeholder="e.g. UniPin API" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">Base URL</label>
            <input type="url" className="w-full glass-input" placeholder="https://api.provider.com/v1" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">API Key</label>
            <input type="password" className="w-full glass-input" placeholder="••••••••••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1.5">API Secret (Optional)</label>
            <input type="password" className="w-full glass-input" placeholder="••••••••••••••••" />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border mt-6">
            <button type="button" className="glass-button-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="glass-button">Save Provider</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
