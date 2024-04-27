import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios'; 

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5b85388ae53b92e46291683ac01b16e7`);
      
      if (response.data) {
        setWeatherData(response.data);
      } else {
        Alert.alert('City not found', 'Please enter a valid city name.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching weather data.');
      console.error(error); 
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Weather App</Text> 
      <View style={styles.searchContainer}>
        <Feather name="search" style={styles.iconStyle} />
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Feels Like: {weatherData.main.feels_like}°C</Text>
          <Text style={styles.weatherText}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.weatherText}>Wind: {weatherData.wind.speed} km/h</Text>
        </View>
      )}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#333',
  },
  input: {
    marginLeft: 10,
    color: 'white',
    flex: 1,
  },
  iconStyle: {
    fontSize: 18,
    color: '#888',
  },
  button: {
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  weatherContainer: {
    elevation: 2,
    backgroundColor: '#333',
    margin: 20,
    borderRadius: 10,
    padding: 15,
  },
  weatherText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WeatherScreen;
