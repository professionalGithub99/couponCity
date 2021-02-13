import React, { Component,useEffect,useState } from 'react'
import {Dimensions, AppRegistry, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'
import SwiperItem from './SwiperItem'
import Carousel from 'react-native-snap-carousel';
const windowHeight=Dimensions.get("window").height
const windowWidth=Dimensions.get("window").width
   const { width } = Dimensions.get('window');
import {orderObject,filterObject} from '../helpers/utilities'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
const Store=({DATA,onPress,claimedCoupons,onPressRemove,onPressActivate,usedCoupons,updateUsedCoupons,sortedKey,category,currentStoreId})=>{
  const swiperItemList=()=>{
    var elements=[]
    var datasets={}
  var counter=0;
var deepOrderedData=orderObject(JSON.parse(JSON.stringify(DATA)),sortedKey)
var filteredData1=filterObject(deepOrderedData,'category',category)
var filteredData=filterObject(filteredData1,'storeId',currentStoreId)
console.log(currentStoreId,'jkjkj')
for (const key in filteredData) {
  if(counter==3){
    elements.push(
<View key ={key} style={[styles.child, { backgroundColor: 'white' }]}>
      <SwiperItem sortedKey={sortedKey} claimedCoupons={claimedCoupons} onPressActivate={onPressActivate} updateUsedCoupons={updateUsedCoupons} usedCoupons={usedCoupons} onPressRemove={onPressRemove} onPress={onPress} key={key} items={datasets}/>
      </View>
    )
    datasets={}
    counter=0
  datasets[key]=filteredData[key]
    counter++
  }
  else{
  datasets[key]=filteredData[key]
    counter++
  }
}
  if(JSON.stringify(datasets) !== JSON.stringify({})){
    elements.push(
<View key={'jkj'} style={[styles.child, { backgroundColor: 'white' }]}>
<View></View>
<View></View>
      <SwiperItem sortedKey={sortedKey} claimedCoupons={claimedCoupons} onPressRemove={onPressRemove} usedCoupons={usedCoupons} updateUsedCoupons={updateUsedCoupons} onPressActivate={onPressActivate} onPress={onPress} key={'sjdklfjl'} items={datasets}/></View>)
    datasets={}
  }
  return elements
  }
 return (
<View style={{height:windowHeight*0.72}}>
    <SwiperFlatList
      showPagination
      >
      {swiperItemList()}
      </SwiperFlatList>
      </View>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width, justifyContent: 'flex-start' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
});
export default Store
