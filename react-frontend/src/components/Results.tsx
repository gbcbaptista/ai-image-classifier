import { Trophy, Clock, FileImage } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useClassificationStore } from "../stores/classificationStore";

export const Results = () => {
  const { currentResult, isLoading } = useClassificationStore();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            <span className="text-lg">Analyzing image...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentResult) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            Upload an image to see classification results
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Classification Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Top 3 Predictions */}
        <div className="space-y-3">
          {currentResult.predictions.slice(0, 3).map((prediction, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    #{index + 1}
                  </Badge>
                  <span className="font-medium text-sm sm:text-base">
                    {prediction.label}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {prediction.confidence.toFixed(2)}%
                </span>
              </div>
              <Progress value={prediction.confidence} className="h-2" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            <span>{currentResult.filename}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Processed in {currentResult.processingTimeMs}ms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
