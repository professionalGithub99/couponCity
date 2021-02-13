import React,{useState} from 'react'
import {View} from 'react-native'
import { CheckBox } from 'react-native-elements'

import {checkItemExist} from '../helpers/utilities'
const CheckBoxList=(props)=>{
  const [toggleCheckBox,setToggleCheckBox]=useState(false)
  const items =()=>{
  var itemArray=[]
  for (var i =0; i< props.checkBoxItems.length;i+=3)
  var zero=parseInt(i)
  var one=parseInt(zero+1)
console.log(checkItemExist(props.checkBoxItems[one]))
  itemArray.push(
    <View style={{flexDirection:'row'}}>
    {(checkItemExist(props.checkBoxItems[zero]))?<CheckBox left={true}  title={'expires today'}checked={toggleCheckBox}/>:null }
    {(checkItemExist(props.checkBoxItems[one]))?<CheckBox  left={true} title={'<5 miles'} checked={toggleCheckBox}/>:null }
</View>
)
  return (itemArray)
  }
  return (<View>{items()}</View>)
}

export default CheckBoxList
