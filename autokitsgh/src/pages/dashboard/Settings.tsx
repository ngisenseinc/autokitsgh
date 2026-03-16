import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Store, Bell, Shield, CreditCard } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Details', icon: Store },
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-text-muted mt-1">Manage your store preferences and account settings</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-3xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-text-muted hover:bg-black/5 hover:text-text-main'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="glass-panel p-6 rounded-3xl"
          >
            {activeTab === 'store' && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold border-b border-black/10 pb-4">Store Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Store Name</label>
                    <input 
                      type="text" 
                      defaultValue="Auto Kits GH"
                      className="w-full bg-surface border border-black/10 rounded-full px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="hello@autokitsgh.com"
                      className="w-full bg-surface border border-black/10 rounded-full px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      defaultValue="+233 55 123 4567"
                      className="w-full bg-surface border border-black/10 rounded-full px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Currency</label>
                    <select className="w-full bg-surface border border-black/10 rounded-full px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors appearance-none">
                      <option value="GHS">GHS - Ghanaian Cedi</option>
                      <option value="USD">USD - US Dollar</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-text-muted">Store Address</label>
                    <textarea 
                      rows={3}
                      defaultValue="123 Spintex Road, Accra, Ghana"
                      className="w-full bg-surface border border-black/10 rounded-3xl px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-display font-bold border-b border-black/10 pb-4">Admin Profile</h2>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-surface-light border border-black/10 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Admin" className="w-full h-full" />
                  </div>
                  <button className="px-4 py-2 bg-black/5 hover:bg-black/10 rounded-full text-sm font-medium transition-colors">
                    Change Avatar
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue="Admin User"
                      className="w-full bg-surface border border-black/10 rounded-full px-4 py-3 text-text-main focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-muted">Role</label>
                    <input 
                      type="text" 
                      defaultValue="Super Admin"
                      disabled
                      className="w-full bg-surface/50 border border-black/5 rounded-full px-4 py-3 text-text-muted cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {['notifications', 'security', 'billing'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-text-muted" />
                </div>
                <h3 className="text-xl font-display font-bold mb-2">Coming Soon</h3>
                <p className="text-text-muted max-w-md">
                  This settings module is currently under development and will be available in the next update.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
