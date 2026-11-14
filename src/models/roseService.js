const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const classifyRoseService = async (roseData) => {
  try {
    const response = await fetch(`${API_URL}/api/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roseData),
    });

    if (!response.ok) {
      throw new Error("Error al conectar con el servidor de IA");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};