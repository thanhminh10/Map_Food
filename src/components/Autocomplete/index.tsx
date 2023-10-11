/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable curly */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from "react";
import {
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    FlatList,
    Pressable,
    View, TouchableOpacity, Image
} from "react-native";

import { icons, SIZES, COLORS, FONTS } from "../../../constants";
import { Location } from "../../types/location";
import GeoLocation from 'react-native-geolocation-service';

import { useNavigation } from '@react-navigation/native';

import vietmapapi from "../../config/env";
import firestore from '@react-native-firebase/firestore';
import { restaurantData } from '../data/restaurantData';
import auth from '@react-native-firebase/auth';
const vietmap_api = vietmapapi.Token
import axios from 'axios';
export default function TabTwoScreen() {
    var userid = auth().currentUser;

    if (auth().currentUser) {
        userid = userid.uid;
    }
    var userinfodefault = {
        age: 0,
        email: "",
        favorite: [],
        name: "",
        password: "",
    };

    const navigation = useNavigation();
    const [input, setInput] = useState<string>();
    const [data, setData] = useState<Location[]>([]);
    const [datafiltered, setDatadatafiltered] = useState<Location[]>([]);
    const [categories, setCategories] = useState([]);
    const [currentLocationName, setCurrentLocationName] = useState("");
    const [userinfo, setUserinfo] = useState(userinfodefault);

    const [currentLocation, setCurrentLocation] = useState(null);
    const [user_favorite, setUser_favorite] = useState([]);

    React.useEffect(() => {
        const getDeviceCurrentLocation = async () => {
            return new Promise((resolve, reject) =>
                GeoLocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                        setCurrentLocation([position.coords.longitude, position.coords.latitude])
                    },
                    (error) => {
                        reject(error);
                    },
                    {
                        enableHighAccuracy: true, // Whether to use high accuracy mode or not
                        timeout: 15000, // Request timeout
                        maximumAge: 10000 // How long previous location will be cached
                    }
                )
            );
        };
        getDeviceCurrentLocation();
    }, [])
    React.useEffect(() => {
        const getData = async () => {

            const url = `https://maps.vietmap.vn/api/reverse/v3?apikey=c0faa23a3ec54da8f8ccd840c472032746264eeb6fa1a74b&lng=${currentLocation[0] ? currentLocation[0] : 106.80308628095997}&lat=${currentLocation[1] ? currentLocation[1] : 10.870230152234976}`

            const dataGet = await axios.get(url)
                .then(function (response) {
                    return response;
                }).then(function (data) {
                    console.log(data.data[0].display);
                    return data.data[0].display;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            if (dataGet) setCurrentLocationName(dataGet);
        }
        if (currentLocation) getData();
    }, [currentLocation])

    useEffect(() => {
        const reload = async () => {
            if (auth().currentUser) {
                const getuserid = async (userid) => {
                    const user = await firestore().collection('Users').doc(userid).get()
                        .then(res => {
                            setUserinfo(res.data())
                            return res.data()
                        })
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

    React.useEffect(() => {
        if (userinfo) {
            setUser_favorite(userinfo.favorite)
        }
    }, [userinfo])

    console.log(currentLocationName, currentLocation, user_favorite);


    //  Tránh việc gọi lại hàm khi không thay đổi giá trị
    const getrestaurant = useCallback(async () => {
        const snapshot = await firestore().collection('restaurants').get()
        const documents = [];
        snapshot.forEach(doc => {
            documents.push(doc.data());

        })
        let data: Location[] = documents;
        setData(data)
    }, [datafiltered]);



    const getcategories = useCallback(async () => {
        const snapshot = await firestore().collection('categories').get()
        const documents = [];
        snapshot.forEach(doc => {
            documents.push(doc.data());

        })
        let doc: Location[] = documents;
        setCategories(doc)
    }, [categories]);



    useEffect(() => {
        getrestaurant()
        getcategories();
    }, [])

    const findFilm = (text: string) => {
        setInput(text)
        // Method called every time when we change the value of the input
        if (text) {


            // Making a case insensitive regular expression
            const regex = new RegExp(`${text.trim()}`, 'i');

            // Setting the filtered film array according the query

            setDatadatafiltered(
                data.filter((item) => item.name.search(regex) >= 0)
            );
        } else {
            // If the query is null then return blank
            setDatadatafiltered([]);
        }
    };


    const getItemText = (item: Location) => {


        let mainText = item.name;
        let photo = item.photo;

        function getCategoryNameById(id) {


            let category = categories.filter(a => a.id == id);

            if (category.length > 0) {
                return category[0].name
            }
            return ""
        }


        return (
            <View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
                <TouchableOpacity
                    style={{ width: "100%", flexDirection: "row", }}
                    onPress={() => {
                        navigation.navigate("Restaurants", {
                            item,
                            currentLocation,
                            currentLocationName,
                            restaurantName: item.name,
                            user_favorite,
                            currentLocation: [currentLocation[0], currentLocation[1]],
                        })
                    }}
                >
                    <View>
                        <Image
                            source={item.photo}
                            resizeMode="cover"
                            style={{
                                width: 150,
                                height: 150,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </View>

                    {/* Restaurant Info */}


                    <View style={{
                        flexDirection: 'column',
                        marginTop: SIZES.padding,
                    }}>
                        <Text style={{ ...FONTS.body3, marginLeft: 10, }}>{item.name}</Text>
                        <View style={{ flexDirection: "row", marginLeft: 10 }}>
                            <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
                            <Image
                                source={icons.star}
                                resizeMode="contain"
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.ratings,
                                    marginRight: 10
                                }}

                            />
                        </View>

                        {/* Categories */}
                        <View style={{
                            flexDirection: 'column',
                            marginLeft: 10,
                        }}>
                            {
                                item.categories.map((categoryId) => {
                                    return (
                                        <View
                                            key={categoryId}
                                            style={{
                                                flexDirection: 'row',
                                            }}
                                        >
                                            <Text style={{ ...FONTS.body3, }}>{getCategoryNameById(categoryId)}</Text>
                                            <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>


                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity >
            </View>
        );
    };


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={{ flex: 1, height: '100%', marginBottom: 80 }}>
                <Text style={{ marginLeft: 12, marginVertical: 5, fontSize: 12 }}>
                    Tìm kiếm địa điểm
                </Text>
                <TextInput
                    onChangeText={findFilm}
                    value={input}
                    style={{
                        height: 40,
                        marginHorizontal: 12,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}
                    placeholder="Nhập tên quán ăn"
                />
                {input && data.length > 0 ? (
                    <FlatList
                        data={datafiltered}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable
                                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
                                onPress={() => {
                                    navigation.navigate("Restaurants", {
                                        item,
                                        currentLocation,
                                        currentLocationName,
                                        restaurantName: item.name,
                                        user_favorite,
                                        currentLocation: [currentLocation[0], currentLocation[1]],
                                    })
                                }
                                }
                            >
                                {getItemText(item)}
                            </Pressable>
                        )}
                        keyExtractor={(item, index) => item.id}
                    />
                ) : null}
            </SafeAreaView>
        </TouchableWithoutFeedback >
    );
}