import { useState, useRef } from "react";
import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, Droplets, LineChart, Camera, Upload, Loader2, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// Simulated IoT Data
const IOT_STATS = [
  { label: "Soil Moisture", value: "42%", status: "Optimal", icon: Droplets, color: "text-blue-500" },
  { label: "Ambient Temp", value: "28°C", status: "Normal", icon: Cpu, color: "text-orange-500" },
  { label: "Nutrient Level", value: "High", status: "Good", icon: Info, color: "text-green-500" },
];

export default function TechHub() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePlant = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const base64Data = selectedImage.split(',')[1];

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Analyze this plant leaf for diseases. Provide the diagnosis, confidence level (0-100), and recommended treatment in a structured JSON format with keys: diagnosis, confidence, treatment, urgency (Low/Medium/High)." },
              { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysisResult({
        diagnosis: "Unable to analyze image. Please try again with a clearer photo.",
        confidence: 0,
        treatment: "N/A",
        urgency: "N/A"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Innovation & Tech Hub</h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Witness the power of technology in agriculture. From real-time IoT monitoring to AI-driven diagnostics, we are building the future of farming.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-12">
          <TabsList className="bg-slate-100 p-1 rounded-full w-full max-w-2xl mx-auto grid grid-cols-3 h-14">
            <TabsTrigger value="dashboard" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
              <LineChart className="w-4 h-4 mr-2" /> IoT Dashboard
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
              <Camera className="w-4 h-4 mr-2" /> AI Diagnostics
            </TabsTrigger>
            <TabsTrigger value="prediction" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold">
              <Cpu className="w-4 h-4 mr-2" /> Yield Prediction
            </TabsTrigger>
          </TabsList>

          {/* IoT Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {IOT_STATS.map((stat, i) => (
                <Card key={i} className="border-none shadow-xl shadow-slate-100 rounded-[2rem]">
                  <CardContent className="pt-8">
                    <div className={`${stat.color} mb-4`}>
                      <stat.icon className="w-10 h-10" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-500 font-medium mb-4">{stat.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wider">{stat.status}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-none shadow-xl shadow-slate-100 rounded-[3rem] overflow-hidden">
              <CardHeader className="bg-slate-50 p-8">
                <CardTitle>Live Smart Irrigation Map</CardTitle>
                <CardDescription>Real-time visualization of water distribution across Sector A-12</CardDescription>
              </CardHeader>
              <CardContent className="p-0 h-[400px] bg-slate-200 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]"></div>
                </div>
                <div className="text-slate-400 flex flex-col items-center gap-4">
                  <Droplets className="w-12 h-12 animate-bounce" />
                  <span className="font-bold uppercase tracking-widest text-sm text-slate-500">Connecting to Field Sensors...</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Diagnostics */}
          <TabsContent value="diagnostics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <Card className="border-none shadow-xl shadow-slate-100 rounded-[3rem] p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl">Plant Disease Detection</CardTitle>
                  <CardDescription>Upload a photo of a plant leaf to get an instant AI diagnosis and treatment plan.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-video rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors overflow-hidden relative"
                  >
                    {selectedImage ? (
                      <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-slate-300 mb-4" />
                        <span className="text-slate-500 font-medium">Click to upload or drag and drop</span>
                        <span className="text-slate-400 text-xs mt-2">Supports JPG, PNG (Max 5MB)</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    onClick={analyzePlant}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-14 rounded-2xl text-lg font-bold"
                  >
                    {isAnalyzing ? (
                      <><Loader2 className="mr-2 w-5 h-5 animate-spin" /> Analyzing...</>
                    ) : (
                      "Start AI Diagnosis"
                    )}
                  </Button>
                </CardContent>
              </Card>

              <AnimatePresence>
                {analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="border-none shadow-xl shadow-green-50 rounded-[3rem] p-8 bg-white border-l-8 border-l-green-600">
                      <CardHeader className="px-0 pt-0">
                        <div className="flex justify-between items-center mb-4">
                          <Badge className={analysisResult.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}>
                            {analysisResult.urgency} Urgency
                          </Badge>
                          <span className="text-sm font-bold text-slate-400">Confidence: {analysisResult.confidence}%</span>
                        </div>
                        <CardTitle className="text-3xl text-slate-900">{analysisResult.diagnosis}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-0 space-y-6">
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600" /> Recommended Treatment
                          </h4>
                          <p className="text-slate-600 leading-relaxed">
                            {analysisResult.treatment}
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-500">
                            Note: This is an AI-generated diagnosis. For critical issues, please consult with our on-field agricultural experts.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>

          {/* Yield Prediction */}
          <TabsContent value="prediction">
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <LineChart className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Crop Yield Prediction</h2>
              <p className="text-slate-600 mb-10 leading-relaxed">
                Using historical data, weather patterns, and satellite imagery, our ML models predict crop yields with 94% accuracy. This helps us optimize harvest times and market distribution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Kashmiri Apple Ber</h4>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-green-600">12.4</span>
                    <span className="text-slate-400 text-sm pb-1">Tons / Acre (Est.)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full w-[85%]"></div>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2">Thai Guava</h4>
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-3xl font-bold text-green-600">8.2</span>
                    <span className="text-slate-400 text-sm pb-1">Tons / Acre (Est.)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-600 h-full w-[72%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
