import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import CityList from '../../assets/Lists/CityList'
import ProductCategories from '../../assets/Lists/ProductCategories.json'
import FurnitureProducts from '../../assets/Lists/FurnitureProducts.json'
import FabricProducts from '../../assets/Lists/FabricProducts.json'
import DecorationProducts from '../../assets/Lists/DecorationProducts.json'
import CoveringProducts from '../../assets/Lists/CoveringProducts.json'


const SearchProducts = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('Select Product Category');
  const [subCategory, setSubCategory] = useState('Select Product Sub-Category');
  const [showCategory, setShowCategory] = useState(false);
  const [furnitureHandler, setFurnitureHandler] = useState(false);
  const [fabricHandler, setFabricHandler] = useState(false);
  const [decorProductHandler, setDecorProductHandler] = useState(false);
  const [coveringHandler, setCoveringHandler] = useState(false);
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');

  const searchProducts = () => {

    if (category == 'Select Product Category') {
      alert('Please Select Product Category');
    }
    else if (subCategory == 'Select Product Sub-Category') {
      alert('Please Select Product Sub-Category');
    }
    else if (name == '') {
      alert('Please enter product name');
    }
    else if (budget <= 0 || budget == '') {
      alert('Please add valid value for Product Price');
    }
      else{
        navigation.navigate('ProductExploring', { Category: category, SubCategory: subCategory, Name:name, Budget: budget })
      }

  }

  return (
    <View style={styles.searchContainer}>

      <Text style={styles.headingStyle}>Search Products</Text>

      <View style={styles.subContainer}>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.fieldButton}
            onPress={() => {
              setShowCategory(true);
              setSubCategory('Select Product Sub-Category');
            }}>
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
            }}>
            <Text style={styles.fieldText}>{subCategory}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.field}>
          <TextInput
            placeholder="Enter Specific Product Name"
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <TextInput
           placeholder="Enter product price"
           keyboardType="numeric"
           value={budget}
           onChangeText={text => setBudget(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={searchProducts}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Search</Text>
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
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'center',
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

export default SearchProducts

