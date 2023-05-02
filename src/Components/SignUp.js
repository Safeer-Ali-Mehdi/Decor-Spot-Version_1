import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity,ScrollView, FlatList, Modal, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import { auth } from '../DatabaseConnection/Firebase';
import {db} from '../DatabaseConnection/Firebase'
import { collection, setDoc,doc,getDoc, updateDoc,deleteDoc,docSnap, query, where, getDocs } from "firebase/firestore";

import * as ImagePicker from 'expo-image-picker';
import CityList from '../../assets/Lists/CityList'
import { Feather } from '@expo/vector-icons';

var CityName = '';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('Decorator');
  const [companyName, setCompanyName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [phone, setPhone] = useState('');
  const [filePath, setFilePath] = useState('');
  const [logo, setLogo] = useState();
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [handleDecorator, setHandleDecorator] = useState(true);
  const [handleSeller, setHandleSeller] = useState(false);
  const [loading, isLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [5, 5],
      quality: 1,
      base64:true,
      
    });
    if (!result.canceled) {
      setLogo(`data:${result.assets[0].type};base64,${result.assets[0].base64}`);
    }
  };

   console.log(`data:image/jpeg;base64,${logo}`);
  if (CityName == '') {
    CityName = 'Select City'
  }

  const submit = () => {
    isLoading(true);
    if(email && password && confirmPassword && accountType 
      && companyName && businessDescription && websiteLink 
      && phone && logo && city && address){

        var  validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        getDocs(query(collection(db, "RegisterationForms"), where('CompanyName','==', companyName))).then(docSnap => {
          let users = []; 
           docSnap.forEach((doc)=> {
           users.push({ ...doc.data(), id:doc.id })
       });

          if(users[0] == undefined){

              if(validEmail.test(email) === false){
                alert("Invalid Email Syntax");
                isLoading(false);
              }
              else if(password != confirmPassword){
                alert("Password is not matched with Confirm Password");
                isLoading(false);          
              }
              else if(validPassword.test(password)=== false || password.length < 6){
                alert('Password must be greater then 6 characters and must contain Special Characters(!@#$%^&*)');
                isLoading(false);
              }
              else if(companyName.length > 30 || companyName.length < 4){
                alert('Company Name must be between 4-30 characters');
                isLoading(false);
              }
              else if(businessDescription.length > 500 || businessDescription.length < 200){
              alert('Please summarize the Business Description between 200-500 characters');
              isLoading(false);
              }
              else if(phone <= 0 || phone == ''){
                alert('Invalid Phone Number');
                isLoading(false);
              }
              else if(city === 'Select City' || city === null){
                alert('Select the city from list');
                isLoading(false);
                }
              else if(websiteLink.startsWith('https://') === false 
              && websiteLink.startsWith('http://') === false 
              && websiteLink.startsWith('www.') === false ){
                alert('Invalid website link');
                isLoading(false);
              }
              else if(address.length > 50 || address.length < 10){
                alert('Please summarize the address between 10-50 characters');
                isLoading(false);
              }
              else{
                auth
                .createUserWithEmailAndPassword(email,password)
                .then(userCredentials => 
                 {
                   const user=userCredentials.user;
                   console.log("registered with: ",user.email);


                   setDoc(doc(collection(db,'RegisterationForms')),{
                    Email: email.toLocaleLowerCase(),
                    AccountType:accountType,
                    CompanyName:companyName,
                    BusinessDescription:businessDescription,
                    WebsiteLink:websiteLink,
                    Phone:phone,
                    Logo:logo,
                    City:city,
                    Address:address,
              
                  })
                  .then((res) =>  
                  
                  alert('Congratulations! You are Successfully got registered.'),
                  navigation.navigate('SignInScreen'),
                  isLoading(false),
                  ).catch(() => alert('Check Your Internet Connection'))

                 }).catch(error => {alert(error.message)
                  isLoading(false);
                })

              }
    
            }     
            else{
              alert('This Company is already registered!');
              isLoading(false);
            }   
       });
             
      }else{
        alert('All fields must be filled!');
        isLoading(false);
      }
    }

  return (

    <>
    {loading ? (<View style={{flex:1,justifyContent:'center'}}>
      <ActivityIndicator
    size="large" color='#454545'/></View>) :
     (<ScrollView contentContainerStyle={styles.container}>

      <View style={[{marginVertical:20},styles.fieldStyling]}>
        <Text style={styles.headingStyling}>Registration</Text>
      </View>

      <View style={styles.fieldStyling}>
      <Feather name='mail' style={styles.iconStyle} />
        <TextInput
          placeholder="Enter Email"
          value={email}
          keyboardType="email-address"
          maxLength={50}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />

      </View>

      <View style={styles.fieldStyling}>
      <Feather name='lock' style={styles.iconStyle} />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
        />
      </View>
      
      <View style={styles.fieldStyling}>
      <Feather name='check-square' style={styles.iconStyle} />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
        />
      </View>

      <View style={{flexDirection:'column', alignItems:'center',marginTop:40,width:'100%'}}>
      <Text style={styles.textStyle}>Account Type</Text>

      <View style={{flexDirection:'row',marginTop:30, marginBottom:30, justifyContent:'space-evenly',width:'100%'}}>
     
       <TouchableOpacity
       onPress={()=>{
        setHandleDecorator(true);
        setHandleSeller(false);
        setAccountType('Decorator');
       }}
       style={[{ backgroundColor: handleDecorator ? "#454545" : "white" },styles.radioButtonStyle]}
       >
       </TouchableOpacity>
       <Text style={[styles.radioButtonTextStyle]}>Decorator</Text>
     
      
      <TouchableOpacity
       onPress={()=>{
        setHandleDecorator(false);
        setHandleSeller(true);
        setAccountType('Product Seller');
       }}
       style={[{ backgroundColor: handleSeller ? "#454545" : "white" },styles.radioButtonStyle]}
       >
       </TouchableOpacity>
       <Text style={styles.radioButtonTextStyle}>Product Seller</Text>
      
      </View>
      </View>
   
      <View style={styles.fieldStyling}>
      <Feather name='user' style={styles.iconStyle} />
        <TextInput
          placeholder="Company Name"
          value={companyName}
          onChangeText={text => setCompanyName(text)}
          style={styles.input}
        />
      </View>
      
      <View style={styles.fieldStyling}>
      <Feather name='clipboard' style={styles.iconStyle} />

        <TextInput
          multiline={true}
          placeholder="Business Description"
          value={businessDescription}
          onChangeText={text => setBusinessDescription(text)}
          style={[{ height: 100, textAlignVertical: 'top' }, styles.input]}
        />
      </View>

      <View style={styles.fieldStyling}>
      <Feather name='phone' style={styles.iconStyle} />
        <TextInput
          placeholder="Enter Phone Number"
          keyboardType="numeric"
          value={phone}
          onChangeText={text => setPhone(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldStyling}>
      <Feather name='link' style={styles.iconStyle} />
          <TextInput
              placeholder="Add Company Website Link"
              value={websiteLink}
              onChangeText={text => setWebsiteLink(text)}
              style={styles.input}
            />
          </View>

      
      <View style={styles.fieldStyling}>
      <Feather name='map-pin' style={styles.iconStyle} />
        <TouchableOpacity style={styles.input}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={{ fontSize: 13 }}>{CityName}</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.fieldStyling}>
      <Feather name='plus-square' style={styles.iconStyle} />
        <TextInput
          placeholder="Add more Specific Address"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldStyling}>
      <Feather name='image' style={styles.iconStyle} />
        <TouchableOpacity
          style={styles.input}
          onPress={pickImage}>
          <Text>Choose company logo from gallary</Text>
        </TouchableOpacity>
      </View>
       {logo && <Image source={{ uri:logo }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />}
       {filePath && <Text>{filePath}</Text>}
      <View style={styles.fieldStyling}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submit}>
          <Text style={{ fontSize:20,fontWeight:'bold', color:'white' }}>Submit</Text>
        </TouchableOpacity>
      </View>


     <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity style={styles.centeredView}
        onPress={()=>{
          setModalVisible(!modalVisible);
          
        }}>
          <View style={styles.modalView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={CityList}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      CityName = item.name
                      setCity(CityName);
                    }}>
                    <Text style={styles.modalText}>{item.name}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </ScrollView>
     )}
     </>
    
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:'5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldStyling: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent:'center',
    width: '100%'
  },
  headingStyling: {
    fontSize: 35,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: 'center'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    // borderBottomWidth:1,
    borderWidth: 1,
    flex: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    marginEnd: '2%',
    color: '#454545',
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  radioButtonStyle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
    alignSelf:'center'
    // marginLeft: '5%'
  },
  radioButtonTextStyle: {
    fontSize:18,
  },
  submitButton: {
    width: 100,
    height: 50,
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    // marginTop: '3%',
    backgroundColor: "#454545",
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center",
  },
  modalView: {
    width: '35%',
    height: '70%',
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 5
  },
  modalText: {
    fontSize: 12,
    textAlign: "center",
    margin: '3%'
  },

  imageStyle: {
    width: 300,
    height: 300,
  },
  iconStyle:{
    fontSize: 40,
    color: '#454545',
    // padding:'2%'
    marginEnd:'2%'
    
  },
})

export default SignUp
