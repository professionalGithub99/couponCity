import React,{useState,useEffect} from 'react'
import {Text,View,ScrollView,Dimensions,StyleSheet} from 'react-native'
import {List} from 'react-native-paper';
import SortHeader from '../components/SortHeader'
import AccordionScrollView from '../components/AccordionScrollView'
import StoreSwiper from '../components/StoreSwiper'
import MapModal from '../components/MapModal'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import SwiperItem from  '../components/SwiperItem'
import DropDownPicker from 'react-native-dropdown-picker'
   const { width } = Dimensions.get('window');
const colors = {'tomato':'thistle'};
const CouponTab=( {name,coupons,categories,onPress,claimedCoupons,onPressRemove,onPressActivate,usedCoupons,updateUsedCoupons,currentStore})=>{
  const [checked,setChecked]=useState(false)
return(<>
<SortHeader title={(currentStore.id!='')? "Show coupnons from:\n" +currentStore.name:"Select a store from the \n map to filter by store"}checked={checked} setChecked={()=>{setChecked(!checked)}}></SortHeader>
  <View style={{flex:3}}>
          <StoreSwiper  currentStoreId={(currentStore!=null)?currentStore.id:null} sortedKey={'expirationDate'} category={'all'} DATA={claimedCoupons} usedCoupons={usedCoupons} updateUsedCoupons={updateUsedCoupons} claimedCoupons={claimedCoupons} onPressRemove={onPressRemove} onPressActivate={onPressActivate} onPress={onPress}> </StoreSwiper>
          </View>
</>
   )}
export default CouponTab
