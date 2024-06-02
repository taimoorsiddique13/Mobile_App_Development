import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase.js";

const AddInfoScreen = ({ navigation, route }) => {
  const { email } = route.params;

  const [rollNumber, setRollNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userQuery = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0].data();
          setRollNumber(userDoc.rollNumber || "");
          setAge(userDoc.age || "");
          setGender(userDoc.gender || "");
          setFullName(userDoc.fullName || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("Error loading user information.");
      }
    };

    fetchUserData();
  }, [email]); 

  const handleAddInfo = async () => {
    if (!rollNumber || !age || !gender || !fullName) {
      Alert.alert("Please fill in all fields.");
      return;
    }

    try {
      // Check if the roll number is unique
      const rollNumberQuery = query(
        collection(db, "users"),
        where("rollNumber", "==", rollNumber)
      );
      const rollNumberSnapshot = await getDocs(rollNumberQuery);

      if (
        !rollNumberSnapshot.empty &&
        rollNumberSnapshot.docs[0].data().email !== email
      ) {
        Alert.alert("This roll number is already in use by another user.");
        return;
      }

      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        Alert.alert("User not found.");
        return;
      }

      const userDoc = userSnapshot.docs[0];
      await updateDoc(doc(db, "users", userDoc.id), {
        rollNumber,
        age,
        gender,
        fullName,
      });

      Alert.alert("Information updated successfully.");

      // Clear the fields after successful update
      setRollNumber("");
      setAge("");
      setGender("");
      setFullName("");
    } catch (error) {
      console.error("Error adding information:", error);
      Alert.alert(
        "An error occurred while updating information. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Your Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={(text) => setRollNumber(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        keyboardType="numeric"
        onChangeText={(text) => setAge(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={(text) => setGender(text)}
      />

      <TouchableOpacity onPress={handleAddInfo} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Landing Screen1", { email })}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Go Back</Text>
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
  button: {
    backgroundColor: "#ff7f50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddInfoScreen;
