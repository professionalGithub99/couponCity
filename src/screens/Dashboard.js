import React,{useState,useEffect,useRef} from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import Background from '../components/Background'
import { logoutUser } from '../api/auth-api'
import Constants from 'expo-constants';
import {Notifications} from 'expo';
import firebase from "firebase/app";
import MapTab from '../Tabs/MapTab';
import SettingsTab from '../Tabs/SettingsTab'
import CouponTab from '../Tabs/CouponTab'
import {registerForPushNotificationsAsync,getLocationPermissions} from '../helpers/utilities.js'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import * as geofirestore from 'geofirestore'
import moment from 'moment'
var db = firebase.firestore();
const firestore = firebase.firestore()
const GeoFirestore = geofirestore.initializeApp(firestore)
const geocollection = GeoFirestore.collection('store')
const usercollection= firebase.firestore().collection('user')

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
  const Tab = createBottomTabNavigator();
  const Dashboard = () => {
  const [expoPushToken,setExpoPushToken]=useState(null)
  const [notifications,setNotifications]=useState(null)
  const [coupons, setCoupons] = useState({})
  const [usedCoupons,setUsedCoupons]=useState({})
  const [currentStore,setCurrentStore]=useState({id:'',name:''})
  const isMountRef=useRef(true)
  const isMountRef1=useRef(true)
  const addCoupons=(field,value)=>{
  var userCouponsCopy=JSON.parse(JSON.stringify(coupons))
setCoupons({...userCouponsCopy,[field]:value})
  }
  const removeCoupons=(field)=>{
var  userCouponsCopy=JSON.parse(JSON.stringify(coupons))
delete userCouponsCopy[field]
setCoupons({...userCouponsCopy})
  }
  const activateCoupon=(field)=>{
  var userCouponsCopy=JSON.parse(JSON.stringify(coupons))
  var currentFirebaeDate= firebase.firestore.Timestamp.now().toDate()
  var actExpDate= moment(currentFirebaeDate).add(5, 'm').toDate();
  var actExpTimeStamp=firebase.firestore.Timestamp.fromDate(actExpDate);
  userCouponsCopy[field].activationExpiration=actExpTimeStamp
  console.log(userCouponsCopy[field])
  setCoupons({...userCouponsCopy})
 // console.log(newDateObj)

  // var firebaseTimestamp=firebase.database.ServerValue.TIMESTAMP

  }
  const updateUsedCoupons=(field,value)=>{
  var usedCouponCopy=JSON.parse(JSON.stringify(usedCoupons))
setUsedCoupons({...usedCouponCopy,[field]:value})
removeCoupons(field)
  }
const getCoupons=()=>{
var docRef = usercollection.doc(firebase.auth().currentUser.uid);
docRef.get().then(function(doc) {
    if (doc.exists) {
      try{
        var deepCouponCopy=JSON.parse(JSON.stringify(doc.data().coupons))
      setCoupons(deepCouponCopy)
      }
      catch(exception){
        console.log('no coupons found')
      }
      try{
        var deepUsedCouponCopy=JSON.parse(JSON.stringify(doc.data().usedCoupons))
      setUsedCoupons(deepUsedCouponCopy)
      }
      catch(exception){
        console.log('no coupons found')
      }
    } else {
        console.log("No such document!,jkdjfkkk");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});}

  const fetchData = async () => {
    registerForPushNotificationsAsync(setExpoPushToken);
  }

  useEffect(()=>{
    if(isMountRef1.current){
    isMountRef1.current=false;
    }
    else{
const usersRef = db.collection('users').doc('id')
usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
    usercollection.doc(firebase.auth().currentUser.uid).update({'usedCoupons':usedCoupons})
    } else {
    usercollection.doc(firebase.auth().currentUser.uid).set({'usedCoupons':usedCoupons})
    }
});
    }
  },[usedCoupons])
  useEffect(()=>{
    if(isMountRef.current){
    isMountRef.current=false;
    }
    else{
const usersRef = db.collection('users').doc('id')
usersRef.get()
  .then((docSnapshot) => {
    if (docSnapshot.exists) {
    usercollection.doc(firebase.auth().currentUser.uid).update({coupons})
    } else {
    usercollection.doc(firebase.auth().currentUser.uid).set({coupons})
    }
});
    }
  },[coupons])
    useEffect(()=>{
      console.log(firebase.auth().currentUser.uid,'jkjkk')
var user = firebase.auth().currentUser;
getCoupons()
      fetchData()
      return ()=>{
        }},[])
        return(
            <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Map') {
              iconName = 'map-pin'
            } else if (route.name === 'Settings') {
              iconName =  'settings';
            }
            else if(route.name==='Coupons'){
            iconName= 'shopping-cart'
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
      <Tab.Screen name='Map'>
        {props => <MapTab {...props} closeModal={()=>{setCurrentStore({id:'',name:''})}} setCurrentStore={(obj)=>{setCurrentStore(obj)}}  updateUsedCoupons={updateUsedCoupons} usedCoupons={usedCoupons} onPressActivate={activateCoupon} onPress={addCoupons}  claimedCoupons={coupons} addModalItem={addCoupons} onPressRemove={removeCoupons}/>}
        </Tab.Screen>
        <Tab.Screen name="Coupons">
        {props => <CouponTab {...props} currentStore={currentStore} updateUsedCoupons={updateUsedCoupons} usedCoupons={usedCoupons} onPressActivate={activateCoupon} onPress={addCoupons} claimedCoupons={coupons} addModalItem={addCoupons} onPressRemove={removeCoupons}/>}
        </Tab.Screen>
        <Tab.Screen name="Settings" component={SettingsTab} />
      </Tab.Navigator>
        )
        }
        export default Dashboard
