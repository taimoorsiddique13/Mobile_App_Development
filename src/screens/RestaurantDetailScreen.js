import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import axios from "axios";

const RestaurantDetailScreen = ({ route }) => {
  const { restaurant } = route.params;
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${restaurant.coordinates.latitude}&lon=${restaurant.coordinates.longitude}&units=metric&appid=5b85388ae53b92e46291683ac01b16e7`);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [restaurant]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Restaurant Details</Text>
      <Image style={styles.image} source={{ uri: restaurant.image_url }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
        <Text style={styles.price}>Price: {restaurant.price}</Text>
        <Text style={styles.distance}>Distance: {restaurant.distance.toFixed(2)} meters</Text>
        {weather && (
          <Text style={styles.weather}>Weather: {weather.weather[0].description}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  rating: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  distance: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  weather: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
});

export default RestaurantDetailScreen;
