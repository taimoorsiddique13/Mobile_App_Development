import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LandingScreen = ({ navigation }) => {

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:20,
    color: '#333333', 
  },
  button: {
    backgroundColor: '#ff7f50', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
