import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Filter, Star, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/constants";

const CATEGORIES = ["All", "Fruits", "Rice", "Seeds", "Others"];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Our Products</h1>
            <p className="text-slate-600">Premium agricultural products delivered from our smart farms to your door.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search products..."
                className="pl-10 rounded-full border-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="rounded-full shrink-0">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-green-600 text-white shadow-lg shadow-green-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-green-600 border-none font-bold">
                    {product.tag}
                  </Badge>
                </div>
                <button className="absolute bottom-4 right-4 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" /> {product.rating}
                  </div>
                </div>
                <p className="text-slate-500 text-sm mb-4">{product.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                  <div className="flex items-center gap-2">
                    <Button render={<Link to={`/promo-generator?productId=${product.id}`} />} variant="ghost" size="icon-sm" className="text-slate-400 hover:text-green-600" title="Generate Promo Video">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-green-600 p-0 h-auto font-bold text-sm">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
            <Button variant="link" onClick={() => { setActiveCategory("All"); setSearchQuery(""); }} className="text-green-600">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
