import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from './firebase.js';
import { collection, setDoc, doc, getDoc } from "firebase/firestore";

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    setDoc(doc(collection(db, "users")), {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      console.log("User signed up successfully");
      // Clear input fields after signup
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }).catch(error => {
      console.log("Error signing up:", error);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={name}
        onChangeText={text => setName(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={signUp} style={styles.submitButton}>
        <Text style={styles.submitText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login Screen')} style={styles.returnButton}>
        <Text style={styles.returnText}>Return to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333', // Title text color
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
  },
  submitButton: {
    backgroundColor: '#ff7f50', // Orange submit button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  submitText: {
    color: '#ffffff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  returnButton: {
    backgroundColor: '#2e2e2e', // Dark background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  returnText: {
    color: '#ffffff', // White text color
    fontSize: 16,
  },
});

export default SignUpScreen;
