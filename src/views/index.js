import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useRoseViewModel } from "../viewmodels/useRoseViewModel";

export default function HomeScreen() {
  const [petalLength, setPetalLength] = useState("");
  const [petalWidth, setPetalWidth] = useState("");
  const [sepalLength, setSepalLength] = useState("");
  const [sepalWidth, setSepalWidth] = useState("");

  const { predictionResult, loading, error, predictRose } = useRoseViewModel();

  const handlePredict = async () => {
    if (!petalLength || !petalWidth || !sepalLength || !sepalWidth) {
      alert("Por favor completa todos los campos");
      return;
    }

    await predictRose({
      petal_length: parseFloat(petalLength),
      petal_width: parseFloat(petalWidth),
      sepal_length: parseFloat(sepalLength),
      sepal_width: parseFloat(sepalWidth),
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clasificador de Rosas 🌹</Text>
      <Text style={styles.subtitle}>Proyecto MVVM + FastAPI + IA</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Longitud de Pétalo (ej. 1.4)" keyboardType="numeric" value={petalLength} onChangeText={setPetalLength} placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Ancho de Pétalo (ej. 0.2)" keyboardType="numeric" value={petalWidth} onChangeText={setPetalWidth} placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Longitud de Sépalo (ej. 5.1)" keyboardType="numeric" value={sepalLength} onChangeText={setSepalLength} placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Ancho de Sépalo (ej. 3.5)" keyboardType="numeric" value={sepalWidth} onChangeText={setSepalWidth} placeholderTextColor="#888" />

        <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Clasificar Rosa</Text>}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      {predictionResult && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Resultado de la IA:</Text>
          <Text style={styles.resultText}>🌹 Variedad: {predictionResult.rose_variety}</Text>
          <Text style={styles.resultText}>📊 Confianza: {predictionResult.confidence}%</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 5, color: "#d9534f" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 25, color: "#666" },
  form: { backgroundColor: "#f9f9f9", padding: 20, borderRadius: 12, borderWidth: 1, borderColor: "#eee" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: "#fff", color: "#333" },
  button: { backgroundColor: "#d9534f", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  error: { color: "red", marginTop: 15, textAlign: "center", fontWeight: "bold" },
  resultBox: { marginTop: 20, padding: 20, backgroundColor: "#f2dede", borderRadius: 8, alignItems: "center", borderWidth: 1, borderColor: "#ebccd1" },
  resultTitle: { fontWeight: "bold", fontSize: 18, color: "#a94442", marginBottom: 8 },
  resultText: { fontSize: 16, color: "#a94442", marginTop: 4 }
});

import { Redirect } from "expo-router";
export default function Page() {
  return <Redirect href="/views" />;
}