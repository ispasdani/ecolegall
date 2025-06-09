// Contract Analysis Interfaces (existing)
interface Risk {
  risk: string;
  explanation: string;
  severity: "low" | "medium" | "high";
  _id: string;
}

interface Opportunity {
  opportunity: string;
  explanation: string;
  impact: "low" | "medium" | "high";
  _id: string;
}

interface CompensationStructure {
  baseSalary: string;
  bonuses: string;
  equity: string;
  otherBenefits: string;
}

export interface ContractAnalysis {
  userId: string;
  contractText: string;
  risks: Risk[];
  opportunities: Opportunity[];
  summary: string;
  recommendations: string[];
  keyClauses: string[];
  legalCompliance: string;
  negotiationPoints: string[];
  contractDuration: string;
  terminationConditions: string;
  overallScore: number;
  compensationStructure: CompensationStructure;
  performanceMetrics: string[];
  contractType: string;
  intellectualPropertyClauses: string;
  version: number;
  expirationDate: string | null;
  language: string;
  aiModel: string;
  _id: string;
  createdAt: string;
  __v: number;
}

// Document Analysis Interfaces (new)
interface Entity {
  name: string;
  type: string; // person, organization, location, date, etc.
  mentions: number;
  _id: string;
}

interface Insight {
  insight: string;
  importance: "low" | "medium" | "high";
  category: string;
  _id: string;
}

export interface DocumentAnalysis {
  userId: string;
  documentText: string;
  summary: string;
  keyPoints: string[];
  documentType: string;
  sentiment: "positive" | "neutral" | "negative" | "mixed";
  topics: string[];
  entities: Entity[];
  readabilityScore: number | null;
  wordCount: number;
  language: string;
  insights: Insight[];
  actionItems: string[];
  aiModel: string;
  confidence: number; // 0-100
  _id: string;
  createdAt: string;
  __v: number;
}

// Shared Interfaces for both Contract and Document Analysis
export interface FileInfo {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl?: string;
}

export interface AnalysisStatus {
  status: "pending" | "processing" | "completed" | "failed";
  errorMessage?: string;
  analyzedAt?: string;
  creditsUsed: number;
}

// Extended interfaces with file and status info
export interface ContractAnalysisWithMeta extends ContractAnalysis {
  file?: FileInfo;
  status: AnalysisStatus;
  updatedAt: string;
}

export interface DocumentAnalysisWithMeta extends DocumentAnalysis {
  file?: FileInfo;
  status: AnalysisStatus;
  updatedAt: string;
}

// Analysis History Interface
export interface AnalysisHistoryItem {
  _id: string;
  userId: string;
  analysisType: "contract" | "document";
  analysisId: string;
  title: string;
  creditsUsed: number;
  createdAt: string;
}

// Credit Transaction Interface
export interface CreditTransaction {
  _id: string;
  userId: string;
  type: "purchase" | "usage" | "refund" | "bonus";
  amount: number; // positive for credits added, negative for credits used
  balance: number; // balance after transaction
  description: string;
  relatedId?: string; // ID of related analysis, payment, etc.
  createdAt: string;
}

// Request/Response interfaces for API calls
export interface AnalyzeContractRequest {
  contractText?: string;
  file?: File;
  language?: string;
  aiModel?: string;
}

export interface AnalyzeDocumentRequest {
  documentText?: string;
  file?: File;
  language?: string;
  aiModel?: string;
}

export interface AnalysisResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  creditsUsed?: number;
  remainingCredits?: number;
}

// UI State interfaces
export interface AnalysisFormData {
  text: string;
  file: File | null;
  analysisType: "contract" | "document";
}

export interface AnalysisFilter {
  type?: "contract" | "document";
  status?: AnalysisStatus["status"];
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
}

// Dashboard Statistics Interface
export interface DashboardStats {
  totalAnalyses: number;
  contractAnalyses: number;
  documentAnalyses: number;
  creditsUsed: number;
  creditsRemaining: number;
  recentAnalyses: AnalysisHistoryItem[];
  monthlyUsage: {
    month: string;
    contracts: number;
    documents: number;
    credits: number;
  }[];
}
