import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";


const LandingScreen1 = ({ navigation,route }) => {

  const { email } = route.params;

  const handleLogout = () => {
    navigation.navigate("Home");
  };

  const handleEditPassword = () => {
      navigation.navigate("EditPasswordScreen", { email });
 
  };

   const handleAddInfo = () => {
     navigation.navigate("AddInfoScreen", { email });
   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>

      <TouchableOpacity onPress={handleEditPassword} style={styles.button}>
        <Text style={styles.buttonText}>Edit Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddInfo} style={styles.button}>
        <Text style={styles.buttonText}>Edit Information</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
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

export default LandingScreen1;
