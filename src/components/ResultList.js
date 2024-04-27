import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ResultList(props) {
  return (
    <View>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        horizontal
        data={props.results}
        renderItem={({ item }) => {
          return <Text>{item.name} || </Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title:{
     fontSize: 15,
    fontWeight: 'bold', 
    marginBottom: 5,
  }
});
