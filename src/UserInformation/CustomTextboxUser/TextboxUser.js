import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const TextboxUser = ({placeholder, readonly}) => {
  return (
    <View style={styles.textbox}>
      <TextInput
        placeholder={placeholder}
        readOnly={readonly}
        ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
    
    textbox:{
        alignSelf:'center',
        flexDirection: 'row',
        justifyContent:'flex-start',
        backgroundColor:'white',
        width: '90%',
        height:'10%',
        padding: 20,
        paddingBottom: 22,
        borderRadius:10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    }
})

export default TextboxUser