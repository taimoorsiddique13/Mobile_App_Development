import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const UserDetailsScreen = ({ navigation, route }) => {
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Details</Text>

      <Text style={styles.info}>Full Name: {user.fullName}</Text>
      <Text style={styles.info}>Roll Number: {user.rollNumber}</Text>
      <Text style={styles.info}>Age: {user.age}</Text>
      <Text style={styles.info}>Gender: {user.gender}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("UserSearchScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back to Search</Text>
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
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff7f50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserDetailsScreen;
