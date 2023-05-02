import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native'
import React,{useState, useEffect} from 'react'

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';
import SignIn from '../Components/SignIn';

const SignInScreen = () => {
    return (
        <View style={styles.containerStyle}>

            <StatusBar
                barStyle='light-content'
                hidden={false}
                backgroundColor="#454545"
                translucent={false}
            />

            <TopBar style={styles.topbarStyle} />

            <View style={styles.contentStyle}>
            <SignIn/> 
            </View>


            <MenuBar style={styles.setMenuBar} />

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
        flex:3
      },
      setMenuBar: {
        flex: 1,
      },
})

export default SignInScreen

