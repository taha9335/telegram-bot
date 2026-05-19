import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background relative z-0">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-10 overflow-x-hidden relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
