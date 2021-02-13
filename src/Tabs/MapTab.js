import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'
import { styles, mapStyles } from '../StyleSheet.js'
import { getLocationPermissions } from '../helpers/utilities'
import { useFocusEffect } from '@react-navigation/native'
import MapView from 'react-native-maps'
import LocationMarker from '../components/LocationMarker'
import * as Location from 'expo-location'
import MapModal from '../components/MapModal'
import * as TaskManager from 'expo-task-manager'
import firebase from 'firebase/app'
import 'firebase/firestore'
import * as geofirestore from 'geofirestore'
import { FIREBASE_CONFIG } from '../core/config.js'
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG)
}
const firestore = firebase.firestore()
const GeoFirestore = geofirestore.initializeApp(firestore)
const geocollection = GeoFirestore.collection('store')
const usercollection = firebase.firestore().collection('user')

TaskManager.defineTask('BACKGROUND_TASK', ({ data: { locations }, error }) => {
  if (error) {
    console.log('erro')
    return
  }
  // setLocation({...location,latitude:locations[0].coords.latitude,longitude:locations[0].coords.longitude})
  // console.log('new location recieved',locations)
})
let locSub
let locHeadSub
const MapTab = (props) => {
  const [followsRegion, setFollowsRegion] = useState(true)
  const [headingSetter, setHeadingSetter] = useState(true)
  const [locationSetter, setLocationSetter] = useState(true)
  const [storeObjs, setStoreObjs] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [storeMarkers, setStoreMarkers] = useState([])
  const [currentStore, setCurrentStore] = useState('')
  const [zoom,setZoom]=useState( 0.002357691674703233)
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    longitudeDelta: 0.00122,
    latitudeDelta: 0.00122,
  })
  const mapRef = useRef(null)
  const updateLocation = (field, value) => {
    setLocation({ ...location, [field]: value })
  }
  const fetchData = async () => {
    await getLocationPermissions()
    locSub = await Location.watchPositionAsync(
      { accuracy: 5, timeInterval: 4000, distanceInterval: 0 },
      (loc) => {
        var latitude = loc.coords.latitude
        var longitude = loc.coords.longitude
        setLocation({
          latitude: latitude,
          longitude: longitude,
          longitudeDelta: 0.00121,
          latitudeDelta: 0.00122,
        })
      }
    )

    locHeadSub = await Location.watchHeadingAsync((headingObj) => {
      if (headingObj.accuracy == 3) {
        try {
          mapRef.current.getCamera().then((cam) => {
            var camJson = JSON.stringify(cam)
            var camObj = JSON.parse(camJson)
            camObj.heading = headingObj.magHeading
            mapRef.current.setCamera(camObj)
          })
        } catch {
          console.log('unable to rotate')
        }
      }
    })

    var isRegistered = await TaskManager.isTaskRegisteredAsync(
      'BACKGROUND_TASK'
    )
    try {
      await Location.startLocationUpdatesAsync('BACKGROUND_TASK', {
        accuracy: 6,
        timeInterval: 2000,
        distanceInterval: 0,
        foregroundService: {
          notificationTitle: 'Live Tracker',
          notificationBody: 'Live Tracker is on.',
        },
      })
    } catch (exception) {
      console.log('')
    }
  }
  const remove = async () => {
    await locHeadSub.remove()
    await locSub.remove()
  }
  useFocusEffect(
    React.useCallback(() => {
      if (followsRegion) {
        fetchData()
      } else {
        if (locHeadSub != undefined) {
          console.log('isNotNll')
          remove()
        }
      }
    }, [followsRegion])
  )

  const setUpMap = () => {
    var currentCoupons = usercollection.doc(firebase.auth().currentUser.uid)
    const query = geocollection.near({
      center: new firebase.firestore.GeoPoint(44.784081, -88.1248),
      radius: 1000,
    })
    query.onSnapshot(async (value) => {
      var storeDataArray = value.docs
      var couponList = []
      var tempMarkerArray = []
      var tempStoreObj = {}
      var tempStoreObjs={}
      for (const i in value.docs) {
        var storeData = JSON.parse(JSON.stringify(storeDataArray[i].data()))
        storeData.id = storeDataArray[i].id
        var documentSnapshot = value.docs[i]
        var coupons = await geocollection
          .doc(documentSnapshot.id)
          .collection('coupons')
          .get()
        var tempCouponObj = {}
        for (var j in coupons.docs) {
          var deepCouponData = JSON.parse(
            JSON.stringify(coupons.docs[j].data())
          )
          deepCouponData.id = coupons.docs[j].id
          deepCouponData.storeId=storeData.id
          couponList.push(deepCouponData)
          tempCouponObj[coupons.docs[j].id] = deepCouponData
        }
        storeData.coupons = tempCouponObj
        var deepStoreObjCopy = JSON.parse(JSON.stringify(storeObjs))
        tempStoreObjs[storeData.id]= storeData
        tempMarkerArray.push(
          {key:i,storeInfo:{id:storeData.id,name:storeData.name},imageUrl:storeData.imageUrl,coordinate:{latitude:storeData.coordinates['U'],longitude:storeData.coordinates['k']}}
/*          <LocationMarker
            key={i}
            onPress={() => {
              props.setCurrentStore({id:storeData.id,name:storeData.name})
              setCurrentStore(storeData.id)
              setModalVisible(true)
            }}
            imageUrl={storeData.imageUrl}
            sizeScale={zoomRef.current/0.002357691674703233}
            coordinate={{
              latitude: storeData.coordinates['U'],
              longitude: storeData.coordinates['k'],
            }}
          />*/
        )
      }
      setStoreObjs(tempStoreObjs)
      setStoreMarkers(tempMarkerArray)
    })
  }
  const testing=()=>{
    var tempArray=[]
  for (var i in storeMarkers){
    var id=storeMarkers[i].storeInfo.id
    var name=storeMarkers[i].storeInfo.name

     tempArray.push(<LocationMarker
            key={storeMarkers[i].key}
            id={id}
            name={name}
            onPress={(id,name) => {
              props.setCurrentStore({id:id,name:name})
              setCurrentStore(id)
            }}
            imageUrl={storeMarkers[i].imageUrl}
            sizeScale={0.0014/zoom}
            coordinate={{
              latitude: storeMarkers[i].coordinate.latitude,
              longitude: storeMarkers[i].coordinate.longitude,
            }}
          />)
  }
  return tempArray
  }
  useEffect(()=>{
    console.log(currentStore,'j')
          if(currentStore!=''){
            setModalVisible(true)}
  },[currentStore])
  useEffect(() => {
    setUpMap()
    return () => {
      try {
        remove()
        console.log('able remove from useEffect')
      } catch {
        console.log('unable remove from useEffect')
      }
    }
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        try {
          remove()
          console.log('removedi')
        } catch {
          console.log('error not existnetn')
        }
      }
    }, [])
  )
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={mapStyles.map}
        region={followsRegion ? location : null}
        onRegionChange={(region)=>{setZoom(region.longitudeDelta)}}
        initialRegion={location}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPanDrag={(abc) => {
          if (followsRegion) {
            setFollowsRegion(false)
          }
        }}
      >
    {testing()}
      </MapView>

      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '90%', //for center align
          alignSelf: 'flex-end', //for align to right
        }}
      >
        <Button
          title={'Re-Center'}
          onPress={() => {
            if (!followsRegion) {
              setFollowsRegion(true)
            }
          }}
        />
      </View>
      <MapModal
      updateUsedCoupons={props.updateUsedCoupons}
      usedCoupons={props.usedCoupons}
      onPressActivate={props.onPressActivate}
      onPressRemove={props.onPressRemove}
        onPress={props.onPress}
        categories={
          storeObjs[currentStore] ? storeObjs[currentStore].categories : null
        }
        coupons={
          storeObjs[currentStore] ? storeObjs[currentStore].coupons : null
        }
        claimedCoupons={
        props.claimedCoupons
        }
        name={storeObjs[currentStore] ? storeObjs[currentStore].name : null}
        modalVisible={modalVisible}
        var storeObj={storeObjs.[currentStore]}
        closeModal={() => {
          props.closeModal()
          setCurrentStore('');
          setModalVisible(false)
        }}
      />
    </View>
  )
}
export default MapTab
