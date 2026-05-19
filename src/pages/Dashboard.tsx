import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { GlassCard } from '../components/ui/GlassCard';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Users, ShoppingCart, DollarSign, Server, Activity } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const revenueData = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 6890 },
  { name: 'Sat', value: 8390 },
  { name: 'Sun', value: 7490 },
];

const orderStatusData = [
  { name: 'Pending', value: 45, fill: '#f59e0b' },
  { name: 'Processing', value: 120, fill: '#3b82f6' },
  { name: 'Completed', value: 450, fill: '#10b981' },
  { name: 'Failed', value: 15, fill: '#ef4444' },
];

const recentOrders = [
  { id: 'ORD-001', user: 'Ali Khan', product: 'PUBG UC (60)', amount: 'PKR 300', status: 'completed' as const },
  { id: 'ORD-002', user: 'Zain Ahmed', product: 'Free Fire (100)', amount: 'PKR 250', status: 'processing' as const },
  { id: 'ORD-003', user: 'Hamza', product: 'Valorant (475)', amount: 'PKR 1400', status: 'pending' as const },
  { id: 'ORD-004', user: 'Usman', product: 'MLBB (86)', amount: 'PKR 450', status: 'completed' as const },
  { id: 'ORD-005', user: 'Bilal', product: 'Steam ($10)', amount: 'PKR 3000', status: 'failed' as const },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title text-gradient">Dashboard Overview</h1>
        <p className="text-sm text-textMuted mt-1">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,450" icon={Users} trend={{ value: 12, isPositive: true }} iconBackground="linear-gradient(135deg, #6366f1, #8b5cf6)" />
        <StatCard title="Total Orders" value="45,231" icon={ShoppingCart} trend={{ value: 8, isPositive: true }} iconBackground="linear-gradient(135deg, #3b82f6, #06b6d4)" />
        <StatCard title="Revenue (PKR)" value="2.4M" icon={DollarSign} trend={{ value: 15, isPositive: true }} iconBackground="linear-gradient(135deg, #10b981, #059669)" />
        <StatCard title="Active Providers" value="4/5" icon={Server} iconBackground="linear-gradient(135deg, #f59e0b, #ef4444)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="col-span-1 lg:col-span-2 flex flex-col min-h-[400px]">
          <h2 className="text-xl font-bold text-white mb-6">Revenue Overview <span className="text-textMuted text-sm font-normal ml-2">(Last 7 Days)</span></h2>
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(99,102,241,0.3)"/>
                    <stop offset="95%" stopColor="rgba(99,102,241,0)"/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="col-span-1 flex flex-col min-h-[400px]">
          <h2 className="text-xl font-bold text-white mb-6">Orders by Status</h2>
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderStatusData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Recent Orders</h2>
          <DataTable 
            columns={[
              { header: 'Order ID', accessorKey: 'id' },
              { header: 'User', accessorKey: 'user' },
              { header: 'Product', accessorKey: 'product' },
              { header: 'Amount', accessorKey: 'amount' },
              { header: 'Status', cell: (row) => <StatusBadge status={row.status} /> },
            ]}
            data={recentOrders}
            pagination={false}
          />
        </div>
        
        <div className="col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Live Activity</h2>
          <GlassCard className="h-[380px] overflow-y-auto custom-scrollbar p-6">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`flex gap-4 items-start p-4 rounded-xl border border-white/5 backdrop-blur-md bg-white/5 border-l-[3px] ${i % 2 === 0 ? 'border-l-emerald-500' : 'border-l-[#6366f1]'}`}>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10 shadow-inner">
                    <Activity className={`w-5 h-5 ${i % 2 === 0 ? 'text-emerald-400' : 'text-[#6366f1]'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-white">New order received for <span className="font-semibold text-blue-400">PUBG UC</span></p>
                    <p className="text-xs text-textMuted mt-1">2 mins ago • User ID: 98234</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
