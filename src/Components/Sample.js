import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'

import { auth } from '../DatabaseConnection/Firebase';
import {db} from '../DatabaseConnection/Firebase'
import { collection, setDoc,doc,getDoc, updateDoc,deleteDoc,docSnap, query, where, getDocs } from "firebase/firestore";

import * as ImagePicker from 'expo-image-picker';

const Sample = () => {
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
        });
        // console.log(result);
        if (!result.canceled) {
      // if(images.length > 3){
      //   console.log('No More Images Can Be Added');
      //   return;
      // }
      // else{
      // setImages(oldArray => [...oldArray,result.assets[0].uri]);
      // i++;
      // console.log(i);
      // console.log(result.assets[0].uri);
      // }
         setLogo(result.assets[0].uri);
      
        }
        };

        const submit =()=>{
            setDoc(doc(collection(db,'HomeDecorationIdeas')),{
                Name: email,
                ImagePath:logo,
          
              })
        }
  return (
    <View>
      <TextInput
              placeholder="Enter Email"
              value={email}
              keyboardType="email-address"
              maxLength={50}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />

       <TouchableOpacity 
          style={styles.input}
          onPress={pickImage}>
          <Text>Choose image from gallary</Text>
          </TouchableOpacity>

          <TouchableOpacity
          
          onPress={submit}>
          <Text style={{fontSize:20}}>Submit</Text>
          </TouchableOpacity>
    </View>
  )
}

export default Sample

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection:'row',
        borderWidth:1,
        flex:2,
        position:'relative',
        },
})