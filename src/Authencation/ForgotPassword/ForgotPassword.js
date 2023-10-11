import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { Text, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";




const ForgotPassword = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');

    const SendPressed = () => {
        navigation.navigate('NewPassword')
    }
    
    const BackSignInPressed =()=>{
        navigation.navigate('SignInScreen')
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Reset your password</Text>

                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}></CustomInput>
                <CustomButton
                    text="Send" 
                    onPress={SendPressed}></CustomButton>

                <CustomButton
                    text="Back to Sign in" 
                    onPress={BackSignInPressed}
                    type="tertiary"></CustomButton>
            </View>

        </ScrollView>
    );
};


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

export default ForgotPassword;