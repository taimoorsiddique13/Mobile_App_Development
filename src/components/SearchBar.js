import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SearchBar(props) {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleTermChange = (term) => {
    if (props.onTermChange) {
      props.onTermChange(term);
    }
  };

  const handleTermSubmit = () => {
    if (props.onTermSubmit) {
      props.onTermSubmit();
    }
  };

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={() => setIsInputVisible(!isInputVisible)}>
        <Feather name="search" style={styles.iconStyle} />
      </TouchableOpacity>
      {isInputVisible && (
        <TextInput
          style={styles.inputStyle}
          placeholder="Search"
          onBlur={() => setIsInputVisible(false)}
          value={props.term}
          onChangeText={handleTermChange}
          onSubmitEditing={handleTermSubmit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#CCCCCC',
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
  },
  iconStyle: {
    fontSize: 35,
    marginHorizontal: 20,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 5,
    marginRight: 20,
  },
});
