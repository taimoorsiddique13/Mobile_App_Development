import { NavigationContainer  } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen"
import ImageScreen from "./src/screens/ImageScreen"
import CounterScreen from "./src/screens/CounterScreen"
import TextScreen from  "./src/screens/TextScreen"
import FlatScreen from "./src/screens/FlatScreen";
import ColorScreen from "./src/screens/ColorScreen"
import SquareScreen1 from "./src/screens/SquareScreen1"
import SquareScreen from "./src/screens/SquareScreen";
import SearchScreen from "./src/screens/SearchScreen";
import SearchScreen1 from "./src/screens/SearchScreen1";
import StudentFormScreen from "./src/screens/StudentFormScreen";
import WeatherScreen from "./src/screens/WeatherScreen";
import LabMidExam from "./src/screens/LabMidExam";
import RestaurantDetailScreen from "./src/screens/RestaurantDetailScreen";
import SignupScreen from "./src/screens/SignupScreen";
import LoginScreen from "./src/screens/LoginScreen";
import LandingScreen from "./src/screens/LandingScreen";
import LabAssignment3 from"./src/screens/LabAssignment3";
import LandingScreen1 from "./src/screens/LandingScreen1";
import EditPasswordScreen from "./src/screens/EditPasswordScreen";
import AddInfoScreen from "./src/screens/AddInfoScreen";
import UserSearchScreen from "./src/screens/UserSearchScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import DeleteStudentScreen from "./src/screens/DeleteStudentScreen";

const Stack=createNativeStackNavigator();

export default function App(){
        
        return(
                <NavigationContainer>
                  <Stack.Navigator>
                  <Stack.Screen name="Home" component={HomeScreen}/>
                  <Stack.Screen name="Image" component={ImageScreen}/>
                  <Stack.Screen name="Counter" component={CounterScreen}/>
                  <Stack.Screen name="Text" component={TextScreen}/>
                  <Stack.Screen name="Flat" component={FlatScreen}/>
                  <Stack.Screen name="Color" component={ColorScreen}/>
                  <Stack.Screen name="Square" component={SquareScreen}/>
                  <Stack.Screen name="Assignment 1" component={SearchScreen}/>
                  <Stack.Screen name="Assignment 2" component={StudentFormScreen}/>
                  <Stack.Screen name="Assignment 3" component={SquareScreen1}/>
                  <Stack.Screen name="Search Screen 1" component={SearchScreen1}/>
                  <Stack.Screen name="Weather Screen" component={WeatherScreen}/>
                  <Stack.Screen name="Lab Mid Exam" component={LabMidExam}/>
                  <Stack.Screen name="RestaurantDetailScreen" component={RestaurantDetailScreen} />
                  <Stack.Screen name="SignUp Screen" component={SignupScreen} />
                  <Stack.Screen name="Login Screen" component={LoginScreen} />
                  <Stack.Screen name="Landing Screen" component={LandingScreen} />
                  <Stack.Screen name="LabAssignment3" component={LabAssignment3}/>
                  <Stack.Screen name="Landing Screen1" component={LandingScreen1} />
                  <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
                  <Stack.Screen name="AddInfoScreen" component={AddInfoScreen} />
                  <Stack.Screen name="UserSearchScreen" component={UserSearchScreen} />
                  <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
                  <Stack.Screen name="DeleteStudentScreen" component={DeleteStudentScreen} />
                  
                  </Stack.Navigator>
                </NavigationContainer>
              );

}




/*
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const flexDirections = ['row', 'row-reverse', 'column', 'column-reverse'];
  const justifyContents = [
    'flex-start',
    'flex-end',
    'center',
    'space-between',
    'space-around',
    'space-evenly',
  ];
  const alignItemsArr = [
    'flex-start',
    'flex-end',
    'center',
    'stretch',
    'baseline',
  ];
  const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
  const directions = ['inherit', 'ltr', 'rtl'];
  const [flexDirection, setFlexDirection] = useState(0);
  const [justifyContent, setJustifyContent] = useState(0);
  const [alignItems, setAlignItems] = useState(0);
  const [direction, setDirection] = useState(0);
  const [wrap, setWrap] = useState(0);

  const hookedStyles = {
    flexDirection: flexDirections[flexDirection],
    justifyContent: justifyContents[justifyContent],
    alignItems: alignItemsArr[alignItems],
    direction: directions[direction],
    flexWrap: wraps[wrap],
  };

  const changeSetting = (
    value,
    options,
    setterFunction
  ) => {
    if (value === options.length - 1) {
      setterFunction(0);
      return;
    }
    setterFunction(value + 1);
  };
  const [squares, setSquares] = useState([<Square />, <Square />, <Square />]);
  return (
    <>
      <View style={{ paddingTop: StatusBar.currentHeight }} />
      <View style={[styles.container, styles.playingSpace, hookedStyles]}>
        {squares.map(elem => elem)}
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.controlSpace}>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Direction"
              onPress={() =>
                changeSetting(flexDirection, flexDirections, setFlexDirection)
              }
            />
            <Text style={styles.text}>{flexDirections[flexDirection]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Justify Content"
              onPress={() =>
                changeSetting(
                  justifyContent,
                  justifyContents,
                  setJustifyContent,
                )
              }
            />
            <Text style={styles.text}>{justifyContents[justifyContent]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Align Items"
              onPress={() =>
                changeSetting(alignItems, alignItemsArr, setAlignItems)
              }
            />
            <Text style={styles.text}>{alignItemsArr[alignItems]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Direction"
              onPress={() => changeSetting(direction, directions, setDirection)}
            />
            <Text style={styles.text}>{directions[direction]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Change Flex Wrap"
              onPress={() => changeSetting(wrap, wraps, setWrap)}
            />
            <Text style={styles.text}>{wraps[wrap]}</Text>
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Add Square"
              onPress={() => setSquares([...squares, <Square />])}
            />
          </View>
          <View style={styles.buttonView}>
            <Button
              title="Delete Square"
              onPress={() =>
                setSquares(squares.filter((v, i) => i !== squares.length - 1))
              }
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  playingSpace: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 3,
  },
  controlSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5F5F5',
  },
  buttonView: {
    width: '50%',
    padding: 10,
  },
  text: { textAlign: 'center' },
});

const Square = () => (
  <View
    style={{
      width: 50,
      height: 50,
      backgroundColor: randomHexColor(),
    }}
  />
);

const randomHexColor = () => {
  return '#000000'.replace(/0/g, () => {
    return Math.round(Math.random() * 16).toString(16);
  });
};

export default App;
*/
