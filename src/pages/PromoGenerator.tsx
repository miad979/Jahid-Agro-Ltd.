import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PRODUCTS } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Video, Wand2, Download, Loader2, AlertCircle, ArrowLeft, Key } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function PromoGenerator() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const product = PRODUCTS.find(p => p.id === Number(productId));

  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio?.hasSelectedApiKey) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const generatePromo = async () => {
    if (!product) return;
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setProgress(5);
    setStatus("Generating creative prompt...");

    try {
      // 1. Generate a creative prompt using Gemini Flash
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const promptResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert cinematographer and marketing director. Create a highly detailed, cinematic video generation prompt for a 5-second promotional video for this product: ${product.name}. 
        Product Category: ${product.category}. 
        Product Context: ${product.tag}.
        
        The prompt should describe:
        1. Lighting: Soft morning sunlight, golden hour, or professional studio lighting.
        2. Camera Movement: Slow tracking shot, macro zoom, or elegant pan.
        3. Environment: Lush, vibrant Bangladeshi farmlands, dew on leaves, or a clean modern kitchen.
        4. Atmosphere: Premium, organic, fresh, and tech-forward.
        
        Output ONLY the final prompt text for the video model, no other commentary or labels.`
      });

      const videoPrompt = promptResponse.text.trim();
      setProgress(20);
      setStatus("Initializing video generation (Veo)...");

      // 2. Generate video using Veo
      // Create a new instance to ensure it uses the selected key if applicable
      const veoAi = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY! });
      
      let operation = await veoAi.models.generateVideos({
        model: 'veo-3.1-lite-generate-preview',
        prompt: videoPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setProgress(35);
      setStatus("Rendering video... This may take a few minutes.");

      // 3. Poll for completion
      let pollCount = 0;
      while (!operation.done) {
        pollCount++;
        // Simulate progress during polling
        const simulatedProgress = Math.min(35 + (pollCount * 5), 90);
        setProgress(simulatedProgress);
        
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await veoAi.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) throw new Error("Video generation failed - no download link received.");

      setProgress(95);
      setStatus("Fetching final video...");

      // 4. Fetch the video with the API key in headers
      const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY!;
      const videoResponse = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': apiKey,
        },
      });

      if (!videoResponse.ok) throw new Error("Failed to fetch generated video.");

      const videoBlob = await videoResponse.blob();
      const localUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(localUrl);
      setProgress(100);
      setStatus("Success! Your promo is ready.");
    } catch (err: any) {
      console.error("Promo generation error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setError("API Key session expired. Please re-select your key.");
        setHasApiKey(false);
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (!product) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button render={<Link to="/products" />}>Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link to="/products" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Info */}
          <Card className="lg:col-span-1 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <CardContent className="p-6">
              <Badge className="mb-2 bg-green-100 text-green-700 border-none">{product.category}</Badge>
              <h2 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h2>
              <p className="text-slate-500 text-sm">{product.tag}</p>
            </CardContent>
          </Card>

          {/* Generator UI */}
          <Card className="lg:col-span-2 border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 bg-white">
            <CardHeader className="px-0 pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white">
                  <Video className="w-5 h-5" />
                </div>
                <CardTitle className="text-2xl">AI Promo Generator</CardTitle>
              </div>
              <CardDescription>
                Create a cinematic 5-second promotional video for {product.name} using our advanced Veo AI model.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 space-y-8">
              {!hasApiKey ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-center bg-slate-50">
                  <Key className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-bold text-slate-900 mb-2">Paid API Key Required</h3>
                  <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                    Video generation requires a paid Gemini API key. Please select your key to continue.
                    <br />
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline mt-2 inline-block">
                      Learn about billing
                    </a>
                  </p>
                  <Button onClick={handleSelectKey} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8">
                    Select API Key
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {videoUrl ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="aspect-video rounded-[2rem] overflow-hidden bg-black shadow-2xl">
                        <video src={videoUrl} controls autoPlay loop className="w-full h-full" />
                      </div>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => {
                            const a = document.createElement('a');
                            a.href = videoUrl;
                            a.download = `${product.name.replace(/\s+/g, '_')}_promo.mp4`;
                            a.click();
                          }}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl h-12"
                        >
                          <Download className="w-4 h-4 mr-2" /> Download Video
                        </Button>
                        <Button
                          variant="outline"
                          onClick={generatePromo}
                          className="flex-1 rounded-xl h-12 border-slate-200"
                        >
                          <Wand2 className="w-4 h-4 mr-2" /> Regenerate
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="aspect-video rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center p-8 text-center overflow-hidden relative">
                      {isGenerating ? (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-6 p-12">
                          <div className="w-full space-y-4">
                            <Skeleton className="h-4 w-3/4 mx-auto rounded-full" />
                            <Skeleton className="h-4 w-1/2 mx-auto rounded-full" />
                            <Skeleton className="h-4 w-2/3 mx-auto rounded-full" />
                          </div>
                          
                          <div className="w-full max-w-sm space-y-4">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                              <span>{status}</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>

                          <div className="flex items-center gap-2 text-green-600 font-medium animate-pulse">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">AI is crafting your cinematic promo...</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Video className="w-12 h-12 text-slate-300 mb-4" />
                          <p className="text-slate-500 font-medium mb-6">
                            Ready to generate a professional promo for <br />
                            <span className="text-slate-900 font-bold">{product.name}</span>
                          </p>
                          <Button
                            onClick={generatePromo}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-10 h-14 text-lg shadow-lg shadow-green-200"
                          >
                            <Wand2 className="w-5 h-5 mr-2" /> Generate Video
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="bg-slate-50 p-6 rounded-2xl">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                  <Wand2 className="w-4 h-4 text-green-600" /> How it works
                </h4>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li>• We use <strong>Gemini 3 Flash</strong> to analyze your product and write a creative script.</li>
                  <li>• Our <strong>Veo AI</strong> model then generates a high-definition 5-second video.</li>
                  <li>• The process is fully automated and optimized for social media marketing.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
