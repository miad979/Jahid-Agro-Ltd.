import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND } from "@/constants";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Info */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-8"
            >
              Let's Grow <br /> Together
            </motion.h1>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed">
              Have questions about our products, technology, or partnership opportunities? Our team is here to help you.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email Us", value: BRAND.email },
                { icon: Phone, label: "Call Us", value: BRAND.phone },
                { icon: MapPin, label: "Visit Us", value: BRAND.address },
                { icon: MessageCircle, label: "WhatsApp", value: "Instant Sales Support" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition-all">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-slate-900">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-slate-100 border border-slate-50"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="h-14 rounded-2xl border-slate-100 bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                  <Input placeholder="john@example.com" className="h-14 rounded-2xl border-slate-100 bg-slate-50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                <Input placeholder="Inquiry about Kashmiri Apple Ber" className="h-14 rounded-2xl border-slate-100 bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  className="w-full min-h-[150px] p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all"
                ></textarea>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-2xl text-lg font-bold shadow-lg shadow-green-200">
                Send Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
