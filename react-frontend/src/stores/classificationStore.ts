import { create } from "zustand";
import type { ClassificationResult, UploadState } from "../types";

interface ClassificationState {
  uploadState: UploadState;

  currentResult: ClassificationResult | null;
  isLoading: boolean;
  error: string | null;

  history: ClassificationResult[];

  // actions
  setFile: (file: File | null) => void;
  classify: (file: File) => Promise<void>;
  clearError: () => void;
}

export const useClassificationStore = create<ClassificationState>(
  (set, get) => ({
    uploadState: {
      file: null,
      preview: null,
      isUploading: false,
    },
    currentResult: null,
    isLoading: false,
    error: null,
    history: [],

    // actions
    setFile: (file) => {
      // TODO
    },

    classify: async (file) => {
      // TODO
    },

    clearError: () => set({ error: null }),
  })
);
