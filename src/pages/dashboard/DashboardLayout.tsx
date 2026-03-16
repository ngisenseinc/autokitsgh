import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingCart, Bell, Settings, LogOut, Menu, X, FileText } from 'lucide-react';

const SIDEBAR_ITEMS = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', path: '/dashboard/inventory', icon: Package },
  { name: 'Orders', path: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Purchase Orders', path: '/dashboard/purchase-orders', icon: FileText },
  { name: 'Alerts', path: '/dashboard/alerts', icon: Bell, badge: 3 },
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-surface border-r border-black/5 flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen overflow-hidden"
      >
        <div className="p-6 flex items-center gap-4 h-20 border-b border-black/5">
          <div className="w-10 h-10 bg-primary rounded-3xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            <span className="text-text-main font-display font-bold text-xl">AK</span>
          </div>
          {isSidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
              <h1 className="font-display font-bold text-lg leading-none tracking-tight">Auto Kits GH</h1>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Seller Portal</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-3xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary text-white shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                    : 'text-text-muted hover:bg-black/5 hover:text-text-main'
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-text-main' : 'group-hover:text-primary'}`} />
                {isSidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap flex-1">
                    {item.name}
                  </motion.span>
                )}
                {isSidebarOpen && item.badge && (
                  <motion.span 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5">
          <button className="flex items-center gap-4 px-4 py-3 rounded-full text-text-muted hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 w-full group">
            <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-500" />
            {isSidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap">
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-surface/50 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-black/5 rounded-full transition-colors hidden md:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-display font-bold">
              {SIDEBAR_ITEMS.find(item => item.path === location.pathname)?.name || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-text-muted hover:text-primary transition-colors hidden sm:block">
              View Storefront
            </Link>
            <div className="w-10 h-10 rounded-full bg-surface-light border border-black/10 flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" className="w-full h-full" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
