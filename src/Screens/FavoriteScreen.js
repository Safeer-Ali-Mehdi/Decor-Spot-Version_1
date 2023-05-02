import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';
import SearchProducts from '../Components/SearchProducts';
import SearchDecorators from '../Components/SearchDecorators';
import FavoriteProduct from '../Components/FavoriteProduct';


const FavoriteScreen = () => {
    const [productSearch, setProductSearch] = useState(true);
  const [decoratorSearch, setDecoratorSearch] = useState(false);
  return (
    <View style={styles.containerStyle}>

      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor="#454545"
        translucent={false}
      />

      <TopBar style={styles.topbarStyle}/> 

      <View style={styles.contentStyle}>
        <View style={styles.headingContainer}>
        <Text style={styles.headingTextStyle}>Favorites</Text>
        </View>
        <View style={styles.searchMenu}>
            <TouchableOpacity
            onPress={()=>{
                setProductSearch(true);
                setDecoratorSearch(false);
            }}
            >
                <Text style={[{ backgroundColor: productSearch ? "#454545" : "white" },
            { color: productSearch ? "white" : "#454545" },styles.menuButtonTextStyle]}>Products</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>{
                setProductSearch(false);
                setDecoratorSearch(true);
            }}
            >
                <Text style={[{ backgroundColor: decoratorSearch ? "#454545" : "white" },
            { color: decoratorSearch ? "white" : "#454545" },styles.menuButtonTextStyle]}>Ideas</Text>
            </TouchableOpacity>
        </View>
        
        <ScrollView>
        {productSearch && <FavoriteProduct/>}
        {/* {decoratorSearch && <SearchDecorators/>} */}
        </ScrollView>

      </View>

<MenuBar style={styles.setMenuBar}/>

</View>

  )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 5,
        backgroundColor: 'white',
      },
      topbarStyle: {
       flex:1,
      },
      contentStyle: {
        flex: 3,
      },
      setMenuBar: {
        flex: 1,
      },
      headingContainer:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        paddingEnd:15
      },
      headingTextStyle:{
        fontSize:27,
        fontWeight:'bold',
        fontStyle:'italic',
      },
      searchMenu:{
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:2,
        borderTopWidth:2,
        marginTop:5,
        paddingVertical:10,
      },
      menuButtonTextStyle:{
        fontSize:15,
        fontWeight:'bold',
        borderRadius:50,
        padding:8
      }
})

export default FavoriteScreen

