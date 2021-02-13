import React, { Component,useEffect } from 'react'
import {Dimensions, AppRegistry, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import SwiperItem from './SwiperItem'
import Carousel from 'react-native-snap-carousel';
const windowHeight=Dimensions.get("window").height

const Store=({DATA,onPress,claimedCoupons,onPressRemove})=>{
  const swiperItemList=()=>{
    var elements=[]
    var datasets={}
  var counter=0;
for (const key in DATA) {
  if(counter==3){
    console.log(key,'jkk')
    elements.push(<SwiperItem claimedCoupons={claimedCoupons} onPressRemove={onPressRemove} onPress={onPress} key={key} items={datasets}/>)
    datasets={}
    counter=0
  datasets[key]=DATA[key]
    counter++
  }
  else{
  datasets[key]=DATA[key]
    counter++
  }
}
  if(JSON.stringify(datasets) !== JSON.stringify({})){
    elements.push(<SwiperItem claimedCoupons={claimedCoupons} onPressRemove={onPressRemove} onPress={onPress} key={'sjdklfjl'} items={datasets}/>)
    datasets={}
  }
  return elements
  }
 return (
      <Swiper height={windowHeight*0.75} loadMinimal={true} autoplay={false}loop={false} showsButtons={true} showsPagination={true}  removeClippedSubviews={false} >
      {swiperItemList()}
      </Swiper>
    )
}
export default Store
