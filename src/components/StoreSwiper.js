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
var deepOrderedData=orderObject(JSON.parse(JSON.stringify(DATA)),sortedKey)
var filteredData1=filterObject(deepOrderedData,'category',category)
var filteredData=filterObject(filteredData1,'storeId',currentStoreId)
for (const key in filteredData) {
    datasets={}
  datasets[key]=filteredData[key]
    elements.push(
<View key ={key} style={[styles.child, { backgroundColor: '#FEC5E5' }]}>
      <SwiperItem sortedKey={sortedKey} claimedCoupons={claimedCoupons} onPressActivate={onPressActivate} updateUsedCoupons={updateUsedCoupons} usedCoupons={usedCoupons} onPressRemove={onPressRemove} onPress={onPress} key={key} items={datasets}/>
      </View>
    )
}
  return elements
  }
 return (
<View style={{height:windowHeight*0.78}}>
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
