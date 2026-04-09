import { motion } from "motion/react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Play, ShieldCheck, TrendingUp, Zap, Share2, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { BRAND } from "@/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
    alt: "Lush Green Landscapes"
  },
  {
    url: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000",
    alt: "Organic Vegetable Cultivation"
  },
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000",
    alt: "Smart Agriculture Technology"
  },
  {
    url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=2000",
    alt: "Premium Fruit Harvest"
  }
];

export default function Home() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleShare = async (product: any, index: number) => {
    const shareData = {
      title: product.name,
      text: product.desc,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${product.name}: ${product.desc} - ${window.location.href}`);
        setCopiedId(index);
        setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Helmet>
        <title>Jahid Agro Ltd | Pioneering Smart Farming in Bangladesh</title>
        <meta 
          name="description" 
          content="Jahid Agro Ltd is a leader in tech-driven agriculture in Bangladesh, specializing in premium organic Kashmiri Apple Ber, Guavas, and smart farming solutions." 
        />
        <meta 
          name="keywords" 
          content="Jahid Agro Ltd, smart farming Bangladesh, organic farming, Kashmiri Apple Ber, Thai Guava, IoT agriculture, sustainable farming Bangladesh, premium agro products" 
        />
        <meta property="og:title" content="Jahid Agro Ltd | Pioneering Smart Farming in Bangladesh" />
        <meta property="og:description" content="Modernizing agriculture in Bangladesh with smart solutions and premium organic produce." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Carousel
            opts={{
              loop: true,
            }}
            className="w-full h-full"
          >
            <CarouselContent className="h-screen ml-0">
              {HERO_IMAGES.map((image, index) => (
                <CarouselItem key={index} className="pl-0 h-screen relative">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover opacity-40"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900"></div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-24 right-12 flex gap-2 z-20">
              <CarouselPrevious className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
              <CarouselNext className="static translate-y-0 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </Carousel>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md border border-green-500/30">
              The Future of Farming
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-[1.1]">
              Cultivating Excellence <br />
              <span className="text-green-500">Through Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {BRAND.description} Join us in our mission to modernize agriculture in Bangladesh with smart solutions and premium organic produce.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button render={<Link to="/products" />} size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-14 text-lg border-none">
                Explore Products <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Play className="mr-2 w-5 h-5 fill-current" /> Watch Farm Tour
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Floating Badges */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 z-10">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <ShieldCheck className="w-6 h-6 text-green-500" /> 100% Organic
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <Zap className="w-6 h-6 text-green-500" /> Smart Tech
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <TrendingUp className="w-6 h-6 text-green-500" /> High Yield
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Seasonal Harvest</h2>
              <p className="text-slate-600 max-w-xl">
                Our premium selection of fruits and grains, grown with precision and care using advanced agricultural techniques.
              </p>
            </div>
            <Button variant="link" render={<Link to="/products" />} className="text-green-600 font-bold p-0 h-auto">
              View All Products <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kashmiri Apple Ber",
                image: "https://images.unsplash.com/photo-1615485245453-9f23d5bb0a99?auto=format&fit=crop&q=80&w=800",
                desc: "Sweet, crunchy, and packed with nutrients. Our signature fruit."
              },
              {
                name: "Premium Thai Guava",
                image: "https://images.unsplash.com/photo-1536511110591-7758a940337d?auto=format&fit=crop&q=80&w=800",
                desc: "Large, seedless, and incredibly refreshing varieties."
              },
              {
                name: "Aromatic Chinigura Rice",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
                desc: "Traditional premium rice grown with modern organic standards."
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6 bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-600">
                      Featured
                    </span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(product, i);
                      }}
                      className="bg-white/90 backdrop-blur-sm border-none text-slate-600 hover:text-green-600 rounded-full shadow-sm"
                    >
                      {copiedId === i ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Hub Teaser */}
      <section className="py-24 px-6 bg-green-600 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M0,60 Q25,10 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Smart Farming for a <br /> Sustainable Future
            </h2>
            <p className="text-green-100 text-lg mb-10 leading-relaxed">
              We don't just farm; we innovate. Our fields are equipped with IoT sensors, automated irrigation, and AI-driven monitoring systems to ensure maximum quality and minimal waste.
            </p>
            <div className="space-y-6 mb-10">
              {[
                "Real-time Soil Health Monitoring",
                "Automated Precision Irrigation",
                "AI-Powered Pest & Disease Detection",
                "Satellite Crop Yield Prediction"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
            <Button render={<Link to="/tech-hub" />} size="lg" className="bg-white text-green-600 hover:bg-green-50 rounded-full px-8">
              Explore Our Innovation Hub
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-green-500/30 backdrop-blur-sm border border-green-400/30 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">98%</div>
                <div className="text-green-100 uppercase tracking-widest text-sm font-bold">Efficiency Increase</div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
