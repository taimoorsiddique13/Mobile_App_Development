import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";
import { StackActions } from "@react-navigation/native"; 
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "./firebase.js";

export default function FirstScreen({ navigation }) {
 useEffect(()=>{
  setTimeout(()=>{ auth.onAuthStateChanged((user) => {
    const routeName = user !== null ? "MainScreen" : "classwork";
    navigation.dispatch(StackActions.replace(routeName));
  })
},3000);
 


 },[]);

 

  return (
    <View style={styles.container}>
      <Text>Welcome to First Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
