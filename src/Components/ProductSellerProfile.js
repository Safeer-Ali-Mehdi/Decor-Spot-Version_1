import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { auth } from '../DatabaseConnection/Firebase';
import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import Profile from '../Components/Profile';
import UploadProduct from './UploadProduct';
import ViewProducts from './ViewProducts';

const ProductSellerProfile = () => {
  const navigation = useNavigation();
  const [viewPost, setViewPost] = useState(false);
  const [uploadPost, setUploadPost] = useState(true);
  const [accountType, setAccountType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [logo, setLogo] = useState('');
  const [email, setEmail] = useState('');
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
    const session = auth.onAuthStateChanged(
      user => {
        if (user) {
          console.log(user.email);
          getDocs(query(collection(db, "RegisterationForms"), where('Email', '==', user.email))).then(docSnap => {
            let users = [];
            docSnap.forEach((doc) => {
              users.push({ ...doc.data(), id: doc.id })
            });
            setEmail(users[0].Email);
            setLogo(users[0].Logo);
            setAccountType(users[0].AccountType);
            setCompanyName(users[0].CompanyName);
            setBusinessDescription(users[0].BusinessDescription);
            setCity(users[0].City);
            setAddress(users[0].Address);
            setPhone(users[0].Phone);
            setWebsiteLink(users[0].WebsiteLink);

            isLoading(false);

          })

        }
      }
    )
    return session
  }, [])
 
  const signOut = () => {
    auth.signOut().then(() => {
      navigation.navigate('AccountScreen');
    }).catch(error => alert(error.message))
  }

  return (
    <>
    {loading ? (<View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator
    size="large" color='#454545'/></View>) :
     (
    <ScrollView style={styles.containerStyle}>
       <View style={styles.subContainerStyle}>
      <View style={styles.profileSection}>
        <Profile
          logo={logo}
          accountType={accountType}
          companyName={companyName}
          businessDescription={businessDescription}
          city={city}
          address={address}
          phone={phone}
          link={websiteLink}
          />
          
      </View>

      <View style={styles.menuSection}>
       <TouchableOpacity style={styles.editButtons}>
       <Feather name='edit-3' style={styles.editIconStyle}/>
       </TouchableOpacity>

       <TouchableOpacity 
       style={styles.logoutButtons}
       onPress={signOut}
       >
       <Feather name='log-out' style={styles.logoutIconStyle}/>
       </TouchableOpacity>
       </View>

       </View>

       <View style={styles.subContainerStyle_2}>

       <TouchableOpacity
         onPress={()=>{
          setViewPost(false);
          setUploadPost(true);
        }}>
          <Text style={[{ backgroundColor: uploadPost ? "#454545" : "white" },
            { color: uploadPost ? "white" : "#454545" },styles.menuButtonTextStyle]}>Post Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{
          setViewPost(true);
          setUploadPost(false);
        }}
        >
          <Text style={[{ backgroundColor: viewPost ? "#454545" : "white" },
            { color: viewPost ? "white" : "#454545" },styles.menuButtonTextStyle]}>View Product</Text>
        </TouchableOpacity>


       </View>

       <View>
        {viewPost && <ViewProducts/>}
        {uploadPost && <UploadProduct userEmail={email} companyName={companyName}/>}
       </View>

    </ScrollView>
    )}
    </>

  )


}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    width:'100%',
  },
  subContainerStyle:{
    width:'100%',
    position:'relative',
    flexDirection:'row',
  },
  profileSection:{
    width:'90%',
  },
  menuSection:{
    width:'10%',
  },
  editButtons:{
    position:'relative',
    
  },
  logoutButtons:{
    position:'relative'
  },
  editIconStyle:{
    fontSize:30,
    fontWeight:'bold',
    position:'absolute',
    top:40,
    right:15,
    color:'#454545',   
  },
  logoutIconStyle:{
    fontSize:30,
    position:'absolute',
    top:100,
    right:15,
    color:'#454545',   
  },
  subContainerStyle_2:{
   width:'100%',
   flexDirection:'row',
   justifyContent:'space-evenly',
   marginTop:10,
   padding:10,
   borderTopWidth:3,
   borderBottomWidth:4,
   borderTopStartRadius:30,
   borderTopEndRadius:30,
   borderBottomEndRadius:30,
   borderBottomStartRadius:30,
   borderColor:'#454545'
  },
  menuButtonTextStyle:{
    fontSize:15,
    fontWeight:'bold',
    borderRadius:50,
    padding:8
  }
})

export default ProductSellerProfile

