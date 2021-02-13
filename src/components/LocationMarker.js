import React, { useState, useEffect } from 'react';
import {Button, TouchableHighlight, View,Image, Text,TextInput,StyleSheet } from 'react-native';
import  MapView,{Circle,Callout,Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
//Geolocation.getCurrentPosition(info => console.log(info));
export default function LocationMarker(props) {
  return (
<>{/*<Circle tracksViewChanges={false} center={props.coordinate} radius={7}/>*/}
<Marker
onPress={(onSelect)=>{props.onPress(props.id,props.name)}}
anchor={{x:0.50,y:0.48}}
  coordinate={props.coordinate}>
   <Image
     style={{
       overflow:'hidden',
       borderRadius: 150 / 2,
       overflow: "hidden",
       borderColor: "red",
       borderWidth: 1,
       width: 50,
       height:50,
     }}
     resizeMode='cover'
     source={{uri:props.imageUrl
     }}/>
     </Marker>
</>
  );
}
