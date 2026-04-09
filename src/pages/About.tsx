import { motion } from "motion/react";
import { BRAND } from "@/constants";
import { CheckCircle2, Users, Target, Award } from "lucide-react";

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
          >
            Our Story & Vision
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Founded with a passion for agriculture and a drive for innovation, Jahid Agro Ltd is transforming the landscape of farming in Bangladesh.
          </p>
        </div>

        {/* Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1200"
                alt="Our Farm"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-green-600 text-white p-8 rounded-3xl hidden md:block">
              <div className="text-4xl font-bold mb-1">10+</div>
              <div className="text-sm font-medium opacity-80 uppercase tracking-wider">Years of Excellence</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Rooted in Tradition, Growing with Tech</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Jahid Agro Ltd began as a small family initiative focused on high-quality fruit cultivation. Over the years, we realized that the future of food security lies at the intersection of traditional wisdom and modern technology.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Today, we manage hundreds of acres of smart farms, producing premium Kashmiri Apple Ber, Guavas, and organic rice varieties that are celebrated across the country for their taste and nutritional value.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Users, label: "500+ Farmers Empowered" },
                { icon: Target, label: "Zero Waste Mission" },
                { icon: Award, label: "Certified Organic" },
                { icon: CheckCircle2, label: "Quality Guaranteed" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">The principles that guide every seed we plant and every harvest we share.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Sustainability",
                desc: "We use smart irrigation and organic fertilizers to protect our soil and water resources for future generations."
              },
              {
                title: "Innovation",
                desc: "From CNN-based disease detection to IoT sensors, we embrace the latest tech to optimize every aspect of farming."
              },
              {
                title: "Transparency",
                desc: "We believe in a clear path from our farm to your table. Our processes are open, honest, and traceable."
              }
            ].map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-green-600 font-bold text-2xl">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
