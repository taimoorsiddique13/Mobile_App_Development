import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import yelp from '../api/yelp.js';

const SearchScreen1 = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchApi = async () => {
    const response = await yelp.get('/search', {
      params: {
        limit: 35,
        term,
        location: 'New York'
      }
    });
    setResults(response.data.businesses);
  };

  const filterByReviewCount = (count) => {
    return results.filter(results => results.review_count>= count);

  };
    
const filterByRating = (rating) => {
  return results.filter(results=>results.rating===rating);
};






  return(
    <ScrollView style={{ backgroundColor: 'black' }}>
      <View style={styles.searchContainer}>
        <Feather name="search" style={styles.iconStyle} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="gray"
          value={term}
          onChangeText={newTerm => setTerm(newTerm)}
          onSubmitEditing={searchApi}
        />
      </View>
      <Text style={styles.totalResults}>We have found {results.length} restaurants</Text>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Cost Effective</Text>
        <FlatList
          horizontal
          data={filterByRating(4.4)}
          renderItem={({ item }) => (
            <View style={styles.result}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <Text style={styles.resultText}>{item.name} {item.price}</Text>
              <Text style={styles.infoText}>ReviewCount: {item.review_count}</Text>
              <Text style={styles.ratingText}>Rating: {item.rating}</Text>
              <Text style={styles.resultLocation}>{item.location.city}, {item.location.state}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Bit Pricier</Text>
        <FlatList
          horizontal
          data={filterByReviewCount(200)}
          renderItem={({ item }) => (
            <View style={styles.result}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <Text style={styles.resultText}>{item.name} {item.price}</Text>
              <Text style={styles.infoText}>ReviewCount: {item.review_count}</Text>
              <Text style={styles.ratingText}>Rating: {item.rating}</Text>
              <Text style={styles.resultLocation}>{item.location.city}, {item.location.state}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Big Spender</Text>
        <FlatList
          horizontal
          data={filterByReviewCount(900)}
          renderItem={({ item }) => (
            <View style={styles.result}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <Text style={styles.resultText}>{item.name} {item.price}</Text>
              <Text style={styles.infoText}>ReviewCount: {item.review_count}</Text>
              <Text style={styles.ratingText}>Rating: {item.rating}</Text>
              <Text style={styles.resultLocation}>{item.location.city}, {item.location.state}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Burger Bachy</Text>
        <FlatList
          horizontal
          data={filterByRating(3.9)}
          renderItem={({ item }) => (
            <View style={styles.result}>
              <Image style={styles.image} source={{ uri: item.image_url }} />
              <Text style={styles.resultText}>{item.name} {item.price}</Text>
              <Text style={styles.infoText}>ReviewCount: {item.review_count}</Text>
              <Text style={styles.ratingText}>Rating: {item.rating}</Text>
              <Text style={styles.resultLocation}>{item.location.city}, {item.location.state}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
    paddingLeft: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  input: {
    marginLeft: 10,
    color: 'white',
    flex: 1,
  },
  iconStyle: {
    fontSize: 18,
    color: 'white',
  },
  totalResults: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: 'white',
  },
  result: {
    marginLeft: 10,
    marginBottom: 20,
    width: 150,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  resultText: {
    fontSize: 12,
    color: 'white',
  },
  infoText: {
    fontSize: 10,
    color: 'lightgray',
  },
  ratingText: {
    fontSize: 10,
    color: 'red',
  },
  resultLocation: {
    color: 'gray',
  },
});

export default SearchScreen1;
