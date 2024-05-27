import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackActions } from "@react-navigation/native";
import { auth } from "./firebase";

export default function MainScreen({navigation}) {


  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser.email}</Text>
      <Text>Email: {auth.currentUser.uid}</Text>
      <TouchableOpacity onPress={async()=>{await auth.signOut();
        navigation.dispatch(StackActions.replace("FirstScreen"));
      }}>
        <Text>SignOut</Text>
      </TouchableOpacity>
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
