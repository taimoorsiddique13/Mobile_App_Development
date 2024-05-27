import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "./firebase";
import { db } from "./firebase";
import { StackActions } from "@react-navigation/native";

export default function NextScreen({ route, navigation }) {
  const { userID } = route.params;
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "users"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        setFullName(docData.fullName || "");
        setFatherName(docData.fatherName || "");
        setAge(docData.age || "");
      } else {
        console.log("No document found with the specified UserId.");
      }
    };

    if (auth.currentUser) {
      fetchData();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>User ID: {auth.currentUser.uid}</Text>
      <Text style={styles.text}>Full Name: {fullName}</Text>
      <Text style={styles.text}>Father's Name: {fatherName}</Text>
      <Text style={styles.text}>Age: {age}</Text>
      <TouchableOpacity
        onPress={async () => {
          await auth.signOut();
          navigation.dispatch(StackActions.replace("SignInScreen"));
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontSize: 10,
    color: "#333",
    marginVertical: 10,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

