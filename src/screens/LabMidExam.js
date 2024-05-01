import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import yelp from "../api/yelp";

const LabMidExam = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await yelp.get("/search", {
          params: {
            limit: 50,
            location: "Melbourne",
            sort_by: "distance",
          },
        });
        setResults(response.data.businesses);
        setCity(response.data.businesses[0]?.location.city);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const city = "Melbourne"; 
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5b85388ae53b92e46291683ac01b16e7`);
        setWeather(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  const filterRestaurants = () => {
    if (!weather) return results;
    if (weather.weather[0].main === "Clouds") {
      return results.sort((a, b) => {
        const bprice = b.price ? b.price.length : 0;
        const aprice = a.price ? a.price.length : 0;

        return bprice - aprice;
      });
    } else {
      return results;
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRestaurantPress(item)}>
      <View style={styles.result}>
        <Image style={styles.image} source={{ uri: item.image_url }} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate('RestaurantDetailScreen', { restaurant });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>We found {results.length} restaurants in New York</Text>

      <FlatList
        data={filterRestaurants()}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  result: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: width * 0.6,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default LabMidExam;
