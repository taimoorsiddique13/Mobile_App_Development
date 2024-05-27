import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export default function AdditionalInfoScreen({ route, navigation }) {
  const { userID } = route.params;
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");

  function saveAdditionalInfo() {
    setDoc(doc(db, "users", userID), {
      fullName,
      fatherName,
      age,
      userId: userID,
    })
      .then(() => {
        Alert.alert("Information Saved!");
        navigation.navigate("NextScreen", { userID });
      })
      .catch((error) => {
        console.log("Error adding document: ", error);
        Alert.alert("Error saving information. Please try again.");
      });
  }

  return (
    <View behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Father's Name"
          value={fatherName}
          onChangeText={(text) => setFatherName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          value={age}
          onChangeText={(text) => setAge(text)}
          style={styles.input}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={saveAdditionalInfo} style={styles.button}>
          <Text style={styles.buttonText}>Save Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
});
