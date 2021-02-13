import React, { useState, useEffect,useReducer } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import firebase from "firebase/app";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from 'react-native-vector-icons/Feather'
import CountDown from 'react-native-countdown-component';
const SwiperItemStrip=({title,percentDiscount,dollarDiscount,imageUrl,description,id,item,sortedKey,claimed,onPress,onPressRemove,activationExpiration, onPressActivate,used,updateUsedCoupons,expirationDate})=>{
  const buttonJsx=()=>{
    if(!claimed){
      if(!used){
    return(  <TouchableOpacity
                  onPress={() => {
                    onPress(id, item)
                  }}
                >
                  <View
                    style={{ ...styles.countContainer, flexDirection: 'row' }}
                  >
                    <Text style={{ fontSize: 16 }}>Add To </Text>
                    <Icon name="shopping-cart" size={15} color="#900" />
                  </View>
                </TouchableOpacity>)
    }
      else{
                    return(<><Text style={{ fontSize: 16 }}>COUPON</Text>
                      <Text style={{ fontSize: 16 }}>HAS BEEN </Text>
                      <Text style={{ fontSize: 16 }}>USED</Text></>
                    )
      }
      }
      else{
        if(!activationExpiration){
        return(
          [(<TouchableOpacity
                key={0}
                  onPress={() => {
                    onPressRemove(id)
                  }}
                >
                  <View
                    style={{ ...styles.countContainer, flexDirection: 'row' }}
                  >
                    <Text style={{ fontSize: 16 }}>Remove</Text>
                    <Icon name="shopping-cart" size={15} color="#900" />
                  </View>
                </TouchableOpacity>),( <TouchableOpacity
                key={1}
                  onPress={() => {
                    onPressActivate(id)
                  }}
                >
                  <View
                    style={{ ...styles.countContainer, }}
                  >
                    <Text style={{ fontSize: 16 }}>Activate</Text>
                  </View>
                </TouchableOpacity>)])
        }
        else{
            var timestamp= new firebase.firestore.Timestamp(activationExpiration.seconds,activationExpiration.nanoseconds).toDate()
            var current=new Date()
            var remainingSeconds=(timestamp-current)/1000
            console.log(remainingSeconds )
          if(current-timestamp>0){
          return(
            <><TouchableOpacity
                key={0}
                  onPress={() => {
                    updateUsedCoupons(id,item)
                  }}
                >
                  <View
                    style={{ ...styles.countContainer, flexDirection: 'row' }}
                  >
                    <Text style={{ fontSize: 16 }}>Remove</Text>
                    <Icon name="shopping-cart" size={15} color="#900" />
                  </View>
                </TouchableOpacity>
                <Text>COUPON HAS </Text><Text>BEEN USED</Text></>
          )
          }
          else{
          return(
            <><TouchableOpacity
                key={0}
                  onPress={() => {
                    updateUsedCoupons(id,item)
                  }}
                >
                  <View
                    style={{ ...styles.countContainer, flexDirection: 'row' }}
                  >
                    <Text style={{ fontSize: 16 }}>Remove</Text>
                    <Icon name="shopping-cart" size={15} color="#900" />
                  </View>
                </TouchableOpacity>
   <CountDown
        until={remainingSeconds}
          digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
        size={17}/></>
          )
          }
        }
      }
  }
  return(
          <View  style={{ ...styles.item,elevation:10,borderWidth:0.5,borderRightWidth:0, borderLeftWidth:0,borderColor:'black'}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Image
                style={{ width: 112,height: 115 }}
                source={{
                  uri: imageUrl,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={{ fontSize: 18 }}>{description}</Text>
              <Text style={{ fontSize: 12 }}>{(new firebase.firestore.Timestamp(expirationDate.seconds,expirationDate.nanoseconds)).toDate().toString().split(' ').slice(1,4).join(' ')}</Text>
              <Text style={{ fontSize: 12 }}>{(new firebase.firestore.Timestamp(expirationDate.seconds,expirationDate.nanoseconds)).toDate().toString().split(' ').slice(4,5).join(' ')}</Text>
              <Text style={{fontSize:12}}>{percentDiscount}% off</Text>
              <Text style={{fontSize:12}}>{dollarDiscount}$ off</Text>
            </View>
            <View styles={{ flex: 1 }}>
            {buttonJsx()}
            </View>
          </View>
        )
}

const styles = StyleSheet.create({
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'white',
    backgroundColor: 'white',
    padding: 0,
    marginVertical: 3,
    marginHorizontal:8,
  },
  title: {
    fontWeight:'bold',
    fontSize: 18,
  },
  countContainer: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    alignItems: 'center',
    margin: 10,
    padding: 3,
  },
})
export default SwiperItemStrip
