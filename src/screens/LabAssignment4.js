import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, createUserWithEmailAndPassword } from "./firebase.js";

export default function LabAssignment4({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed up:", user.uid);
        Alert.alert("User Signed Up!!");
        setEmail("");
        setPassword("");
        navigation.navigate("FinalExam");
      })
      .catch((error) => {
        let errorMessage = "";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email address is already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak.";
            break;
          default:
            errorMessage = "Sign up failed. Please try again later.";
        }
        Alert.alert(errorMessage);
      });
  }

  function signIn() {
    navigation.navigate("SignInScreen");
  }

  return (
    <View behavior="padding" style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text onPress={signIn}>Already a User? Sign In</Text>
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
    backgroundColor: "#2196F3",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
});
