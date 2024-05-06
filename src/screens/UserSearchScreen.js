import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";

const UserSearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!searchQuery) {
      Alert.alert("Please enter a name to search.");
      return;
    }

    try {
      const userQuery = query(
        collection(db, "users"),
        where("fullName", "==", searchQuery)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        setSearchResults([]);
        Alert.alert("No users found with that name.");
      } else {
        const results = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error searching users:", error);
      Alert.alert("An error occurred while searching. Please try again.");
    }
  };

  const handleUserSelect = (user) => {
    navigation.navigate("UserDetailsScreen", { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Users</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
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
            <TouchableOpacity
              onPress={() => handleUserSelect(item)}
              style={styles.resultItem}
            >
              <Text style={styles.resultItemText}>{item.fullName}</Text>
            </TouchableOpacity>
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
});

export default UserSearchScreen;
