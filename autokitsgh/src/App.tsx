import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from '@/src/components/store/Navbar';
import { Footer } from '@/src/components/store/Footer';
import { AIAssistant } from '@/src/components/store/AIAssistant';
import MobileNav from '@/src/components/store/MobileNav';
import FacebookPixel from '@/src/components/store/FacebookPixel';
import { Home } from '@/src/pages/store/Home';
import { ProductDetail } from '@/src/pages/store/ProductDetail';
import { DashboardLayout } from '@/src/pages/dashboard/DashboardLayout';
import { Overview } from '@/src/pages/dashboard/Overview';
import { Inventory } from '@/src/pages/dashboard/Inventory';
import { Orders } from '@/src/pages/dashboard/Orders';
import { Alerts } from '@/src/pages/dashboard/Alerts';
import { Settings } from '@/src/pages/dashboard/Settings';
import { PurchaseOrders } from '@/src/pages/dashboard/PurchaseOrders';

function StoreLayout() {
  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AIAssistant />
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <FacebookPixel />
      <Routes>
        {/* Public Storefront */}
        <Route path="/" element={<StoreLayout />}>
          <Route index element={<Home />} />
          <Route path="parts/:id" element={<ProductDetail />} />
          {/* Add more store routes here */}
        </Route>

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          {/* Add more dashboard routes here */}
        </Route>
      </Routes>
    </Router>
  );
}
