import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase.js";

const DeleteStudentScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) {
      Alert.alert("Please enter a roll number to search.");
      return;
    }

    try {
      const studentQuery = query(
        collection(db, "users"),
        where("rollNumber", "==", searchQuery)
      );
      const studentSnapshot = await getDocs(studentQuery);

      if (studentSnapshot.empty) {
        setSearchResults([]);
        Alert.alert("No students found with that roll number.");
      } else {
        const results = studentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error searching students:", error);
      Alert.alert("An error occurred while searching. Please try again.");
    }
  };

  const handleDeleteStudent = async (studentId) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "users", studentId));
              Alert.alert("Student deleted successfully.");
              setSearchResults(
                searchResults.filter((result) => result.id !== studentId)
              );
            } catch (error) {
              console.error("Error deleting student:", error);
              Alert.alert(
                "An error occurred while deleting. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Student by Roll Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Roll Number"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultItemText}>
                {`Full Name: ${item.fullName}\nRoll Number: ${item.rollNumber}`}
              </Text>
              <TouchableOpacity
                onPress={() => handleDeleteStudent(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: "#333333",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultItem: {
    marginTop:20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  resultItemText: {
    fontSize: 18,
    color: "#333333",
  },
  deleteButton: {
    backgroundColor: "#ff7f50",
    paddingVertical: 10,
    margin: 20,
    alignSelf: "center",
    padding: 20,
    borderRadius: 20,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeleteStudentScreen;
