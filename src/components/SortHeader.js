import React,{useState} from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import {View,Text,ScrollView} from 'react-native'
import {styles}from '../StyleSheet'
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
const SortHeader=({checked,setChecked,title})=>{
return(
  <>
  <View style={{ paddingTop:10,zIndex:30,flexDirection:'row',alignItems:'center'}}>
{/*<DropDownPicker
    items={[
        {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}
    containerStyle={{height: 40,width:'50%'}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item =>{} }
/>
<DropDownPicker
    items={[
        {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
        {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
        {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    ]}
    containerStyle={{ width:'50%',height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => {}}
/>*/}
</View>
<CheckBox
containerStyle={{}}
  center
  title={title}
  checked={checked}
   onPress={() => setChecked(!checked)}
/>
</>
)
}
export default SortHeader
