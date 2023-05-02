import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView, FlatList, Image } from 'react-native'
import React, { useState } from 'react'

import Feather from '@expo/vector-icons/Ionicons';
import CityList from '../../assets/Lists/CityList'
import IdaeCategories from '../../assets/Lists/IdeasCategories.json'
import HomeIdeas from '../../assets/Lists/HomeIdeas.json'
import OccasionIdeas from '../../assets/Lists/OccasionIdeas.json'

const SearchDecorators = () => {
  const [category, setCategory] = useState('Select Idea Category');
  const [subCategory, setSubCategory] = useState('Select Idea Sub-Category');
  const [showCategory, setShowCategory] = useState(false);
  const [homeIdeasHandler, setHomeIdeasHandler] = useState(false);
  const [occasionIdeasHandler, setOccasionIdeasHandler] = useState(false);
  const [city, setCity] = useState('Choose City of Decorator');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
    return (
    <View style={styles.searchContainer}>
      
      <Text style={styles.headingStyle}>Search Decorators & Ideas</Text>

      <View style={styles.subContainer}>

      <View style={styles.field}>
        <TouchableOpacity 
        style={styles.fieldButton}
        onPress={() => {
          setShowCategory(true);
          setSubCategory('Select Idea Sub-Category');
        }}>
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
        }}>
          <Text style={styles.fieldText}>{subCategory}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.field}>
      <TextInput
                placeholder="Enter your Budget"
                // value={email}
                // keyboardType="email-address"
                // maxLength={50}
                // onChangeText={text => setEmail(text)}
                style={styles.input}
              />
      </View>

      <View style={styles.field}>
        <TouchableOpacity style={styles.input}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={{ fontSize: 13 }}>{city}</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.field}>
        <TextInput
          placeholder="Add Specific Address of Decorator"
          value={address}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={()=>{}}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>Search</Text>
              </TouchableOpacity>
            </View>

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
                     
                      setCity(item.name);
                    }}>
                    <Text style={styles.modalText}>{item.name}</Text>
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
  subContainer:{
    width:'100%',
    marginTop:50,
    justifyContent:'center',
    alignItems:'center'
  },
  field:{
    width:'100%',
    flexDirection:'row',
    margin:15,
    justifyContent:'center',
  },
  fieldButton:{
   borderWidth:2,
   borderColor:'#454545',
   width:'70%',
   justifyContent:'center',
   alignItems:'center',
   borderRadius:50,
   paddingHorizontal: 20,
    paddingVertical: 10,
   position:'relative'
  },
  fieldText:{
    fontSize:15,
    fontStyle:'italic',
    alignSelf:'center',
  },
  fieldIconStyle:{
    fontSize:20,
    color:'#454545',
    position:'absolute',
    right:0,
    marginEnd:8
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor:'#454545',
    width:'70%',
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

export default SearchDecorators

