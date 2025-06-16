import type { ClassificationResult } from "../types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 30000,
});

export const classificationApi = {
  classify: async (file: File): Promise<ClassificationResult> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<ClassificationResult>(
      "/classification/classify",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  healthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get("/health");
    return response.data;
  },

  mlHealthCheck: async (): Promise<{ status: string }> => {
    const response = await api.get("/classification/health/ml");
    return response.data;
  },
};
