import { FlatList, StyleSheet, Text, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import {db} from '../DatabaseConnection/Firebase'
import { collection, getDocs } from "firebase/firestore";


const DisplayIdeasMenu = () => {

  let [ideaList, setIdeaList] = useState([]);
  const [loading, isLoading] = useState(true);

  useEffect(()=>{
    getDocs(collection(db, "HomeDecorationIdeas")).then(docSnap => {
      let list = [];
      docSnap.forEach((doc)=> {
      list.push({ ...doc.data(), id:doc.id })
      });
            setIdeaList(list);
            isLoading(false);    

            
    }).catch(error => alert(error.message));
  },[])
  
  return (
    <View style={{flex:1}}>
    {loading ? (<View style={{flex:1, justifyContent:'center'}}><ActivityIndicator
    size="large" color='#454545'/></View>) :
    <View style={{flex:1, alignContent:'center'}}>
    <FlatList
        showsVerticalScrollIndicator={false}
        data={ideaList}
        renderItem={({item}) => {
          
              return(
                <TouchableOpacity style={styles.cardStyle}>
                <Image source={{uri: item.ImagePath}} style={styles.imageStyle} />
                <Text style={styles.textStyle}>{item.Name}</Text>
                </TouchableOpacity>
               )
            }}/>
            </View>
            }
   </View>
  )
}

const styles = StyleSheet.create({
    cardStyle:{
        alignItems: 'center',
        borderWidth: 3,
        borderRadius:10,
        margin:'5%',
        backgroundColor: "#454545",
      },
      imageStyle:{     
        width: '100%',
        height: undefined,
        aspectRatio: 1.3,
        resizeMode:'cover',
        borderTopLeftRadius:7,
        borderTopRightRadius:7
      },
      textStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical:'3%',
        color: 'white',
        fontStyle:'italic',
      },
})

export default DisplayIdeasMenu

