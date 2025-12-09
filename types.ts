export interface ProjectInput {
  name: string;
  description: string;
  industry: string;
  budget: string;
  timeline: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface MarketResearchResult {
  summary: string;
  sources: GroundingChunk[];
}

export interface FeasibilityReport {
  executiveSummary: string;
  marketFeasibility: string;
  technicalFeasibility: string;
  financialProjections: string;
  riskAssessment: string;
  overallScore: number; // 0-100
}

export enum AnalysisStage {
  IDLE = 'IDLE',
  QUICK_SCAN = 'QUICK_SCAN',
  MARKET_RESEARCH = 'MARKET_RESEARCH',
  DEEP_THINKING = 'DEEP_THINKING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
