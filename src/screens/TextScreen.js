import React from 'react';

import { StyleSheet, Text, View, Button,TextInput} from 'react-native';
import { useState } from 'react';

export default function TextScreen() {

    const[name,setName]=useState('');

    

  return (
    <View >
 
      <Text>
          Enter Name:
      </Text>
      <TextInput
      style={styles.inputStyle}
      autoCapitalize='none'
      autoCorrect={false}
      value={name}
      onChangeText={newValue=>setName(newValue)}

      
      />
      <Text>
       Written Text name is: {name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    
    margin:15,
    borderColor:'black',
    borderWidth:2
    
  },
  
});