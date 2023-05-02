import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs } from "firebase/firestore";

import ProductCategories from '../../assets/Lists/ProductCategories.json'
import FurnitureProducts from '../../assets/Lists/FurnitureProducts.json'
import FabricProducts from '../../assets/Lists/FabricProducts.json'
import DecorationProducts from '../../assets/Lists/DecorationProducts.json'
import CoveringProducts from '../../assets/Lists/CoveringProducts.json'

const UploadProduct = ({ userEmail, companyName }) => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('Select Product Category');
  const [subCategory, setSubCategory] = useState('Select Product Sub-Category');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [showCategory, setShowCategory] = useState(false);
  const [furnitureHandler, setFurnitureHandler] = useState(false);
  const [fabricHandler, setFabricHandler] = useState(false);
  const [decorProductHandler, setDecorProductHandler] = useState(false);
  const [coveringHandler, setCoveringHandler] = useState(false);
  const [name, setName] = useState('');


  const [images, setImages] = useState([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [5, 5],
      quality: 0.5,
      base64: true,
      maxNumberOfItems: 4 - images.length
    });
    if (!result.canceled) {

      const binarySize = `data:${result.assets[0].type};base64,${result.assets[0].base64}`.length / 1.333;
      const megabytes = binarySize / (1024);
      console.log(megabytes);
      if (images.length < 4) {

        if (megabytes > 100.00) {
          alert('Image size should be less then 1MB');
        }
        else {

          setImages([...images, `data:${result.assets[0].type};base64,${result.assets[0].base64}`]);

        }
      }
      else {
        alert(' You can upload only upto 4 images');
      }
    }
  };

  const addProduct = () => {

    if (category == 'Select Product Category') {
      alert('Please Select Product Category');
    }
    else if (subCategory == 'Select Product Sub-Category') {
      alert('Please Select Product Sub-Category');
    }
    else if (name == '') {
      alert('Please enter product name');
    }
    else if (description.length > 250 || description.length < 100) {
      alert('Please summarize the Product Description between 100-250 characters');
    }
    else if (budget <= 0 || budget == '') {
      alert('Please add valid value for Product Price');
    }
    else if (images[0] == undefined) {
      alert('Please Select Images');
    }
    else if (images[1] == undefined) {
      alert('Please Select Second Image');
    }
    else if (images[2] == undefined) {
      alert('Please Select Third Image');
    }
    else if (images[3] == undefined) {
      alert('Please Select Fourth Image');
    }
    else {
      setDoc(doc(collection(db, 'ProductList')), {
        UploadedBy: userEmail,
        Manufacturer: companyName,
        Category: category,
        SubCategory: subCategory,
        ProductName: name,
        Description: description,
        Budget: budget,
        Image_1: images[0],
        Image_2: images[1],
        Image_3: images[2],
        Image_4: images[3],


      }).then(

        alert("Product succesfully uploaded"),
        setCategory('Select Product Category'),
        setSubCategory('Select Product Sub-Category'),
        setName(''),
        setDescription(''),
        setBudget(''),
        setImages([])
      )

    }
  }

  return (
    <View style={styles.searchContainer}>

      <Text style={styles.headingStyle}>Post New Product</Text>

      <View style={styles.subContainer}>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.fieldButton}
            onPress={() => {
              setShowCategory(true);
              setSubCategory('Select Product Sub-Category');
            }}
          >
            <Text style={styles.fieldText}>{category}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.fieldButton}
            onPress={() => {
              if (category == "Furniture") {
                setFurnitureHandler(true)
              }
              else if (category == "Fabric Material") {
                setFabricHandler(true)
              }
              else if (category == "Decorated Coverings") {
                setCoveringHandler(true)
              }
              else if (category == "Decoration Accessories") {
                setDecorProductHandler(true)
              }
            }}
          >
            <Text style={styles.fieldText}>{subCategory}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Enter Product Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.descrInput}
          />
        </View>

        <View style={styles.field}>
          <TextInput
            multiline={true}
            placeholder="Add description of Product"
            value={description}
            onChangeText={text => setDescription(text)}
            style={[{ height: 100, textAlignVertical: 'top' }, styles.descrInput]}
          />
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Enter product price"
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
            <Text>Choose images from gallary</Text>
          </TouchableOpacity>
          <Text style={{ color: 'red' }}>*Must upload upto 4 images of size less than 1 MB</Text>
        </View>

        {images[0] && <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{ margin: 10 }}>
          <Image source={{ uri: images[0] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
          <Image source={{ uri: images[1] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
          <Image source={{ uri: images[2] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
          <Image source={{ uri: images[3] }} style={{ marginRight: 10, alignSelf: 'center', width: 100, height: 100, marginTop: '5%' }} />
        </ScrollView>}



        <View style={styles.field}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={addProduct}>
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
              data={ProductCategories}
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
        visible={furnitureHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setFurnitureHandler(!furnitureHandler);

          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={FurnitureProducts}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setFurnitureHandler(!furnitureHandler);
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
        visible={fabricHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setFabricHandler(!fabricHandler)
          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={FabricProducts}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setFabricHandler(!fabricHandler);
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
        visible={coveringHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setCoveringHandler(!coveringHandler)
          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={CoveringProducts}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setCoveringHandler(!coveringHandler);
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
        visible={decorProductHandler}
      >
        <TouchableOpacity style={styles.centeredView}
          onPress={() => {
            setDecorProductHandler(!decorProductHandler)
          }}>
          <View style={styles.modalView_2}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={DecorationProducts}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      setDecorProductHandler(!decorProductHandler);
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
    alignItems: 'center'
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
  descrInput: {
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
    height: 210,
    backgroundColor: "#454545",
    borderRadius: 15,
    elevation: 5
  },
  modalView_2: {
    width: 260,
    height: 220,
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

export default UploadProduct

