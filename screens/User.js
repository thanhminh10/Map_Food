/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, Image } from 'react-native'
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
    Button,
} from 'react-native-paper';

import { COLORS, icons } from "../constants"
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const User = ({ navigation }) => {

    // props from Login
    var userid = {
        age: 0,
        email: "",
        favorite: [],
        name: "",
        password: "",
        Orderlist: [],
    };

    const [userinfo, setUserinfo] = useState(userid);

    useEffect(() => {
        const reload = async () => {
            if (auth().currentUser) {
                userid = auth().currentUser.uid;
                const getuserid = async (userid) => {
                    const user = await firestore().collection('Users').doc(userid).get()
                        .then(res => setUserinfo(res.data()))
                }
                getuserid(userid)
            }
            console.log('reload')
        }

        const unsubscribe = navigation.addListener('focus', () => {
            reload()
        });

        return unsubscribe;

    }, [userid])
    const myCustomShare = () => {
        console.log(userinfo);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/mapfood-884b0.appspot.com/o/images%2Favatar.jpg?alt=media&token=a371b4c0-10ec-4c0f-aa14-f1b9a457f813',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{
                                userinfo.name ?
                                    userinfo.name
                                    : <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <Button onPress={() => { navigation.navigate('SignInScreen') }}>
                                            <Text style={{
                                                color: '#000000',
                                                fontSize: 15,
                                            }}>Đăng nhập</Text>
                                        </Button>
                                        <Text style={{
                                            paddingTop: 10
                                        }} >/</Text>
                                        <Button onPress={() => { navigation.navigate('SignUpScreen') }}>
                                            <Text style={{
                                                color: '#000000',
                                                fontSize: 15,

                                            }}>Đăng kí</Text></Button>
                                    </View>
                            }</Title>

                    </View>
                </View>
            </View>

            {auth() ? <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Image
                        source={icons.birthday}
                        resizeMode="contain"
                        style={{

                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userinfo.age}</Text>
                </View>
                <View style={styles.row}>
                    <Image
                        source={icons.phone}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userinfo.sdt}</Text>
                </View>
                <View style={styles.row}>
                    <Image
                        source={icons.email}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                    <Text style={{ color: "#777777", marginLeft: 20 }}>{userinfo.email}</Text>
                </View>
            </View> : null}


            <TouchableRipple onPress={() => {
                navigation.navigate('MyOrderlist', { userinfo })
            }}>
                <View style={styles.infoBoxWrapper}>
                    <View style={styles.infoBox}>
                        <Title>{userinfo.Orderlist ? userinfo.Orderlist.length : 0}</Title>
                        <Caption>Orders list</Caption>
                    </View>
                </View>
            </TouchableRipple>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => { navigation.navigate('Favorites') }}>
                    <View style={styles.menuItem}>
                        <Image
                            source={icons.like}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.primary
                            }}
                        />
                        <Text style={styles.menuItemText}>Các địa điểm ưu thích</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { navigation.navigate('Home') }}>
                    <View style={styles.menuItem}>
                        <Image
                            source={icons.home}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.primary
                            }}
                        />
                        <Text style={styles.menuItemText}>Trang Chủ</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => { navigation.navigate('Search') }}>
                    <View style={styles.menuItem}>
                        <Image
                            source={icons.search}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.primary
                            }}
                        />
                        <Text style={styles.menuItemText}>Tìm kiếm</Text>
                    </View>
                </TouchableRipple>

                <TouchableRipple onPress={() => { navigation.navigate('SignInScreen') }}>
                    <View style={styles.menuItem}>
                        <Image
                            source={icons.logout}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.primary
                            }}
                        />
                        <Text style={styles.menuItemText}>Đăng xuất</Text>
                    </View>
                </TouchableRipple>



            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});

export default User;