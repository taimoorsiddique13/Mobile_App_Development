import React from 'react';
import { StyleSheet, Text, View, Button,TextInput,FlatList} from 'react-native';


export default function FlatScreen() {

 
    const friends=[
        {
            name:'Ali',
            age:'19',
            CNIC:'34602-87665209-8'
        },
        {
            name: 'Ahmed',
            age: '20',
            CNIC: '34602-87665209-8'
        }
    ];

  return (
    <FlatList
        data={friends}
        renderItem={({item})=>{

            return(
                <Text style={styles.textStyle}>
                    {item.name} has age of {item.age} years with CNIC {item.CNIC}
                </Text>
            );
        }}
    />
  );
}

const styles = StyleSheet.create({
    textStyle:{
        margin:20,
        fontSize:20,
        color: 'darkred',
    }
 
});
