import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  FlatList,
  Alert,
} from "react-native";

export default function StudentFormScreen() {
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [roll, setRoll] = useState("");
  const [data, setData] = useState([]);

  const addRecord = () => {
    if (!name || !father || !roll) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const isDuplicate = data.some(
      (item) =>
        item.name === name && item.father === father && item.roll === roll
    );

    if (!isDuplicate) {
      setData([
        ...data,
        {
          name: name,
          father: father,
          roll: roll,
        },
      ]);
    } else {
      Alert.alert("Error", "You have entered a duplicate record.");
    }
  };

  const clearRecords = () => {
    setData([]);
  };

  useEffect(() => {
    if (data.length > 0) {
      setName("");
      setFather("");
      setRoll("");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Assignment Number 2</Text>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setName}
          style={styles.input}
          placeholder="Name"
          value={name}
          placeholderTextColor="#9e9e9e"
        />
        <TextInput
          onChangeText={setFather}
          style={styles.input}
          placeholder="Father Name"
          value={father}
          placeholderTextColor="#9e9e9e"
        />
        <TextInput
          onChangeText={setRoll}
          style={styles.input}
          placeholder="Roll Number"
          value={roll}
          placeholderTextColor="#9e9e9e"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={addRecord} title="Add Record" color="#1976D2" />
        <Button onPress={clearRecords} title="Clear Records" color="#FF0000" />
      </View>

      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.recordContainer}>
            <Text style={styles.recordNumber}>Record Number: {index + 1}</Text>
            <Text style={styles.recordDetail}>Name: {item.name}</Text>
            <Text style={styles.recordDetail}>Father Name: {item.father}</Text>
            <Text style={styles.recordDetail}>Roll Number: {item.roll}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1976D2",
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  recordContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  recordNumber: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  recordDetail: {
    marginBottom: 3,
  },
});
