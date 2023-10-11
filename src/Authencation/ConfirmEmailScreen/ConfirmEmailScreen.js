import { View, Text, StyleSheet, useWindowDimensions, useState } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {

    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const ConfirmPressed = () => {
        navigation.navigate('Home');
    }

    const ResendPressed = ()=>{

    }

    const SignInBackPressed = ()=>{
        navigation.navigate('SignInScreen')
    }

  return (
    <View style={styles.root}>
            <Text style={styles.title}>Comfirm your email</Text>
            <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode}/>
            


            <CustomButton text="Confirm" 
            onPress={ConfirmPressed}
            type="primary"></CustomButton>


            <CustomButton text="Resend code" 
            onPress={ResendPressed}
            type="secondary"></CustomButton>

            <CustomButton text="Back to Sign in" 
            onPress={SignInBackPressed}
            type="tertiary"></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
        backgroundColor:'#F9FBFC',
    },
    Logo: {
        width:'70%',
        maxWidth: 300,
        maxHeight: 200,
    },

    title:{
        fontSize: 24,
        fontWeight:'bold',
        color: '#051C68',
        margin: 10,
    },

    text:{
        color: 'gray',
        marginVertical: 10,
    },

    link:{
        color: '#FDB075',
    },
})

export default ConfirmEmailScreen