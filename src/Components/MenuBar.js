import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Feather from '@expo/vector-icons/Ionicons';

const MenuBar = () => {
  const navigation = useNavigation();
    return (
     
     <View style={styles.menubarStyle}>

     <TouchableOpacity
     onPress={()=>{
      navigation.navigate('HomeScreen')
     }}>
     <Feather name='home' style={styles.iconStyle}/>
     </TouchableOpacity>
  
     <TouchableOpacity
     onPress={()=>{
      navigation.navigate('FavoriteScreen')
     }}>
     <Feather name='star' style={styles.iconStyle}/>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={()=>{
      navigation.navigate('SearchScreen')
     }}>
     <Feather name='search' style={styles.iconStyle}/>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={()=>{
      navigation.navigate('AccountScreen')
     }}>
     <Feather name='person' style={styles.iconStyle}/>
     </TouchableOpacity>

    
     </View>
     
    )
}

const styles = StyleSheet.create({
    
      menubarStyle:{
        flexDirection:"row",
        backgroundColor:'#454545',
        justifyContent:'space-around',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    iconStyle:{
        fontSize: 38,
        color: 'white',
        padding:'2%'
        
      },
})

export default MenuBar


