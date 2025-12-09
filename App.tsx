import React, { useState } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { AnalysisView } from './components/AnalysisView';
import { ProjectInput, MarketResearchResult, AnalysisStage } from './types';
import { runQuickScan, runMarketResearch, runDeepAnalysis } from './services/geminiService';
import { Activity } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<AnalysisStage>(AnalysisStage.IDLE);
  const [quickScanResult, setQuickScanResult] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketResearchResult | null>(null);
  const [deepAnalysisReport, setDeepAnalysisReport] = useState<string | null>(null);

  const handleAnalysisStart = async (input: ProjectInput) => {
    setStage(AnalysisStage.QUICK_SCAN);
    setQuickScanResult(null);
    setMarketData(null);
    setDeepAnalysisReport(null);

    try {
      // Step 1: Quick Scan (Parallel with next step start ideally, but sequential for clear UI flow here)
      const scanRes = await runQuickScan(input);
      setQuickScanResult(scanRes);
      
      // Step 2: Market Research
      setStage(AnalysisStage.MARKET_RESEARCH);
      const marketRes = await runMarketResearch(input);
      setMarketData(marketRes);

      // Step 3: Deep Analysis (Thinking)
      setStage(AnalysisStage.DEEP_THINKING);
      // We pass the market summary to the deep thinker
      const deepRes = await runDeepAnalysis(input, marketRes.summary);
      setDeepAnalysisReport(deepRes);

      setStage(AnalysisStage.COMPLETE);

    } catch (error) {
      console.error(error);
      setStage(AnalysisStage.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Activity className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              Feasibly<span className="text-indigo-600">.AI</span>
            </h1>
          </div>
          <div className="text-sm text-slate-500 font-medium hidden sm:block">
            Powered by Gemma 3 27b
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)]">
          
          {/* Left Panel: Input */}
          <div className="lg:col-span-4 h-full">
            <ProjectForm 
              onSubmit={handleAnalysisStart} 
              isLoading={stage !== AnalysisStage.IDLE && stage !== AnalysisStage.COMPLETE && stage !== AnalysisStage.ERROR} 
            />
          </div>

          {/* Right Panel: Output */}
          <div className="lg:col-span-8 h-full bg-slate-50 rounded-2xl">
            <AnalysisView 
              stage={stage}
              quickScanResult={quickScanResult}
              marketData={marketData}
              deepAnalysisReport={deepAnalysisReport}
            />
          </div>
        </div>
      </main>
      
      {/* CSS for custom progress animation */}
      <style>{`
        @keyframes progress-indeterminate {
          0% { left: -100%; width: 100%; }
          100% { left: 100%; width: 10%; }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s infinite linear;
          position: absolute;
          top: 0;
          bottom: 0;
        }
      `}</style>
    </div>
  );
}