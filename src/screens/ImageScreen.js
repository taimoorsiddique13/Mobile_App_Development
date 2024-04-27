import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageDetail from '../components/ImageDetail'

export default function ImageScreen() {
  return (
    <View style = {styles.container}>
    <Text>Images</Text>
    <ImageDetail imageSource = {require('../../assets/Image1.jpg')}
      title ="Beach"
    />
    <ImageDetail imageSource = {require('../../assets/Image2.jpg')}
      title = "Forest"
    />
    <ImageDetail imageSource = {require('../../assets/Image3.jpg')}
      title = "Mountain" 
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-around',
    
  },




});
