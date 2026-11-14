import { useState } from "react";
import { classifyRoseService } from "../models/roseService";

export const useRoseViewModel = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictRose = async (roseData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await classifyRoseService(roseData);
      setPredictionResult(result);
    } catch (err) {
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return {
    predictionResult,
    loading,
    error,
    predictRose,
  };
};