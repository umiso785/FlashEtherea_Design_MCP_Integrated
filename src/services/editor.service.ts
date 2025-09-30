import { apiFetch } from "./api";

export interface PredictRequest { code: string; }
export interface PredictResponse { output: string; }
export interface ExplainResponse { explanation: string; }

export const EditorService = {
  async predict(payload: PredictRequest): Promise<PredictResponse> {
    return apiFetch<PredictResponse>("/predict", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async explain(code: string): Promise<ExplainResponse> {
    return apiFetch<ExplainResponse>("/explain", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
  },
};