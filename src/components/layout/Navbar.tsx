import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, BRAND } from "@/constants";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-green-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className={cn(
            "font-bold text-xl tracking-tight transition-colors",
            scrolled ? "text-slate-900" : "text-slate-900" // Always dark for readability on light bg sections
          )}>
            {BRAND.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-green-600",
                location.pathname === link.href ? "text-green-600" : "text-slate-600"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6">
            Get Started
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 text-lg font-medium p-2 rounded-lg transition-colors",
                  location.pathname === link.href ? "bg-green-50 text-green-600" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full mt-2">
              Get Started
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
