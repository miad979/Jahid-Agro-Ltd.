import { BRAND, NAV_LINKS } from "@/constants";
import { Link } from "react-router-dom";
import { Leaf, Facebook, Youtube, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="bg-green-600 p-1.5 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              {BRAND.name}
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            {BRAND.description}
          </p>
          <div className="flex gap-4">
            <a href={BRAND.socials.facebook} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={BRAND.socials.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href={BRAND.socials.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-green-400 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Products</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/products" className="hover:text-green-400 transition-colors">Kashmiri Apple Ber</Link></li>
            <li><Link to="/products" className="hover:text-green-400 transition-colors">Premium Guavas</Link></li>
            <li><Link to="/products" className="hover:text-green-400 transition-colors">Organic Rice</Link></li>
            <li><Link to="/products" className="hover:text-green-400 transition-colors">High-Yield Seeds</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li>{BRAND.address}</li>
            <li>{BRAND.phone}</li>
            <li>{BRAND.email}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs opacity-50">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}
