import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signIn = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === email && userData.password === password) {
          console.log("User successfully signed in");
          setError(null); 
          setEmail(''); 
          setPassword(''); 
          navigation.navigate('Landing Screen');
          return; 
        } else {
          setError("Incorrect email or password");
        }
      });
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Error signing in. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={signIn} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp Screen')} style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // White background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333', // Title text color
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#f0f0f0', // Light gray input background color
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#333333', // Text color
    fontSize: 16,
    alignSelf: 'center',
  },
  submitButton: {
    backgroundColor: '#ff7f50', // Orange submit button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  submitText: {
    color: '#ffffff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1, // Ensure it's above other elements
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'center',
  },
  signupButton: {
    backgroundColor: '#2e2e2e', // Dark background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
  signupText: {
    color: '#ffffff', // White text color
    fontSize: 16,
  },
});

export default LoginScreen;
