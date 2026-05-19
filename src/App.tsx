import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Orders } from './pages/Orders';
import { Users } from './pages/Users';
import { Products } from './pages/Products';
import { Providers } from './pages/Providers';
import { Deposits } from './pages/Deposits';
import { Transactions } from './pages/Transactions';
import { Broadcast } from './pages/Broadcast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="providers" element={<Providers />} />
          <Route path="deposits" element={<Deposits />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="broadcast" element={<Broadcast />} />
          <Route path="settings" element={<div className="text-textMain">Settings Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
