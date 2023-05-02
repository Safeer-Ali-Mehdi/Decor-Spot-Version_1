import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

import { auth } from '../DatabaseConnection/Firebase';
import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import Feather from '@expo/vector-icons/Ionicons';

const SignIn = () => {
  const navigation = useNavigation();
  let accountType= '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, isLoading] = useState(false);

  const login = () => {
    isLoading(true);
    auth
          .signInWithEmailAndPassword(email, password)
          .then(userCredentials => {
            const user = userCredentials.user;
            
          }).catch(error => {
            alert(error.message)
            isLoading(false);
          })
  }
  return (

    <>
      {loading ? (<View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          size="large" color='#454545' /></View>) :
        (<ScrollView contentContainerStyle={styles.container}>

          <View style={styles.fieldStyling}>
            <Text style={styles.headingStyling}>Sign In</Text>
          </View>

          <View style={styles.subContainer}>

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
              <Feather name='key' style={styles.iconStyle} />
              <TextInput
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
              />
            </View>

            <View style={styles.fieldStyling}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={login}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fieldStyling}>
              <Text style={styles.textStyle}>If don't have an account</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUpScreen')
                }}
              >
                <Text style={{ color: '#454545', fontSize: 16, fontWeight: 'bold', textDecorationLine: 'underline' }}>Create Account?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        )}
    </>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    marginTop: 70,
  },
  fieldStyling: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  headingStyling: {
    color: '#454545',
    fontSize: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    flex: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 15,
    marginEnd: '2%',
  },

  submitButton: {
    width: '40%',
    height: '30%',
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: '8%',
    backgroundColor: "#454545",
  },
  iconStyle: {
    fontSize: 40,
    color: '#454545',
    padding: '2%'

  },
})

export default SignIn
