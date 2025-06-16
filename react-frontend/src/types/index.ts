export interface Prediction {
  label: string;
  confidence: number;
}

export interface ClassificationResult {
  filename: string;
  predictions: Prediction[];
  processedAt: string;
  processingTimeMs: number;
}

export interface UploadState {
  file: File | null;
  preview: string | null;
  isUploading: boolean;
}
