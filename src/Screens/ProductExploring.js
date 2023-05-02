import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Modal, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { db } from '../DatabaseConnection/Firebase'
import { collection, setDoc, doc, getDoc, updateDoc, deleteDoc, docSnap, query, where, getDocs, or } from "firebase/firestore";

import MenuBar from '../Components/MenuBar';
import TopBar from '../Components/TopBar';

const ProductExploring = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { Category, SubCategory, Name, Budget } = route.params;
  let [IdeaList, setIdeaList] = useState([]);
  // let [filterList, setFilterList] = useState([]);
  const [loading, isLoading] = useState(true);
  const [imageHandler, setImageHandler] = useState(false);
  const [Image_1, setImage_1] = useState('');
  const [Image_2, setImage_2] = useState('');
  const [Image_3, setImage_3] = useState('');
  const [Image_4, setImage_4] = useState('');
  let filterList = [];

  useEffect(() => {
    isLoading(true);
    getDocs(query(collection(db, "ProductList"),
      where('Category', '==', Category),
      where('SubCategory', '==', SubCategory),
      // where('ProductName', 'in', [Name.startsWith(`${Name}`), Name.endsWith(`${Name}`) , Name]),
      // // where('ProductName', '==', Name + '\uf8ff'),
      // // where('ProductName', LIKE ,  `%${Name}%`),
      // where('Budget', '>=', `${Budget}`),
      // where('Manufacturer', '==', Manufacturer)
    )).then(docSnap => {
      let list = [];
      docSnap.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      });

      if (list.length === 0) {
        isLoading(false);
        alert('Sorry! No Product is found...');
      }
      else {
        var cleanKeyWords = [];

        for (let i = 0; i < list.length; i++) {

          var keyWord = list[i].ProductName;
          var splitKeyWord = keyWord.split(' ');

          for (let j = 0; j < splitKeyWord.length; j++) {

            cleanKeyWords[j] = splitKeyWord[j].replace(/[^a-z0-9]/gi, '').replace(/s$|es$/i, '');
            var pattern = new RegExp(`${cleanKeyWords[j]}(?:s|es)?`, 'i');

            if (pattern.test(Name)) {

              filterList[i] = list[i];


              break;
            }
          }

        }

        if (filterList.length === 0) {
          setIdeaList(list);
          alert('Sorry! we not found any product, named as ' + `${Name}` + ' but we are trying to show the products according to your remaining search filter')
        }
        else {

          setIdeaList(filterList.filter(Boolean));

        }

      }
      isLoading(false);
    });
  }, []);

  return (
    <View style={styles.containerStyle}>

      <StatusBar
        barStyle='light-content'
        hidden={false}
        backgroundColor="#454545"
        translucent={false}
      />

      <TopBar style={styles.topbarStyle} />


      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 3, }}>
        {loading ? (<View><ActivityIndicator size="large" color='#454545' /></View>) : <FlatList
          data={IdeaList}
          scrollEnabled={true}
          // keyExtractor={item => item.id}
          renderItem={({ item }) => {

            // console.log(item.id);

            return (
              <View style={styles.container}>
                <View style={styles.subContainer}>
                  <View style={styles.cardStyle}>

                    <View style={styles.imageContainer}>
                      <Image source={{ uri: item.Image_1 }} style={styles.imageStyle} />
                    </View>

                    <TouchableOpacity
                      style={styles.imageExpand}
                      onPress={() => {
                        setImage_1(item.Image_1);
                        setImage_2(item.Image_2);
                        setImage_3(item.Image_3);
                        setImage_4(item.Image_4);

                        setImageHandler(true);
                      }}>
                      <Feather name='maximize-2' style={styles.iconStyle} />
                      <Text style={styles.imageExpandLink}>Click here to view more images</Text>
                    </TouchableOpacity>



                    <View style={styles.contentStyle}>
                      <View style={styles.descriptionSection}>

                        <View style={styles.name_field}>
                          <Text style={styles.nametextStyle}>{item.ProductName}</Text>

                        </View>

                        <View style={styles.price_field}>
                          <Feather name='dollar-sign' style={{ fontSize: 20 }} />
                          <Text style={styles.priceTextStyle}>{item.Budget} rs</Text>
                        </View>

                        <View style={styles.businessContainer}>
                          <Text style={styles.businessheading}>Product Description</Text>
                          <Text style={styles.businessText}>{item.Description}</Text>
                        </View>

                      </View>

                      <View style={styles.functionSection}>
                        <View style={styles.buttonPosition}>
                          <TouchableOpacity style={styles.buttonStyle}
                          onPress={()=>{
                            setDoc(doc(collection(db, 'FavoriteProducts')), {
                                UploadedBy: item.UploadedBy,
                                Manufacturer: item.Manufacturer,
                                Category: item.Category,
                                SubCategory: item.SubCategory,
                                ProductName: item.ProductName,
                                Description: item.Description,
                                Budget: item.Budget,
                                Image_1: item.Image_1,
                                Image_2: item.Image_2,
                                Image_3: item.Image_3,
                                Image_4: item.Image_4,
                        
                        
                              }).then(
                        
                                alert("Product succesfully added to Favorites"),
                              )
                        
                        }}>
                            <Feather name='star' style={styles.favorateiconStyle} />
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.buttonStyle}>
                            <Feather name='shopping-cart' style={styles.favorateiconStyle} />
                          </TouchableOpacity>
                        </View>

                      </View>
                    </View>

                    <View style={styles.linkPosition}>
                      <Text style={styles.linkHeading}>Manufacturer : </Text>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('ViewProductSellerProfile', { Company: item.Manufacturer });
                        }}>
                        <Text style={styles.linkStyle}>{item.Manufacturer}</Text>
                      </TouchableOpacity>
                    </View>



                  </View>
                </View>

                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={imageHandler}
                >
                  <ScrollView
                    contentContainerStyle={styles.centeredView}
                    horizontal={true}
                    scrollEnabled={true}
                  >
                    <ScrollView>
                      <TouchableOpacity
                        style={styles.imageBorder}
                        onPress={() => {
                          setImageHandler(!imageHandler)
                        }}>
                        <Image source={{ uri: Image_1 }} style={styles.imageStyle} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.imageBorder}
                        onPress={() => {
                          setImageHandler(!imageHandler)
                        }}>
                        <Image source={{ uri: Image_2 }} style={styles.imageStyle} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.imageBorder}
                        onPress={() => {
                          setImageHandler(!imageHandler)
                        }}>
                        <Image source={{ uri: Image_3 }} style={styles.imageStyle} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.imageBorder}
                        onPress={() => {
                          setImageHandler(!imageHandler)
                        }}>
                        <Image source={{ uri: Image_4 }} style={styles.imageStyle} />
                      </TouchableOpacity>
                    </ScrollView>


                  </ScrollView>
                </Modal>

              </View>
            );

          }}
        />}

      </View>


      <MenuBar style={styles.setMenuBar} />

    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 5,
    backgroundColor: 'white',
  },
  topbarStyle: {
    flex: 1,
  },
  contentStyle: {
    flex: 3,
  },
  setMenuBar: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
  },
  subContainer: {
    margin: 15,
  },
  cardStyle: {
    alignItems: 'center',
    elevation: 5,
    // borderWidth:1,
    backgroundColor: '#E1D9D1',
    borderColor: '#454545',
    // backgroundColor: "white",
    width: '100%',
    borderRadius: 10,
  },
  contentStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  descriptionSection: {
    width: '86%',

  },
  functionSection: {
    width: '14%',
  },
  name_field: {
    marginVertical: 30,
    alignSelf: 'center'
  },
  nametextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'justify'
  },
  price_field: {
    flexDirection: 'row',
    marginStart: 10,
    alignItems: 'center'
  },
  priceTextStyle: {
    marginStart: 15,
    fontSize: 15,
    // fontWeight:'bold'
  },
  buttonPosition: {
    // marginTop:15
  },
  buttonStyle: {
    marginTop: 20
  },
  favorateiconStyle: {
    fontSize: 31,
    color: '#454545',
  },
  businessContainer: {
    alignSelf: 'stretch',
    marginStart: 15,
    marginTop: 20,
  },
  businessheading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  businessText: {
    fontSize: 13,
    textAlign: 'justify'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    margin: 5,
    width: '96%',
    borderColor: '#000000',
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.2,
    borderRadius: 8,
    resizeMode: 'stretch'

  },
  imageExpand: {
    flexDirection: 'row',
    marginTop: 10
  },
  imageExpandLink: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  iconStyle: {
    fontSize: 20,
    marginEnd: '2%'
  },
  linkPosition: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  linkHeading: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  linkStyle: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },

  textStyle: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    fontStyle: "italic",
    textAlign: 'center'
  },
  centeredView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center",
  },
  imageBorder: {
    margin: 20,
    elevation: 10,
    borderRadius: 8,
  }

})

export default ProductExploring

