import type { ClassificationResult, UploadState } from "../types";
import { classificationApi } from "../services/api";
import { create } from "zustand";
import axios from "axios";

interface ClassificationState {
  uploadState: UploadState;

  currentResult: ClassificationResult | null;
  isLoading: boolean;
  error: string | null;

  history: ClassificationResult[];

  // actions
  setFile: (file: File | null) => void;
  classify: (file: File) => Promise<void>;
  clearHistory: () => void;
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
      if (file) {
        const preview = URL.createObjectURL(file);
        set({
          uploadState: { file, preview, isUploading: false },
          error: null,
          currentResult: null,
        });
      } else {
        // Cleanup preview URL
        const { uploadState } = get();
        if (uploadState.preview) {
          URL.revokeObjectURL(uploadState.preview);
        }
        set({
          uploadState: { file: null, preview: null, isUploading: false },
        });
      }
    },

    classify: async (file) => {
      set({ isLoading: true, error: null });

      try {
        const result = await classificationApi.classify(file);

        // Update history
        const { history } = get();
        const newHistory = [result, ...history].slice(0, 10);
        localStorage.setItem(
          "classification-history",
          JSON.stringify(newHistory)
        );

        set({
          currentResult: result,
          isLoading: false,
          history: newHistory,
        });
      } catch (error) {
        let errorMessage = "Classification failed";

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 413) {
            errorMessage = "File too large (max 10MB)";
          } else if (error.response?.status === 400) {
            errorMessage = "Invalid file format";
          } else if (error.code === "ECONNREFUSED") {
            errorMessage = "Service unavailable - please try again";
          } else {
            errorMessage = error.response?.data?.message || error.message;
          }
        }

        set({
          error: errorMessage,
          isLoading: false,
        });
      }
    },

    clearHistory: () => {
      localStorage.removeItem("classification-history");
      set({ history: [] });
    },
    clearError: () => set({ error: null }),
  })
);
