import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';

export default function StudentForm() {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [studentList, setStudentList] = useState([]);

  const handleSubmit = () => {
    if (name.trim() !== '' && fatherName.trim() !== '' && rollNumber.trim() !== '') {
      const newStudent = { name, fatherName, rollNumber };
      if (!studentList.some(student => student.name === name && student.fatherName === fatherName && student.rollNumber === rollNumber)) {
        setStudentList([...studentList, newStudent]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Father's Name"
        value={fatherName}
        onChangeText={text => setFatherName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Roll Number"
        value={rollNumber}
        onChangeText={text => setRollNumber(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <ScrollView style={styles.listContainer}>
        {studentList.map((student, index) => (
          <Text key={index} style={styles.listItem}>{`${student.name}, ${student.fatherName}, ${student.rollNumber}`}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});
