export class PredictionDto {
  label: string;
  confidence: number;
}

export class ClassificationResponseDto {
  filename: string;
  predictions: PredictionDto[];
  processedAt: Date;
  processingTimeMs?: number;
}
