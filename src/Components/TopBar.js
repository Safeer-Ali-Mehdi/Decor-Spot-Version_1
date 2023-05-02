import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const TopBar = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Decor Spot</Text>

            <TouchableOpacity style={styles.queryButton}
            onPress={()=>{
                navigation.navigate('PostQueryScreen');
            }}>
            <Feather name='help-circle' style={styles.iconStyle} />
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({
    containerStyle:{
        padding:'1%',
        backgroundColor:"#454545",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        position:'relative',
        justifyContent:'center'
    },
    textStyle:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        alignSelf:'center',
        fontStyle:'italic'
    },
    queryButton:{
        position:'absolute',
        right:0,
        marginEnd:15,
    },
    iconStyle:{
        fontSize: 22,
        color: 'white',
        alignSelf:'center'
      },
})

export default TopBar