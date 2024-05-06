import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, updateDoc,getDoc,doc } from 'firebase/firestore';
import { db } from './firebase.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

function getAlldata() {
  getDocs(collection(db, "users")).then((docSnap) => {
    let users = [];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    console.log(users);
  });
}

function update(){
  updateDoc(doc(db, "users", "1Ex4p8oa72BDXitBeKXr"),{
    password:password,
    email:email,

  }).then(()=>{
    console.log('data updated');
  }).catch((err)=>{
    console.log(err);
  })
}


const getDatawithID = () => {
  getDoc(doc(db, "users", "1Ex4p8oa72BDXitBeKXr"))
    .then((docData) => {
      console.log(docData);
      if (docData.exists()) {
        setPassword(docData.data().password);
        setEmail(docData.data().email);
      } else {
        console.log("no such data exists");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
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
          navigation.navigate('Landing Screen1',{email});
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
      <TouchableOpacity onPress={() => navigation.navigate('LabAssignment3')} style={styles.signupButton}>
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
