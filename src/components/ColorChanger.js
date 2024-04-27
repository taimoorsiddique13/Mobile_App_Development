import React from 'react';
import {Text, View, Button } from 'react-native';

export default function ColorChanger(props) {
  return (
    <View>
      <Text>
        {props.color}
      </Text>
      <Button
        title='Increase'
        onPress={() => props.onIncrease()}
        color='blue'
      />
      <Button
        title='Decrease'
        onPress={() => props.onDecrease()}
        color='blue' 
      />
    </View>
  );
}



