import { History as HistoryIcon, FileImage, Clock, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useClassificationStore } from "../stores/classificationStore";

export const History = () => {
  const { history, clearHistory } = useClassificationStore();

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (history.length === 0) {
    return (
      <Card className="opacity-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Recent Classifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Your classification history will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Recent Classifications
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((result, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <FileImage className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium truncate">
                    {result.filename}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {result.predictions[0]?.confidence.toFixed(0)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="truncate">
                    {result.predictions[0]?.label}
                  </span>
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  <span className="flex-shrink-0">
                    {formatTimeAgo(result.processedAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
