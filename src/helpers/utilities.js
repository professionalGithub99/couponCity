import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {Notifications} from 'expo';
import firebase from 'firebase/app';
const orderObject=(object,sortKey)=>{
var deepObject=JSON.parse(JSON.stringify(object))
var tempObject={}
var sortedKeys=[]
var tempArray=[]
var tempObj={}
  for (key in deepObject){
    tempArray.push(JSON.parse(JSON.stringify(deepObject[key])))
  }
if(sortKey=='expirationDate'){
  tempArray.sort((a,b)=> new Date(new firebase.firestore.Timestamp(a.expirationDate.seconds,a.expirationDate.nanoseconds).toDate())- new Date(new firebase.firestore.Timestamp(b.expirationDate.seconds,b.expirationDate.nanoseconds).toDate()))
}
else {
tempArray.sort((a,b)=>b[sortKey]-a[sortKey])
}
tempArray.map((item,i)=>{
  tempObj[item.id]=JSON.parse(JSON.stringify(item))
})
return tempObj
}
const filterObject=(object,sortKey,sortValue)=>{
var deepObject=JSON.parse(JSON.stringify(object))
var tempObject={}
if(sortValue=='all'||sortValue==''||sortValue==null){
  return deepObject;
}
else{

for (keys in deepObject){
  if (deepObject[keys][sortKey]==sortValue){
  tempObject[keys]=deepObject[keys]
  }
}
}
return tempObject
}
// → '{"a":"baz","b":"foo","c":"bar"}'
const registerForPushNotificationsAsync = async (setToken) => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    setToken(token)
  } else {
    alert('Must use physical device for Push Notifications');
  }
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
  };

  var getLocationPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.LOCATION);
    if(status!=='granted'){
      console.log("PERMISSIONS NOT GRANTED!");
    }
    else{
      console.log("PERMSION GRANTED")
    }
  }
  var checkItemExist= (item)=>{
    if(item)
    {
      console.log(item)
      return true
    }
    else{return false}
  }
  export {checkItemExist,registerForPushNotificationsAsync,getLocationPermissions,orderObject,filterObject}
