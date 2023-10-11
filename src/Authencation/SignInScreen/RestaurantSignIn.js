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
import firestore from '@react-native-firebase/firestore';
// Firebase
import auth from '@react-native-firebase/auth';


const RestaurantSignIn = ({ navigation, route }) => {
    const [restaurant, setRestaurant] = useState({})
    const { height } = useWindowDimensions();


    if (route.params) {
        console.log(route.params);
    }


    const { control, handleSubmit, formState: { errors } } = useForm();

    const SignInButtonPressed = async (data) => {

        //validate user
        try {
            await auth().signInWithEmailAndPassword(data.username, data.password)
            const currentUser = auth().currentUser;
            //get info

            console.log(restaurant);
        } catch (err) {
            console.log(err)
            alert("Đăng nhập thất bại!! Vui lòng kiểm tra ->", err.message);
        }
        if (restaurant) {
            navigation.navigate('RestaurantManager', { data })
        }
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

export default RestaurantSignIn;