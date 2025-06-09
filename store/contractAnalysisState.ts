import { ContractAnalysis } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// Adjust import path

interface ContractAnalysisState {
  // Current analysis
  currentAnalysis: ContractAnalysis | null;
  analysisId: string | null;
  isLoading: boolean;
  error: string | null;

  // Analysis history
  recentAnalyses: Array<{
    id: string;
    title: string;
    date: string;
    type: string;
  }>;

  // Actions
  setCurrentAnalysis: (analysis: ContractAnalysis) => void;
  setAnalysisId: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearAnalysis: () => void;
  addToHistory: (analysis: { id: string; title: string; type: string }) => void;
}

export const useContractAnalysisStore = create<ContractAnalysisState>()(
  persist(
    (set) => ({
      // Initial state
      currentAnalysis: null,
      analysisId: null,
      isLoading: false,
      error: null,
      recentAnalyses: [],

      // Actions
      setCurrentAnalysis: (analysis) =>
        set({ currentAnalysis: analysis, error: null }),

      setAnalysisId: (id) => set({ analysisId: id }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error, isLoading: false }),

      clearAnalysis: () =>
        set({
          currentAnalysis: null,
          analysisId: null,
          error: null,
          isLoading: false,
        }),

      addToHistory: (analysis) =>
        set((state) => ({
          recentAnalyses: [
            {
              ...analysis,
              date: new Date().toISOString(),
            },
            ...state.recentAnalyses.slice(0, 9), // Keep last 10
          ],
        })),
    }),
    {
      name: "contract-analysis-storage", // localStorage key
      partialize: (state) => ({
        // Only persist these fields
        recentAnalyses: state.recentAnalyses,
        analysisId: state.analysisId,
      }),
    }
  )
);
