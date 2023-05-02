import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';
import DisplayProductsMenu from '../Components/DisplayProductsMenu';
import DisplayIdeasMenu from '../Components/DisplayIdeasMenu';

const HomeScreen = () => {
  const [productselector, setProductSelector] = useState(true);
  const [ideaSelector, setideaSelector] = useState(false);

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
      <View style={styles.menuStyle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              setProductSelector(true);
              setideaSelector(false);
            }}>
            <Text style={[{ backgroundColor: productselector ? "#454545" : "white" },
            { color: productselector ? "white" : "#454545" }, styles.menuTextStyle]}>
              Decoration Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.buttonStyle}
            onPress={() => {
              setProductSelector(false);
              setideaSelector(true);
            }}>
            <Text style={[{ backgroundColor: ideaSelector ? "#454545" : "white" },
            { color: ideaSelector ? "white" : "#454545" }, styles.menuTextStyle]}>
              Decoration Ideas
            </Text>
          </TouchableOpacity>
        </View>

        {productselector && <DisplayProductsMenu />}
        {ideaSelector && <DisplayIdeasMenu />}
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
  menuStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 5,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    borderColor: '#454545'
  },
  menuTextStyle:{
    fontSize:15,
    fontWeight:'bold',
    borderRadius:50,
    padding:10
  },
  buttonStyle:{
    borderRadius:50
  }

})

export default HomeScreen