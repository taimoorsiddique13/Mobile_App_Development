import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import ColorChanger from '../components/ColorChanger';

export default function SquareScreen1() {
    const [colors, setColors] = useState([0, 0, 0]);

    const colorIncrement = 15;

    const setColor = (index, change) => {
        setColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = Math.min(255, Math.max(0, prevColors[index] + change));
            return newColors;
        });
    };

    return (
        <View>
            <Text>
                Welcome to Square Screen
            </Text>
            <ColorChanger
                color='Red'
                onIncrease={() => {
                    setColor(0, colorIncrement);
                }}
                onDecrease={() => {
                    setColor(0, -1 * colorIncrement);
                }}
            />
            <ColorChanger
                color='Green'
                onIncrease={() => {
                    setColor(1, colorIncrement);
                }}
                onDecrease={() => {
                    setColor(1, -1 * colorIncrement);
                }}
            />
            <ColorChanger
                color='Blue'
                onIncrease={() => {
                    setColor(2, colorIncrement);
                }}
                onDecrease={() => {
                    setColor(2, -1 * colorIncrement);
                }}
            />
            <View style={{ height: 100, width: 100, backgroundColor: `rgb(${colors[0]},${colors[1]},${colors[2]})` }}>

            </View>
        </View>
    );
}


