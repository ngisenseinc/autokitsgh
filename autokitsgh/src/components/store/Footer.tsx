import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-black/5 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-3xl flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                <span className="text-text-main font-display font-bold text-xl">AK</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-xl leading-none tracking-tight">Auto Kits GH</h2>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Premium Parts</p>
              </div>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Ghana's premier destination for luxury car aesthetics, spec bumpers, grilles, body kits, and performance parts.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><Link to="/category/body-kits" className="hover:text-primary transition-colors">Body Kits & Bumpers</Link></li>
              <li><Link to="/category/performance" className="hover:text-primary transition-colors">Performance Parts</Link></li>
              <li><Link to="/category/lighting" className="hover:text-primary transition-colors">Lighting & LEDs</Link></li>
              <li><Link to="/category/interior" className="hover:text-primary transition-colors">Interior Accessories</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3 text-sm text-text-muted">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns Policy</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Spintex Road, Accra<br />Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+233 54 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sales@autokitsgh.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Auto Kits GH. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
