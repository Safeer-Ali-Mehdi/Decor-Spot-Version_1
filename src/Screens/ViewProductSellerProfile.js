import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, StatusBar, Linking  } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';

import { auth } from '../DatabaseConnection/Firebase';
import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import Profile from '../Components/Profile';
import DisplayProducts from '../Components/DisplayProducts';

const ViewProductSellerProfile = () => {
  const navigation = useNavigation();
    const route = useRoute();
    const { Company } = route.params;
  const [viewPost, setViewPost] = useState(true);
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

          getDocs(query(collection(db, "RegisterationForms"), where('CompanyName', '==', Company))).then(docSnap => {
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

  }, [])

  const handleCallButtonPress = () => {
    const phoneUrl = `tel:${phone}`;
    Linking.openURL(phoneUrl);
  };

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

       </View>

    
        <DisplayProducts/>
      

      
    </ScrollView>
    )}
    </>


    <View style={styles.phonePosition}>
      <TouchableOpacity onPress={handleCallButtonPress}>
      <Feather name='phone' style={styles.calliconStyle} />
      </TouchableOpacity>
    </View>

    </View>

<MenuBar style={styles.setMenuBar}/>

</View>

  )


}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 5,
    // backgroundColor: 'white',
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
    width:'100%',
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
  phonePosition:{
    position:'absolute',
    bottom:0,
    right:0,
    borderWidth:1,
    backgroundColor:'#454545',
    borderRadius:50,
    marginEnd:30,
    marginBottom:30,
    padding:10
    
  },
  calliconStyle:{
    fontSize:40,
    color:'white',
  }
  
})

export default ViewProductSellerProfile

