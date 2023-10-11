/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions } from "react-native";
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import { useNavigation } from "@react-navigation/native";

import { set, useForm } from "react-hook-form";
import { user } from "../../../constants/icons";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {

    const { control, handleSubmit, formState: { errors } } = useForm();
    const [userid, setUserid] = useState(null);
    const navigation = useNavigation();
    const RegisterPressed = async (data) => {
        try {

            await auth().createUserWithEmailAndPassword(data.email, data.password);
            const currentUser = auth().currentUser;
            data.userid = currentUser.uid
            data.favorite = [];
            data.Orderlist = [];
            await firestore().collection("Users")
                .doc(currentUser.uid)
                .set(data);
        } catch (err) {
            console.log(err)
            alert("Đăng ký thất bại!! Vui lòng kiểm tra ->", err.message);
        }
        navigation.navigate('SignInScreen', { data })
    }


    const BackSignInPressed = () => {
        navigation.navigate('SignInScreen')
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            <CustomInput
                type="default"
                placeholder="Tên"
                name="name"
                control={control}
                rules={{
                    required: 'Username is required',
                    minLength: {
                        value: 3,
                        message: 'Username should be minium 3 characters long',
                    },
                    maxLength: {
                        value: 110,
                        message: 'Username should be minium 15 characters long',
                    }
                }}
            />
            <CustomInput
                type="default"
                placeholder="Email"
                name="email"
                control={control}
                rules={{
                    required: 'Email is required',
                    minLength: {
                        value: 3,
                        message: 'Email should be minium 3 characters long',
                    },
                    maxLength: {
                        value: 70,
                        message: 'Email should be minium 15 characters long',
                    }
                }}
            />

            <CustomInput
                type="default"
                placeholder="Password"
                name="password"
                control={control}
                secureTextEntry={true}
                rules={{
                    required: 'Password is required',
                    minLength: {
                        value: 3,
                        message: 'Password should be minium 3 characters long',
                    },
                }}
            />
            <CustomInput
                type="numeric"
                placeholder="Tuổi"
                name="age"
                control={control}
                secureTextEntry={false}
                rules={{
                    required: 'Age is required',
                    minLength: {
                        value: 1,
                        message: 'Password should be minium 3 characters long',
                    },
                }}
            />

            <CustomInput
                type="numeric"
                placeholder="Nhập sdt"
                name="sdt"
                control={control}
                secureTextEntry={false}
                rules={{
                    required: 'Vui lòng nhập sdt',
                    minLength: {
                        value: 1,
                        message: 'Password should be minium 3 characters long',
                    },
                }}
            />


            <CustomButton text="Register"
                onPress={handleSubmit(RegisterPressed)}
                type="primary"></CustomButton>

            <CustomButton text="Back to Sign in"
                onPress={handleSubmit(BackSignInPressed)}
                type="tertiary"></CustomButton>

            <Text style={styles.text}>By registering, you confirm that you accept our <Text style={styles.link}> Terms of Use</Text> and
                <Text style={styles.link}> Privacy Policy</Text>
            </Text>


        </View>
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
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C68',
        margin: 10,
    },

    text: {
        color: 'gray',
        marginVertical: 10,
    },

    link: {
        color: '#FDB075',
    },
})

export default SignUpScreen;