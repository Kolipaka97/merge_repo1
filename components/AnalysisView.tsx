import React from 'react';
import { MarketResearchResult, AnalysisStage } from '../types';
import { ExternalLink, BrainCircuit, Zap, Globe, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  stage: AnalysisStage;
  quickScanResult: string | null;
  marketData: MarketResearchResult | null;
  deepAnalysisReport: string | null;
}

export const AnalysisView: React.FC<Props> = ({ stage, quickScanResult, marketData, deepAnalysisReport }) => {
  
  const isThinking = stage === AnalysisStage.DEEP_THINKING;

  if (stage === AnalysisStage.IDLE) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
        <BrainCircuit className="w-16 h-16 mb-4 text-slate-300" />
        <h3 className="text-xl font-semibold text-slate-600">Ready to Analyze</h3>
        <p className="max-w-md mt-2">Submit your project details to start the multi-stage AI feasibility study.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pr-2 pb-10">
      
      {/* 1. Quick Scan Section */}
      {(quickScanResult || stage === AnalysisStage.QUICK_SCAN) && (
        <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5 shadow-sm transition-all duration-500 ${stage === AnalysisStage.QUICK_SCAN ? 'animate-pulse' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h3 className="font-semibold text-slate-800">Initial AI Impression</h3>
          </div>
          <p className="text-slate-700 leading-relaxed font-medium">
            {quickScanResult || "Scanning project parameters..."}
          </p>
        </div>
      )}

      {/* 2. Market Context Section */}
      {(marketData || stage === AnalysisStage.MARKET_RESEARCH) && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-slate-800">Market Analysis</h3>
          </div>
          
          {!marketData ? (
             <div className="flex items-center gap-3 text-slate-500 text-sm">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 border-t-emerald-500 animate-spin"></div>
                Analyzing market trends...
             </div>
          ) : (
            <div>
              <div className="prose prose-sm prose-slate mb-4 text-slate-600">
                {marketData.summary}
              </div>
              {marketData.sources.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {marketData.sources.slice(0, 4).map((source, idx) => (
                    source.web && (
                      <a 
                        key={idx}
                        href={source.web.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-600 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate max-w-[150px]">{source.web.title}</span>
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 3. Deep Analysis Section */}
      {(deepAnalysisReport || stage === AnalysisStage.DEEP_THINKING || stage === AnalysisStage.COMPLETE) && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md relative overflow-hidden">
          {/* Thinking Indicator */}
          {isThinking && (
             <div className="absolute top-0 left-0 w-full h-1 bg-indigo-100">
               <div className="h-full bg-indigo-500 animate-progress-indeterminate"></div>
             </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BrainCircuit className={`w-6 h-6 ${isThinking ? 'text-indigo-600 animate-pulse' : 'text-indigo-600'}`} />
              <h3 className="font-bold text-lg text-slate-800">
                {isThinking ? "Thinking Deeply..." : "Comprehensive Feasibility Report"}
              </h3>
            </div>
            {stage === AnalysisStage.COMPLETE && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Completed
              </span>
            )}
          </div>

          {!deepAnalysisReport ? (
             <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 relative mb-4">
                  <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-600 font-medium">Analyzing feasibility...</p>
                <p className="text-slate-400 text-sm mt-1 max-w-xs">
                  Generating detailed insights using Gemma 3.
                </p>
             </div>
          ) : (
            <div className="prose prose-slate prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg max-w-none text-slate-700">
              {/* Simple Markdown Rendering via whitespace pre-wrap for now */}
              <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {deepAnalysisReport.split('**').map((part, i) => 
                  i % 2 === 1 ? <span key={i} className="font-bold text-slate-900">{part}</span> : part
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {stage === AnalysisStage.ERROR && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-700">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <p>An error occurred during the analysis. Please check your API key configuration.</p>
        </div>
      )}
    </div>
  );
};