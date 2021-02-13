import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import SwiperItemFull from './SwiperItemFull'
const SwiperItem = ({
  items,
  onPress,
  claimedCoupons,
  onPressRemove,
  onPressActivate,
  usedCoupons,
  updateUsedCoupons,
  sortedKey
}) => {
  const [elements, setElements] = useState([])
  return (
    <>
      {Object.keys(items).map((key, i) => {
        if (!(key in claimedCoupons)) {
          if (!(key in usedCoupons)) {
            return (
              <SwiperItemFull
              sortedKey={sortedKey}
                key={i}
                title={items[key].title}
                onPress={onPress}
                expirationDate={items[key].expirationDate}
                percentDiscount={items[key].percentDiscount}
              dollarDiscount={items[key].dollarDiscount}
                onPressRemove={onPressRemove}
                imageUrl={items[key].imageUrl}
                description={items[key].description}
                id={items[key].id}
                item={items[key]}
                claimed={false}
                used={false}
              >
                {' '}
              </SwiperItemFull>
            )
          }
          else{
            return (
              <SwiperItemFull
              sortedKey={sortedKey}
                percentDiscount={items[key].percentDiscount}
                key={i}
                title={items[key].title}
                onPress={onPress}
                expirationDate={items[key].expirationDate}
            dollarDiscount={items[key].dollarDiscount}
                onPressRemove={onPressRemove}
                imageUrl={items[key].imageUrl}
                description={items[key].description}
                id={items[key].id}
                item={items[key]}
                claimed={false}
                used={true}
              >
                {' '}
              </SwiperItemFull>
            )
          }
        } else {
          return (
            <SwiperItemFull
              key={i}
            percentDiscount={items[key].percentDiscount}
            dollarDiscount={items[key].dollarDiscount}
            sortedKey={sortedKey}
              title={items[key].title}
              onPressActivate={onPressActivate}
              activationExpiration={
                'activationExpiration' in claimedCoupons[key]
                  ? claimedCoupons[key].activationExpiration
                  : null
              }
              expirationDate={items[key].expirationDate}
              onPress={onPress}
              onPressRemove={onPressRemove}
              imageUrl={items[key].imageUrl}
              description={items[key].description}
              id={items[key].id}
              item={items[key]}
              claimed={true}
              used={false}
              updateUsedCoupons={updateUsedCoupons}
            >
              {' '}
            </SwiperItemFull>
          )
        }
      })}
    </>
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
    marginVertical: 12,
    marginHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  countContainer: {
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'grey',
    alignItems: 'center',
    margin: 10,
    padding: 8,
  },
})
export default SwiperItem
