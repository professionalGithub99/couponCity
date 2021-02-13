import React from 'react'
import {Dimensions,StyleSheet} from 'react-native'
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
   position: 'absolute',//use absolute position to show button on top of the map
            top: '50%', //for center align
            alignSelf: 'flex-end' //for align to right
  },
  header:{
  position:'relative',
  flex:0.30,
  borderStyle:'solid',
  borderWidth:1,
  alignItems:'center',
  paddingTop:15
},
  scrollView:{
  position:'relative',
  flex:0.70,
borderWidth:1,
  borderStyle:'solid'
  }
})
const mapStyles = StyleSheet.create({
  container:{flex:1},
  map: {
    zIndex:-1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.9,
  },
});
export {styles,mapStyles}
