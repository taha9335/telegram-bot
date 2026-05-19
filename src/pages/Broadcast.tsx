import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Send, Users, Image as ImageIcon } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

export function Broadcast() {
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('all');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="page-title text-gradient">Broadcast Messages</h1>
        <p className="text-sm text-textMuted mt-1">Send announcements to Telegram bot users.</p>
      </div>

      <GlassCard className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Target Audience</label>
          <div className="flex gap-4">
            <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
              target === 'all' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border text-textMuted hover:bg-surfaceHover'
            }`}>
              <input 
                type="radio" 
                name="target" 
                value="all" 
                checked={target === 'all'} 
                onChange={() => setTarget('all')}
                className="hidden" 
              />
              <Users className="w-4 h-4" />
              <span className="font-medium">All Users (12,450)</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
              target === 'active' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border text-textMuted hover:bg-surfaceHover'
            }`}>
              <input 
                type="radio" 
                name="target" 
                value="active" 
                checked={target === 'active'} 
                onChange={() => setTarget('active')}
                className="hidden" 
              />
              <Users className="w-4 h-4" />
              <span className="font-medium">Active (24h)</span>
            </label>
            <label className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
              target === 'specific' ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border text-textMuted hover:bg-surfaceHover'
            }`}>
              <input 
                type="radio" 
                name="target" 
                value="specific" 
                checked={target === 'specific'} 
                onChange={() => setTarget('specific')}
                className="hidden" 
              />
              <Users className="w-4 h-4" />
              <span className="font-medium">Specific Users</span>
            </label>
          </div>
        </div>

        {target === 'specific' && (
          <div>
            <label className="block text-sm font-medium text-textMuted mb-2">User IDs (comma separated)</label>
            <input type="text" className="w-full glass-input" placeholder="12345678, 87654321" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-textMuted mb-2">Message Content</label>
          <div className="relative">
            <textarea 
              className="w-full glass-input min-h-[200px] resize-none pb-12"
              placeholder="Type your message here. Markdown is supported."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="absolute bottom-3 left-3 flex gap-2">
              <button className="p-2 rounded bg-surface border border-border text-textMuted hover:text-textMain transition-colors" title="Attach Image">
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-3 right-3 text-xs text-textMuted">
              {message.length} characters
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <button 
            className="glass-button" 
            disabled={!message.trim()}
            onClick={() => setIsConfirmOpen(true)}
          >
            <Send className="w-4 h-4" />
            Send Broadcast
          </button>
        </div>
      </GlassCard>

      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Confirm Broadcast">
        <div className="space-y-4">
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <p className="text-sm text-warning font-medium">You are about to send a message to {target === 'all' ? '12,450 users' : target === 'active' ? '842 active users' : 'selected users'}.</p>
          </div>
          
          <div>
            <p className="text-xs text-textMuted mb-1">Message Preview:</p>
            <div className="p-4 bg-surface border border-border rounded-lg whitespace-pre-wrap text-sm text-textMain max-h-[200px] overflow-y-auto">
              {message}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border mt-6">
            <button className="glass-button-secondary" onClick={() => setIsConfirmOpen(false)}>Cancel</button>
            <button className="glass-button bg-primary shadow-primary/20" onClick={() => {
              setIsConfirmOpen(false);
              setMessage('');
              // Success toast would go here
            }}>
              Confirm & Send
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
