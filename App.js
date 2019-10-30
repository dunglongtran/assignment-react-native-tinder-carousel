import React from 'react';
import {StyleSheet,View, PanResponder,Animated} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from './components/Carousel'
// import Deck from './components/DeckSwiper'
export default ()=>{

  return (
  <View style={styles.container}>
  <LinearGradient
          colors={['#000', '#3b5998', '#192f6a']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height:150
          }}
        />
        <Carousel/>
  </View>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#eee'
  }
})