import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';
import ResultList from '../components/ResultList';

const SearchScreen=()=> {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const searchApi = async () => {
    const response = await yelp.get('/search', {
      params: {
        limit: 50,
        term,
        location: 'New York',
      }
    });
    setResults(response.data.businesses);
  };

  const filterByPrice = (price) => {
    return results.filter(result => result.price === price);
  };

  return (
    <View>
      <Text>Welcome to Search Screen</Text>
      <SearchBar
        term={term}
        onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={searchApi}
      />
      <Text>We found {results.length} results</Text>
      <ResultList results={filterByPrice('$')} title="Cost Effective:" />
      <ResultList results={filterByPrice('$$')} title="Bit Pricier:" />
      <ResultList results={filterByPrice('$$$')} title="Big Spender:" />
      <ResultList results={filterByPrice('$$$$')} title="Mohid Jesy Bachy:" />
    </View>
  );
};

const styles = StyleSheet.create({
  results: {
    fontWeight: 'bold',
  }
});

export default SearchScreen;
