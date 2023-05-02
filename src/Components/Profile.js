import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Feather } from '@expo/vector-icons';

const Profile = ({ logo, accountType, companyName, businessDescription, city, address, phone,link }) => {

  return (
    <View style={styles.containerStyle}>

      {/* <Text style={{fontSize:15, marginBottom:10, textDecorationLine: 'underline', alignSelf:'center'}}>You registered as "{accountType}"</Text> */}

      <View style={styles.imageContainer}>
        <Image  source={{uri: logo}}  style={styles.imageStyle} />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameStyle}>{companyName}</Text>
      </View>
      <View style={styles.businessContainer}>
        <Text style={styles.businessheading}>Business Description</Text>
      <Text style={styles.businessText}>{businessDescription}</Text>
      </View>

      <View style={styles.addressContainer}>
      <Feather name='phone' style={styles.iconStyle} />
      <Text style={styles.addressText}>{phone}</Text>
      </View>

      <View style={styles.addressContainer}>
      <Feather name='map-pin' style={styles.iconStyle}/>
      <Text style={styles.addressText}>{address}, {city}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'pink',
  },
  imageContainer: {
    width: 152,
    height: 152,
    alignSelf: 'center',
    marginVertical: 15,
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode:'contain'
  },
  nameContainer:{
    width:'100%',
  },
  nameStyle:{
    fontSize:22,
    fontStyle:'italic',
    fontWeight:'bold',
    alignSelf:'center'
  },
  businessContainer:{
    width:'100%',
    marginTop:20,
  },
  businessheading:{
    fontSize:15,
    fontWeight:'bold',
    marginBottom:5
  },
  businessText:{
    fontSize:13,
    textAlign:'justify'
  },
  iconStyle:{
    fontSize:25,
    color:'#454545',
    width:'10%'
  },
  addressContainer:{
    width:'100%',
    flexDirection:'row',
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  addressText:{
    textAlign:'justify',
    width:'90%'
  }
})

export default Profile
