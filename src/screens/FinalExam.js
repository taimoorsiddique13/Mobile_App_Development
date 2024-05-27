import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function FinalExam({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FINAL LAB EXAM</Text>
      <Text style={styles.name}>TAIMOOR UL HASSAN</Text>
      <Text style={styles.regNo}>SP21-BSE-083</Text>
      <Text style={styles.welcomeText}>
        Welcome to the application. Please login or signup to continue.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate("SignInScreen")}
          color="#4CAF50"
        />
        <Button
          title="Signup"
          onPress={() => navigation.navigate("LabAssignment4")}
          color="#2196F3"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2196F3",
  },
  regNo: {
    fontSize: 14,
    marginBottom: 20,
    color: "#4CAF50",
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
