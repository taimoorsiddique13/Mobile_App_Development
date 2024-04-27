import { StyleSheet, View, Button, Text, FlatList } from "react-native";
import React, { useState } from "react";

export default function ColorScreen() {
  const [colors, setColor] = useState([]);

  const randomRGB = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red},${green},${blue})`;
  };

  const randomHeight = () => {
    return Math.floor(Math.random() * 256);
  };

  const randomWidth = () => {
    return Math.floor(Math.random() * 256);
  };
  const randomPosition = () => {
    return Math.floor(Math.random() * 100);
  };

  const handleButtonClick = () => {
    setColor([
      ...colors,
      { color: randomRGB(), height: randomHeight(), width: randomWidth(),position:randomPosition() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generate Random Colors and Dimensions</Text>
      <Button title="Click me" onPress={handleButtonClick} />
      <View>
        <FlatList
       
          data={colors}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: item.color,
                width: item.width,
                height: item.height,
                margin:item.position,
                
              }}
            ></View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  
  
});