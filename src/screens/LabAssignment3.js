import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { db } from "./firebase.js";
import {
  collection,
  setDoc,
  doc,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const LabAssignment3 = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      Alert.alert("Email address already exists");
      return;
    }

    try {
      
      const newUserRef = await addDoc(collection(db, "users"), {
        email,
        password,
      });

      console.log("User signed up successfully");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      
 
      navigation.navigate("Landing Screen1",{email});

    } catch (error) {
      console.log("Error signing up:", error);
      Alert.alert("Error signing up. Please try again later.");
    }
  };


  const checkIfEmailExists = async (email) => {
    try {
      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        Alert.alert("Email address already exists");
        return true;
      }
      return false;
    } catch (error) {
      console.log("Error checking email:", error);
      return false;
    }
  };

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={signUp} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login Screen")}
        style={styles.returnButton}
      >
        <Text style={styles.returnText}>Return to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "#333333",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  returnButton: {
    backgroundColor: "#2e2e2e",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  returnText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default LabAssignment3;
