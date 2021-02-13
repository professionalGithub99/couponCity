import React,{useEffect} from 'react'
import {Image,FlatList,SafeAreaView,StyleSheet,Text,StatusBar,View,Button,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Feather';



const ScrollList= ({DATA}) => {
const Item = ({ title,description,imageUrl }) => (
  <View key={title} style={styles.item}>
  <View style={{flex:1,flexDirection:'column'}}>
 <Image
        style={{width:85,height:85}}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
    </View>
    <View style={{flex:1,alignItems:'flex-start'}}>
    <Text style={styles.title}>{title}</Text>
    <Text style={{fontSize:18}}>{description}</Text>
    <TouchableOpacity onPress={()=>{console.log('hello')}}>
    <View style={{...styles.countContainer,flexDirection:'row'}}>
    <Text style={{fontSize:15}}>Add To </Text>
    <Icon name="shopping-cart" size={18} color="#900" />
    </View>
    </TouchableOpacity>
      </View>
  </View>
);
  const renderItem = ({ item }) => (
    <Item key={item.title} title={item.title} description={item.description} imageUrl={item.imageUrl}/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection:'row',
    borderWidth:1,
    padding: 18,
    paddingBottom:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
  },
    countContainer: {
      fontSize:22,
      backgroundColor:'grey',
    alignItems: "center",
    padding: 10
  }
});
export default ScrollList
