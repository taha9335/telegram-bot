import React from 'react';
import { GlassCard } from './GlassCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  header: string;
  accessorKey?: string;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pagination?: boolean;
}

export function DataTable<T>({ columns, data, pagination = true }: DataTableProps<T>) {
  return (
    <GlassCard className="w-full overflow-hidden" noPadding>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 text-sm font-medium text-textMuted uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-surface/30 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-sm text-textMain whitespace-nowrap">
                    {col.cell ? col.cell(item) : col.accessorKey ? ((item as any)[col.accessorKey] as React.ReactNode) : null}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-textMuted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && data.length > 0 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-surface/30">
          <span className="text-sm text-textMuted">
            Showing 1 to {data.length} of {data.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-border hover:bg-surface disabled:opacity-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg border border-border bg-primary text-white">
              1
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-surface disabled:opacity-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
