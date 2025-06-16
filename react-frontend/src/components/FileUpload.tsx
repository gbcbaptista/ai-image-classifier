import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useClassificationStore } from "../stores/classificationStore";

export const FileUpload = () => {
  const { uploadState, setFile, classify, isLoading, error, clearError } =
    useClassificationStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const handleClassify = () => {
    if (uploadState.file) {
      classify(uploadState.file);
    }
  };

  const handleClear = () => {
    setFile(null);
    clearError();
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Upload Area */}
        {!uploadState.file ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50"
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop image here" : "Upload Image"}
            </h3>
            <p className="text-muted-foreground text-sm">
              Drag & drop an image here, or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Supports: PNG, JPG, JPEG, GIF, WebP (max 10MB)
            </p>
          </div>
        ) : (
          /* Image Preview */
          <div className="space-y-4">
            <div className="relative">
              <img
                src={uploadState.preview!}
                alt="Preview"
                className="w-full h-48 sm:h-64 object-cover rounded-lg"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleClassify}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    Classify Image
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </Card>
  );
};
