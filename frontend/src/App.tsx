import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Subscription from './pages/Subscription';
import Transactions from './pages/Transactions';
import PlaceholderPage from './pages/PlaceholderPage';
import MainLayout from './layouts/MainLayout';
import './App.css';

// Wrapper para animações de rota (simples fade-in)
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Login />} />

      {/* Rotas Autenticadas */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/chat" element={<PlaceholderPage title="IA Consultor" />} />
        <Route path="/goals" element={<PlaceholderPage title="Metas" />} />
        <Route path="/automations" element={<PlaceholderPage title="Automações" />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
