import { Home, Info, ShoppingBasket, Cpu, Mail } from "lucide-react";

export const NAV_LINKS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Us", href: "/about", icon: Info },
  { name: "Products", href: "/products", icon: ShoppingBasket },
  { name: "Tech Hub", href: "/tech-hub", icon: Cpu },
  { name: "Contact", href: "/contact", icon: Mail },
];

export const BRAND = {
  name: "Jahid Agro Ltd",
  tagline: "Pioneering Tech-Driven Agriculture in Bangladesh",
  description: "From Kashmiri Apple Ber to IoT-based smart irrigation, we are redefining the future of farming.",
  email: "info@jahidagro.com",
  phone: "+880 1XXX-XXXXXX",
  address: "Dhaka, Bangladesh",
  socials: {
    facebook: "https://facebook.com/jahidagro",
    youtube: "https://youtube.com/@jahidagro",
    whatsapp: "https://wa.me/8801XXXXXXXXX",
  }
};

export const PRODUCTS = [
  {
    id: 1,
    name: "Kashmiri Apple Ber",
    category: "Fruits",
    price: "৳250/kg",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1615485245453-9f23d5bb0a99?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Thai Guava (Seedless)",
    category: "Fruits",
    price: "৳180/kg",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1536511110591-7758a940337d?auto=format&fit=crop&q=80&w=800",
    tag: "Organic"
  },
  {
    id: 3,
    name: "Chinigura Rice",
    category: "Rice",
    price: "৳140/kg",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    tag: "Premium"
  },
  {
    id: 4,
    name: "Hybrid Tomato Seeds",
    category: "Seeds",
    price: "৳450/pack",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=800",
    tag: "High Yield"
  },
  {
    id: 5,
    name: "Organic Honey",
    category: "Others",
    price: "৳850/kg",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800",
    tag: "Pure"
  },
  {
    id: 6,
    name: "Red Chili Powder",
    category: "Others",
    price: "৳320/kg",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=800",
    tag: "Spicy"
  }
];
