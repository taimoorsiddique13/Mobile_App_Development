import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

export default function CounterScreen() {
    const button1Text = "Increase";
    const button2Text = "Decrease";
    const [counter, setCounter] = useState(0);
    return (
        <View style ={styles.container}>
            <Button
                title={button1Text}
                onPress={()=>
                setCounter(counter + 1)
                }
            />

            <Text>{counter}</Text>

            <Button 
                title={button2Text}
                onPress={() => setCounter(counter - 1)
                }
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height:'100%',
    },
    


})
