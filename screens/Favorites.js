/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Text,
    Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import GeoLocation from 'react-native-geolocation-service';



const Favorites = ({ navigation }) => {
    var userinfodefault = {
        age: 0,
        email: "",
        favorite: [],
        name: "",
        password: "",
    };

    const [categories, setCategories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [currentLocation, setCurrentLocation] = useState([106.80308628095997, 10.870230152234976]);
    const [currentLocationName, setCurrentLocationName] = useState("");
    const [like, setLike] = React.useState(false);

    const [userinfo, setUserinfo] = useState(userinfodefault);

    const [user_favorite, setUser_favorite] = useState([]);

    var userid = auth().currentUser;
    if (auth().currentUser) {
        userid = userid.uid;
    }
    useEffect(() => {
        const reload = async () => {
            if (auth().currentUser) {
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


    React.useEffect(() => {
        if (userinfo) {
            setUser_favorite(userinfo.favorite)
        }
    }, [userinfo])


    const getrestaurant = async () => {
        const snapshot = await firestore().collection('restaurants').get()
        const documents = [];
        snapshot.forEach(doc => {
            if (userinfo) {
                if (userinfo.favorite.includes(doc.data().id)) {
                    documents.push(doc.data());
                }
            }

        })
        setRestaurants(documents)
    }

    const getcategories = async () => {
        const snapshot = await firestore().collection('categories').get()
        const documents = [];
        snapshot.forEach(doc => {
            documents.push(doc.data());
        })
        setCategories(documents)
    }

    useEffect(() => {
        getrestaurant();
        getcategories();
    }, [userinfo])

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
    }, [restaurants])


    // Get curentlocation Name
    React.useEffect(() => {
        const getData = async () => {
            // console.log("62", origin.length, destination.length);
            const url = `https://maps.vietmap.vn/api/reverse?api-version=1.1&apikey=c0faa23a3ec54da8f8ccd840c472032746264eeb6fa1a74b&point.lat=${currentLocation[1]}&point.lon=${currentLocation[0]}&layers=street&size=1&boundary.circle.radius=0.5`
            const dataGet = await axios.get(url)
                .then(function (response) {
                    return response;
                }).then(function (data) {
                    return data.data.data.features[0].properties.label;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            if (dataGet) setCurrentLocationName(dataGet);
            // console.log("79", dataGet);
        }
        if (currentLocation) getData();
    }, [currentLocation])

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id);
        if (category.length > 0) {
            return category[0].name
        }
        return ""
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50, marginTop: Platform.OS == "android" ? 35 : 0 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: "70%",
                        height: "90%",
                        backgroundColor: COLORS.lightGray3,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}>
                        <Text style={{ ...FONTS.h3 }}>Các quán ăn yêu thích</Text>
                    </View>
                </View>
            </View>
        )
    }

    function renderRestaurantList() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding * 2 }}
                    onPress={() => {
                        navigation.navigate('Restaurants', {
                            item,
                            currentLocation,
                            currentLocationName,
                            user_favorite: user_favorite ? user_favorite : [],
                            userinfo,
                            userinfoname: userinfo?.name ? userinfo.name : null,
                        })
                    }}
                >
                    <View>
                        <Image
                            source={item.photo}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: 200,
                                borderRadius: SIZES.radius,
                            }}
                        />


                    </View>

                    {/* Restaurant Info */}
                    <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: SIZES.padding,
                    }}>
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
                        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>
                        {/* Categories */}
                        <View style={{
                            flexDirection: 'row',
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
                            {/* Price */}
                        </View>
                    </View>
                </TouchableOpacity >
            )
        }
        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                initialNumToRender={4}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30,
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {userinfo.favorite ? renderRestaurantList() : null}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Favorites;