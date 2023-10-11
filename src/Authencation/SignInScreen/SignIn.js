/* eslint-disable prettier/prettier */
import React from "react";
import { View, Image, StyleSheet, useWindowDimensions, } from "react-native"
import Logo from '../../accest/img/logoMapfood.png'
import CustomInput from '../CustomInput/CustomInput';
import { useState, } from "react";
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from "@react-navigation/native";
import { useForm, } from 'react-hook-form'
import { ScrollView } from "react-native";

// Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignInScreen = ({ route }) => {
    const [userinfo, setUserinfo] = useState(null)
    const { height } = useWindowDimensions();
    const navigation = useNavigation();

    if (route.params) {
        console.log(route.params);
    }


    const { control, handleSubmit, formState: { errors } } = useForm();
    // if (auth().currentUser)
    // {
    //     console.log(route.params)
    //     if (route.params){
    //         auth().signOut()
    //         .then(()=>{
    //             console.log('Logout Success')
    //         });
    //     }
    //     else {
    //         console.log('Logout Failed')
    //     }
    // }
    const SignInButtonPressed = async (data) => {
        //validate user
        try {
            await auth().signInWithEmailAndPassword(data.username, data.password)
            const currentUser = auth().currentUser;
            //get info
            await firestore().collection('Users')
                .doc(currentUser.uid)
                .onSnapshot(documentSnapshot => {
                    // console.log('User data: ', documentSnapshot.data());
                    setUserinfo(documentSnapshot.data())
                });
            console.log(userinfo)

        } catch (err) {
            console.log(err)
            alert("Đăng nhập thất bại!! Vui lòng kiểm tra ->", err.message);
        }
        if (userinfo) {
            navigation.navigate('User', { userinfo })
        }
    }

    const ForgotInButtonPressed = () => {
        navigation.navigate('ForgotPassword')
    }

    const CreateAccount = () => {
        navigation.navigate('SignUpScreen')
    }


    const Res_Login = () => {
        navigation.navigate('RestaurantSignIn');
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image
                    source={Logo}
                    style={[styles.Logo, { height: height * 0.3 }]}
                    resizeMode="contain"></Image>

                <CustomInput
                    name="username"
                    rules={{}}
                    placeholder="Username"
                    control={control}
                />

                <CustomInput
                    placeholder="password"
                    name="password"
                    rules={{}}
                    control={control}
                    secureTextEntry={true} />


                <CustomButton text="Sign In"
                    onPress={handleSubmit(SignInButtonPressed)} />
                <CustomButton text="Forgot Password?"
                    onPress={handleSubmit(ForgotInButtonPressed)}
                    type="tertiary"></CustomButton>

                <CustomButton text="Don't have account? Create one."
                    onPress={handleSubmit(CreateAccount)}
                    type="tertiary"></CustomButton>
                <CustomButton text="Quay về nhà"
                    onPress={() => navigation.goBack()}
                    type="tertiary"></CustomButton>


                <CustomButton text="Đăng nhập cho nhà hàng?"
                    onPress={() => Res_Login()}
                    type="tertiary"></CustomButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9FBFC',
    },
    Logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    }
})

export default SignInScreen;