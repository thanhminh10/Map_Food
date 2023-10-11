 import { View, Text, StyleSheet, Pressable } from 'react-native'
 import React from 'react'
 


 const CustomButton = ({onPress, text, type }) => {
   return (
     <Pressable 
     onPress={onPress} 
     style={[styles.container, styles[`container_${type}`]]}>
       <Text 
       style={[styles.text, styles[`text_${type}`]]}
       
       >{text}</Text>
     </Pressable>
   )
 }
 

 const styles = StyleSheet.create({
    container:{
        backgroundColor: '#3B71F3',
        width: '100%',
        padding:14,
        marginVertical: 5,

        alignItems: 'center',
        borderRadius: 5,
    },

    container_primary:{
        backgroundColor: '#3B71F3',
    },

    container_tertiary:{
        backgroundColor: 'white',

        borderRadius:3,
        borderColor: 'grey',
        
    },

    container_secondary:{
      borderColor:'#3B71F3',
      borderWidth: 2,
    },
    text:{
        fontWeight: 'bold',
        color: 'white',
    },

    text_primary:{

    },

    text_tertiary:{
        color:'grey',
    },

    text_secondary:{
      color: '#3B71F3',
      
    },


 });
 export default CustomButton