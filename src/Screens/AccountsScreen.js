import { StyleSheet, Text, View, ScrollView, StatusBar, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import { auth } from '../DatabaseConnection/Firebase';
import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';
import SignIn from '../Components/SignIn';
import DecoratorProfile from '../Components/DecoratorProfile';
import ProductSellerProfile from '../Components/ProductSellerProfile';


const AccountsScreen = () => {
    
    let accountType = '';

    const [signIn, setSignIn] = useState(true);
    const [decoratorProfile, setDecoratorProfile] = useState(false);
    const [productSellerProfile, setProductSellerProfile] = useState(false);
    const [loading, isLoading] = useState(false);

    useEffect(() => {
      isLoading(true);
        const session = auth.onAuthStateChanged(
            user => {
                if (user) {
                    getDocs(query(collection(db, "RegisterationForms"), where('Email', '==', user.email.toLocaleLowerCase()))).then(docSnap => {
                        let users = [];
                        docSnap.forEach((doc) => {
                            users.push({ ...doc.data(), id: doc.id })
                        });

                        if(users[0] === undefined){
                          isLoading(false);
                          alert('Slow internet connection, Please retry...');
                          setDecoratorProfile(false);
                        setProductSellerProfile(false);
                       
                        setSignIn(true);
                        }
                        else{
                          accountType = users[0].AccountType;
                        }

                        if (accountType == 'Decorator') {
                            setDecoratorProfile(true);
                            setProductSellerProfile(false);
                            setSignIn(false)
                            isLoading(false);
                        }
                        if (accountType == 'Product Seller') {
                            setDecoratorProfile(false);
                            setProductSellerProfile(true);
                            setSignIn(false)
                            isLoading(false);
                        }

                    })

                }
                else {      
                        setDecoratorProfile(false);
                        setProductSellerProfile(false);
                        isLoading(false);
                        setSignIn(true);
                        
                }
            }
        )
        return session
    }, [])

    return(
        <View style={styles.containerStyle}>

      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor="#454545"
        translucent={false}
      />

      <TopBar style={styles.topbarStyle}/> 

      <>
    {loading ? (<View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator
    size="large" color='#454545'/>
    <Text style={{alignSelf:'center'}}>Please wait while we loading your Profile...</Text>
    </View>) :
     (
      <View style={styles.contentStyle}>
        {signIn && <SignIn/>}
        {decoratorProfile && <DecoratorProfile/>}
        {productSellerProfile && <ProductSellerProfile/>}
      </View>
     )}
     </>

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
  
  })
  

export default AccountsScreen

