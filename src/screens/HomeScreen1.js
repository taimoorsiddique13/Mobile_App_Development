import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { db } from "./firebase";
import { collection, addDoc, getDocs, query } from "firebase/firestore";

export default function HomeScreen1() {
  const [todos, setTodos] = useState([]);
  const [cities, setCities] = useState([]);
  const [retrievedData, setRetrievedData] = useState([]);
  const [showTodos, setShowTodos] = useState(true);


  const getTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
      setShowTodos(true);
      setRetrievedData([]);
    } catch (error) {
      console.error(error);
    }
  };

 const getCities = async () => {
   try {
     const citiesTemp = [];
     const API_KEY = "5b85388ae53b92e46291683ac01b16e7"; 
     const cityListResponse = await axios.get(
       `https://api.openweathermap.org/data/2.5/find?lat=10&lon=0&cnt=50&appid=${API_KEY}&units=metric`
     );

     await Promise.all(
       cityListResponse.data.list.map(async (cityData) => {
         const cityWeatherResponse = await axios.get(
           `https://api.openweathermap.org/data/2.5/weather?id=${cityData.id}&appid=${API_KEY}&units=metric`
         );
         const temp = cityWeatherResponse.data.main.temp;
         if (temp >= 10 && temp <= 35) {
           citiesTemp.push({ title: cityData.name, temperature: temp });
         }
       })
     );

     const newTodos = todos.map((todo, index) => ({
       ...todo,
       title: citiesTemp[index % citiesTemp.length]?.title || todo.title,
     }));

     setCities(citiesTemp);
     setTodos(newTodos);
   } catch (error) {
     console.error(error);
   }
 };




  const saveToFirestore = async () => {
    try {
      await addDoc(collection(db, "todosAndCities"), {
        todos,
        cities,
      });
      Alert.alert("Success", "Data saved successfully!", [{ text: "OK" }]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save data!", [{ text: "OK" }]);
    }
  };

  const retrieveFromFirestore = async () => {
    try {
      const q = query(collection(db, "todosAndCities"));
      const querySnapshot = await getDocs(q);

      const retrievedData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        retrievedData.push(data);
      });
      setRetrievedData(retrievedData);
      setShowTodos(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to retrieve data!", [{ text: "OK" }]);
    }
  };

  const renderButton = (title, onPress) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {showTodos && (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Title: {item.title}</Text>
              <Text>UserID: {item.userId}</Text>
              <Text>Completed: {item.completed ? "Yes" : "No"}</Text>
            </View>
          )}
          ListHeaderComponent={<Text style={styles.header}>Todos</Text>}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {!showTodos && (
        <FlatList
          data={retrievedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.retrievedDataCard}>
              <Text style={styles.retrievedDataTitle}>Retrieved Data:</Text>
              <Text style={styles.retrievedDataContent}>
                {JSON.stringify(item)}
              </Text>
            </View>
          )}
          ListHeaderComponent={
            <Text style={styles.header}>Retrieved Data</Text>
          }
          contentContainerStyle={styles.listContainer}
        />
      )}

      {renderButton("Get Todos", getTodos)}
      {renderButton("Replace Titles with Cities", getCities)}
      {renderButton("Save to Firestore", saveToFirestore)}
      {renderButton("Retrieve from Firestore", retrieveFromFirestore)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  retrievedDataCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  retrievedDataTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  retrievedDataContent: {
    fontSize: 14,
  },
});
