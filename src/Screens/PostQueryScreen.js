import { StyleSheet, Text, View, StatusBar,TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';
import { Feather } from '@expo/vector-icons';

import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

const PostQueryScreen = () => {
    const [loading, isLoading] = useState(false);
    var [email, setEmail] = useState('');
    var [queryDescription, setQueryDescription] = useState('');

    const postQuery = () =>{
        isLoading(true);
        var  validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if(email == '' && queryDescription == '') {
            alert("Fields must be filled");
            isLoading(false);
        }
        else if(validEmail.test(email) === false){
            alert("Invalid Email Syntax");
            isLoading(false);
          }
          else if(queryDescription.length > 500 ){
            alert('Please summarize the Query Description between 500 characters');
            isLoading(false);
            }
        else{
            setDoc(doc(collection(db,'Queries')),{
                Email: email,
                QueryDescription : queryDescription
              })
              .then((res) =>  
              
              alert('Your query is successfully posted'),
              setEmail(''),
              setQueryDescription(''),
              isLoading(false),

              ).catch(() => alert('Check Your Internet Connection'))

        }
    }

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
      {loading ? (<View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator
          size="large" color='#454545' /></View>) :
        (<ScrollView contentContainerStyle={styles.container}>

          <View style={styles.fieldStyling}>
            <Text style={styles.headingStyling}>Post Query</Text>
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
            <Feather name='clipboard' style={styles.iconStyle} />
        <TextInput
          multiline={true}
          placeholder="Anything went wrong? Please write here.."
          value={queryDescription}
          onChangeText={text => setQueryDescription(text)}
          style={[{ height: 100, textAlignVertical: 'top' }, styles.input]}
        />
      </View>

            <View style={styles.fieldStyling}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={postQuery}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Post</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
        )}
    </>
       
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

export default PostQueryScreen

