import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Image') }}>
        <Text style={styles.textStyle}>Image Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Counter') }}>
        <Text style={styles.textStyle}>Counter Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Text') }}>
        <Text style={styles.textStyle}>Text Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Flat') }}>
        <Text style={styles.textStyle}>Flat Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Color') }}>
        <Text style={styles.textStyle}>Color Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Square') }}>
        <Text style={styles.textStyle}>Square Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Assignment 1') }}>
        <Text style={styles.textStyle}>Assignment 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Assignment 2') }}>
        <Text style={styles.textStyle}>Assignment 2</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Assignment 3') }}>
        <Text style={styles.textStyle}>Assignment 3</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Search Screen 1') }}>
        <Text style={styles.textStyle}>Search Screen 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Weather Screen') }}>
        <Text style={styles.textStyle}>Weather Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Lab Mid Exam') }}>
        <Text style={styles.textStyle}>Lab Mid Exam</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.viewStyle} onPress={() => { navigation.navigate('Login Screen') }}>
        <Text style={styles.textStyle}>Main App</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    margin: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    width: 200,
    padding: 15,
  },
  textStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});
