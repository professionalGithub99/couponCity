import React, { useState, useEffect,useReducer } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import firebase from "firebase/app";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import Icon from 'react-native-vector-icons/Feather'
import CountDown from 'react-native-countdown-component';
const windowHeight=Dimensions.get("window").height
const windowWidth=Dimensions.get("window").width
const SwiperItemFull=({title,percentDiscount,dollarDiscount,imageUrl,description,id,item,sortedKey,claimed,onPress,onPressRemove,activationExpiration, onPressActivate,used,updateUsedCoupons,expirationDate})=>{
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
                    <Text style={{  fontSize: 16,fontWeight:'bold',color:'white'}}>Add To </Text>
                    <Icon name="shopping-cart" size={15} color="red" />
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
                    <Text style={{ fontSize: 16,fontWeight:'bold',color:'white'}}>Remove</Text>
                    <Icon name="shopping-cart" size={15} color="red" />
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
                    <Text style={{ fontSize: 16,fontWeight:'bold',color:'white'}}>Activate</Text>
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
                    <Text style={{ fontSize: 16,fontWeight:'bold',color:'white' }}>Remove </Text>
                    <Icon name="shopping-cart" size={15} color="red" />
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
                    <Text style={{ fontSize: 16,fontWeight:'bold',color:'white' }}>Remove </Text>
                    <Icon name="shopping-cart" size={15} color="red" />
                  </View>
                </TouchableOpacity>
              {/*   <CountdownCircleTimer
    isPlaying
    size={56}
    strokeWidth={6}
    duration={remainingSeconds}
    colors={[
      ['#990000', 0.4],
      ['#F7B801', 0.4],
      ['#990000', 0.2],
    ]}
  >

    {({ remainingTime, animatedColor }) =>{
       const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60


      return(
      <Animated.Text style={{ color: animatedColor,fontSize:20 }}>
        {`${minutes}:${seconds}`}
      </Animated.Text>
    )
    }}
  </CountdownCircleTimer>*/}
   <CountDown
        until={remainingSeconds}
          digitStyle={{backgroundColor: '#FFF'}}
        digitTxtStyle={{color: '#1CC625'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
        size={17}/>
        </>
          )
          }
        }
      }
  }
  return(
    <View style={{width:windowWidth*0.93,borderWidth:5,borderColor:'white',height:windowHeight*0.71,alignSelf:'center',borderRadius:15,marginTop:windowHeight*0.02,alignItems:'center'}}>
              <Image
                style={{ width:'100%',height:'70%',borderRadius:11}}
                source={{
                  uri: imageUrl,
                }}
              />
    <View style={{flexDirection:'row',width:'100%',alignSelf:'flex-start',height:'30%',borderTopWidth:5,borderColor:'white'}}>
    {/*      <View  style={{ ...styles.item,}}>
              <Image
                style={{ width:windowWidth ,height:windowWidth}}
                source={{
                  uri: imageUrl,
                }}
              />
              </View>*/}
            <View
              style={{
                flex:2,
                alignItems:'center',
                justifyContent: 'center',
                borderRightWidth:5,borderColor:'white',
                borderBottomLeftRadius:11,
                backgroundColor:'#d3d3d3'
              }}
            >
              <Text style={styles.title}>{title} </Text>
              <Text style={{fontSize:2}}>{' '} </Text>
              <Text style={{ fontSize: 15 }}>{description}</Text>
              <Text style={{fontSize:12}}>{percentDiscount}% off</Text>
              <Text style={{fontSize:12}}>{dollarDiscount}$ off</Text>
              <Text style={{ fontSize: 12 }}>ExpirDate: {(new firebase.firestore.Timestamp(expirationDate.seconds,expirationDate.nanoseconds)).toDate().toString().split(' ').slice(1,4).join(' ')}</Text>
              <Text style={{ fontSize: 12 }}>{(new firebase.firestore.Timestamp(expirationDate.seconds,expirationDate.nanoseconds)).toDate().toString().split(' ').slice(4,5).join(' ')}</Text>
            </View>
            <View style={{flex:1.2, alignItems:'center',justifyContent:'flex-start',borderRadius:11}}>
            {buttonJsx()}
            </View>
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
    alignSelf:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  title: {
    fontWeight:'bold',
    fontSize: 18,
  },
  countContainer: {
    borderRadius:25,
    fontWeight: 'bold',
    backgroundColor: 'black',
    alignItems: 'center',
    margin: 10,
    padding: 8,
  },
})
export default SwiperItemFull
