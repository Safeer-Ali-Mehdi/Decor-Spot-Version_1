import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import IdaeCategories from '../../assets/Lists/IdeasCategories.json'
import HomeIdeas from '../../assets/Lists/HomeIdeas.json'
import OccasionIdeas from '../../assets/Lists/OccasionIdeas.json'


const UploadIdeas = ({userEmail, companyName}) => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('Select Idea Category');
  const [subCategory, setSubCategory] = useState('Select Idea Sub-Category');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [showCategory, setShowCategory] = useState(false);
  const [homeIdeasHandler, setHomeIdeasHandler] = useState(false);
  const [occasionIdeasHandler, setOccasionIdeasHandler] = useState(false);
  const [images, setImages] = useState([]);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [5, 5],
      quality: 1,
      base64:true,
      maxNumberOfItems: 4 - images.length
    });
    if (!result.canceled) {
      const binarySize = `data:${result.assets[0].type};base64,${result.assets[0].base64}`.length / 1.333;
const megabytes = binarySize / (1024);
      console.log(megabytes);
      if(images.length < 4){
  
        if(megabytes > 100.00){
        alert('Image size should be less then 1MB')  
      }
        else{
          setImages([...images,`data:${result.assets[0].type};base64,${result.assets[0].base64}`]);
           
        }
    }
      else{
        alert(' You can upload only upto 4 images');
      }
    }
  };

  const addIdea = () => {
    
    if(category== 'Select Idea Category'){
      alert('Please Select Idea Category');
    }
    else if(subCategory== 'Select Idea Sub-Category'){
      alert('Please Select Idea Sub-Category');
    }
    else if(budget <= 0 || budget == ''){
      alert('Please add valid value for budget');
    }
    else if (description.length > 250 || description.length < 100) {
      alert('Please summarize the Idea Description between 100-250 characters');
    }
    else if(images[0] == undefined){
      alert('Please Select Images');
    }
    else if(images[1] == undefined){
      alert('Please Select Second Image');
    }
    else if(images[2] == undefined){
      alert('Please Select Third Image');
    }
    else if(images[3] == undefined){
      alert('Please Select Fourth Image');
    }
    else{
    setDoc(doc(collection(db, 'IdeasList')), {
      UploadedBy: userEmail,
      Designer: companyName,
      Category: category,
      SubCategory: subCategory,
      Description: description,
      Budget: budget,
      Image_1: images[0],
      Image_2: images[1],
      Image_3: images[2],
      Image_4: images[3],
      

    }).then(

      alert("Idea succesfully uploaded"),
      setCategory('Select Idea Category'),
      setSubCategory('Select Idea Sub-Category'),
      setDescription(''),
      setBudget(''),
      setImages([])
      )
    
  }
  }

  return (
    <View style={styles.searchContainer}>

      <Text style={styles.headingStyle}>Post New Idea</Text>

      <View style={styles.subContainer}>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.fieldButton}
            onPress={() => {
              setShowCategory(true);
              setSubCategory('Select Idea Sub-Category');
            }}
          >
            <Text style={styles.fieldText}>{category}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.fieldButton}
            onPress={() => {
              if (category == "Home Decoration Ideas") {
                setHomeIdeasHandler(true)
              }
              else if (category == "Occasion Decoration Ideas") {
                setOccasionIdeasHandler(true)
              }
            }}
          >
            <Text style={styles.fieldText}>{subCategory}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TextInput
            multiline={true}
            placeholder="Add description about Idea"
            value={description}
            onChangeText={text => setDescription(text)}
            style={[{ height: 100, textAlignVertical: 'top'}, styles.descrInput]}
          />
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Enter your Budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={text => setBudget(text)}
            style={styles.descrInput}
          />
        </View>

        <View style={styles.field}>
        <TouchableOpacity
          style={styles.input}
          onPress={pickImage}>
          <Text>Choose Images from gallary</Text>
        </TouchableOpacity>
        <Text style={{color:'red'}}>*Must upload upto 4 images of size less than 1 MB</Text>
      </View>
       
      {images[0] && <ScrollView 
      showsHorizontalScrollIndicator={false}
       horizontal={true}
       style={{margin:10}}>
       <Image source={{ uri:images[0] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
       <Image source={{ uri:images[1] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
       <Image source={{ uri:images[2] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
       <Image source={{ uri:images[3] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
       </ScrollView>} 
      
       

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={addIdea}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Post</Text>
          </TouchableOpacity>
        </View>

      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={showCategory}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setShowCategory(!showCategory);

          }}>
          <View style={styles.modalView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={IdaeCategories}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setShowCategory(!showCategory);
                      setCategory(item.category);
                    }}>
                    <Text style={styles.modalText}>{item.category}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* {homeIdeasHandler && <ShowSubCategory subList={HomeIdeas}/>} */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={homeIdeasHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setHomeIdeasHandler(!homeIdeasHandler);

          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={HomeIdeas}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setHomeIdeasHandler(!homeIdeasHandler);
                      setSubCategory(item.subcategory);
                    }}>
                    <Text style={styles.modalText}>{item.subcategory}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={occasionIdeasHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setOccasionIdeasHandler(!occasionIdeasHandler)
          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={OccasionIdeas}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setOccasionIdeasHandler(!occasionIdeasHandler)
                      setSubCategory(item.subcategory);
                    }}>
                    <Text style={styles.modalText}>{item.subcategory}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* {occasionIdeasHandler && <ShowSubCategory subList={OccasionIdeas}/>} */}

    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  headingStyle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  subContainer: {
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  field: {
    width: '100%',
    flexDirection: 'column',
    margin: 15,
    justifyContent: 'center',
    alignItems:'center'
  },
  fieldButton: {
    borderWidth: 2,
    borderColor: '#454545',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative'
  },
  fieldText: {
    fontSize: 15,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
  fieldIconStyle: {
    fontSize: 20,
    color: '#454545',
    position: 'absolute',
    right: 0,
    marginEnd: 8
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#454545',
    width: '70%',
  },
  descrInput:{
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#454545',
    width: '70%',
  },
  submitButton: {
    width: 130,
    height: 50,
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#454545",
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center",
  },
  modalView: {
    width: 240,
    height: 120,
    backgroundColor: "#454545",
    borderRadius: 15,
    elevation: 5
  },
  modalView_2: {
    width: 260,
    height: 250,
    backgroundColor: "#454545",
    borderRadius: 15,
    elevation: 5
  },
  modalText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
    color: 'white',
    margin: '3%'
  },

})

export default UploadIdeas

