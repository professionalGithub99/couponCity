import React from 'react'
import Button from '../components/Button'
import {View} from 'react-native'
import {styles} from "../StyleSheet.js"
import firebase from "firebase/app"
const SettingsTab=()=>{
  const logout=async ()=>{
    await firebase.auth().signOut();

  }
return(<View style={styles.container}>
<Button mode="contained" onPress={()=>{logout()}}>Logout</Button>
  </View>)}
export default SettingsTab
