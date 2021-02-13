import React, { useRef, useState, useEffect } from 'react'
import { Modal, ModalContent, SlideAnimation } from 'react-native-modals'
import StoreSwiper from './StoreSwiper'
import {
  TextInput,
  Dimensions,
  TouchableHighlight,
  Alert,
  StyleSheet,
  Platform,
  Button,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { Modalize } from 'react-native-modalize'
import AccordionScrollView from './AccordionScrollView'
import ScrollList from './ScrollList.js'
import DropDownPicker from 'react-native-dropdown-picker'
import Icon from 'react-native-vector-icons/Feather'
const windowHeight = Dimensions.get('window').height

export const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
  },
  {
    value: '2',
    label: 'Garrett Winters',
    employee_salary: '170750',
    employee_age: '63',
 }]
const MapModal = ({ modalVisible, closeModal,name,coupons,categories,onPress,claimedCoupons,onPressRemove,onPressActivate,usedCoupons,updateUsedCoupons}) => {
  const [category,setCategory]=useState('all')
  const [sort,setSort]=useState('expirationDate')
  const modalizeRef = useRef(null)
  useEffect(()=>{setCategory('all')},[categories])
  useEffect(() => {
    if (modalVisible) {
      onOpen()
    }
  }, [modalVisible])
  const onOpen = () => {
    modalizeRef.current?.open()
  }
    return (
      <>
        <Modalize
          HeaderComponent={
            <View style={{zIndex:10}}>

            {/*<View style={{alignSelf:'center'}}>
            <Text>{name}</Text>
        </View>*/}
          <View style={{flexDirection:'row',justifyContent: 'space-between',
        alignItems: 'center'}}>
      {Platform.OS!='ios' ?
      [
( <Dropdown
  key={0}
            data={
categories==null?[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]:
categories.map((value,index)=>{
  var label=value.label
  console.log(label)
      return ({
                  label: label,
                  value: value.value,
                  icon: () => <Icon name={value.flag} size={18} color="#900" />})})
}
            value={category}
            onChange={(item)=>{setCategory(item)}}
          />),(<Dropdown

  mainContainerStyle={{fontSize:5}}
            key={1}
    data={[
        {label: 'Expiration', value: 'expirationDate', icon:null },
        {label: '% Discount', value: 'percentDiscount', icon:null },
        {label: '$ Discount', value: 'dollarDiscount', icon:null },
    ]}
            value={sort}
            onChange={(item)=>{setSort(item)}}
          />)]:
          [(  <DropDownPicker
            key={0}
              items={categories==null?[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]:
categories.map((value,index)=>{
  var label=value.label
      return ({
                  label: label,
                  value: value.value,
                  icon: () => <Icon name={value.flag} size={18} color="#900" />})})
            }
              defaultValue={category}
              style={{alignSelf:'center'}}
              containerStyle={{ alignSelf:'center',position:'relative',width:'50%' }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{  elevation: 999, position:'absolute', zIndex:100}}
              onChangeItem={(item) => {console.log(item.value,'setted');setCategory(item.value)}}
            />),(
<DropDownPicker
    items={[
        {label: 'Expiration', value: 'expirationDate', icon:null },
        {label: '% Discount', value: 'percentDiscount', icon:null },
        {label: '$ Discount', value: 'dollarDiscount', icon:null },
    ]}
    key={1}
    defaultValue={sort}
    containerStyle={{height: 40,width:'50%'}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item =>setSort(item.value) }
/>
)]}
            </View>
            </View>
          }
          modalHeight={windowHeight * 0.86}
          onClose={() => {
            closeModal()
          }}
          ref={modalizeRef}>
          <StoreSwiper sortedKey={sort} category={category} DATA={coupons} usedCoupons={usedCoupons} updateUsedCoupons={updateUsedCoupons} claimedCoupons={claimedCoupons} onPressRemove={onPressRemove} onPressActivate={onPressActivate} onPress={onPress} > </StoreSwiper>
        </Modalize>
      </>
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,
  },
})
export default MapModal
