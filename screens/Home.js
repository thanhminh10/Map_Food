/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Platform,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons, SIZES, COLORS, FONTS } from '../constants';
import GeoLocation from 'react-native-geolocation-service';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { restaurantData } from '../data/restaurantData';
import auth from '@react-native-firebase/auth';
import Center from '../src/model/Center/Center';
import Circle from '../src/model/Circle/Circle';



const openweatherkey = 'e8a1b72ec80923a3e9dbe526f1079044'


const Home = ({ navigation }) => {
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
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [currentLocation, setCurrentLocation] = useState([106.80308628095997, 10.870230152234976]);
    const [currentLocationName, setCurrentLocationName] = useState("");
    const [like, setLike] = React.useState(false);
    const [userinfo, setUserinfo] = useState(userinfodefault);

    const [user_favorite, setUser_favorite] = useState([]);



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

    // Get weather
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);


    const getrestaurant = async () => {
        const snapshot = await firestore().collection('restaurants').get()
        const documents = [];
        const restaurant_sub = [];
        snapshot.forEach(doc => {
            documents.push(doc.data());

        })
        setRestaurants(documents)

        if (currentLocation && restaurants) {
            documents.forEach(
                res => {
                    const Area = new Circle(20, currentLocation[0], currentLocation[1]);
                    const inside = Area.DrawCircle(res.location[0], res.location[1]);

                    if (inside > 0) {
                        restaurant_sub.push(res)
                    }
                }
            )
            setRestaurants(restaurant_sub)
        }
    }


    const getcategories = async () => {
        const snapshot = await firestore().collection('categories').get()
        const documents = [];
        snapshot.forEach(doc => {
            documents.push(doc.data());
        })
        setCategories(documents)
    }

    React.useEffect(() => {
        getcategories()
        getrestaurant()
    }, [])


    React.useEffect(() => {
        const getDeviceCurrentLocation = async () => {
            return new Promise((resolve, reject) =>
                GeoLocation.getCurrentPosition(
                    (position) => {
                        resolve(position);
                        setCurrentLocation([position.coords.longitude, position.coords.latitude])
                    },
                    (error) => {
                        console.log(error);
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
    //Get weather


    React.useEffect(() => {
        const getData = async () => {
            // console.log("62", origin.length, destination.length);
            const lat = currentLocation[1];
            const long = currentLocation[0];

            const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${openweatherkey}&lat=${lat}&lon=${long}`
            const dataGet = await axios.get(url)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            if (dataGet) setForecast(dataGet);

        }
        if (currentLocation) getData();
    }, [currentLocation])

    // Get curentlocation Name

    React.useEffect(() => {
        const getData = async () => {

            const url = `https://maps.vietmap.vn/api/reverse/v3?apikey=c0faa23a3ec54da8f8ccd840c472032746264eeb6fa1a74b&lng=${currentLocation[0] ? currentLocation[0] : 106.80308628095997}&lat=${currentLocation[1] ? currentLocation[1] : 10.870230152234976}`

            const dataGet = await axios.get(url)
                .then(function (response) {
                    return response;
                }).then(function (data) {
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


    function onSelectCategory(category) {
        let restaurantsList = restaurantData.filter(a => a.categories.includes(category.id))
        setRestaurants(restaurantsList);
        setSelectedCategory(category);
    }

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
                {(auth().currentUser) ? <TouchableOpacity
                    style={{
                        width: 50,
                        height: "100%",
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        if (auth().currentUser) {
                            auth().signOut()
                            var Logout = true
                            navigation.navigate('SignInScreen', { Logout })
                        } else {
                            var Logout = false;
                            navigation.navigate('SignInScreen', { Logout })
                        }

                    }
                    }
                >
                    <Image
                        source={icons.logout}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />

                </TouchableOpacity> :
                    // Đăng nhập
                    <TouchableOpacity
                        style={{
                            width: 50,
                            height: "100%",
                            paddingLeft: SIZES.padding * 2,
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            if (auth().currentUser) {
                                var Logout = false
                                navigation.navigate('SignInScreen', { Logout })
                            } else {
                                var Logout = false;
                                navigation.navigate('SignInScreen', { Logout })
                            }
                        }
                        }
                    >
                        <Image
                            source={icons.login}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />

                    </TouchableOpacity>

                }
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        width: "70%",
                        height: "90%",
                        backgroundColor: COLORS.lightGray3,
                        alignItems: "center",
                        justifyContent: 'center',
                        borderRadius: SIZES.radius
                    }}>
                        <Text style={{ ...FONTS.h3 }}>Đại Học CNTT</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    width: 50,
                    height: "100%",
                    paddingRight: SIZES.padding * 2,
                    justifyContent: "center",

                }} onPress={() => navigation.navigate('Recommend',
                    {
                        restaurantsRec: restaurants,
                        categoriesRec: categories,
                        forecastRec: forecast,
                        currentLocationRec: currentLocation,
                        currentLocationnameRec: currentLocationName,

                        userinfo,
                        userinfoname: userinfo?.name ? userinfo.name : null,
                        user_favorite: user_favorite ? user_favorite : [],
                    })}>
                    <Image
                        source={icons.khampha}
                        resizeMode="contain"
                        style={{
                            width: 40,
                            height: 40
                        }}
                    />
                </TouchableOpacity>
            </View >
        )
    }

    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        marginLeft: SIZES.padding,
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.primary : COLORS.white),
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View style={{
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray),
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: "center"

                    }}>
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                height: 30,
                                width: 30
                            }}
                        />

                    </View>
                    <Text style={{
                        color: (selectedCategory?.id === item.id ? COLORS.white : COLORS.black),
                        marginTop: SIZES.padding,
                        ...FONTS.body5,
                        fontWeight: "bold"
                    }}>{item.name}</Text>

                </TouchableOpacity>
            )
        }
        return (
            <View style={{ padding: SIZES.padding * 2, position: 'relative' }}>
                <Text style={{ ...FONTS.h1 }}>Danh mục</Text>
                <Text style={{ ...FONTS.h1 }}>Các quán ăn</Text>
                {
                    forecast ? <View style={{ position: 'absolute', right: 0, top: 25, backgroundColor: "#E8E8E8", flex: 1, width: 150, height: "35%", alignItems: 'center', justifyContent: "center", borderRadius: 20 }}>
                        <Image
                            source={{ uri: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png` }}
                            resizeMode="cover"
                            style={{
                                width: "100%",
                                height: 40,
                                justifyContent: 'center',

                            }}
                        />
                        <Text style={{ ...FONTS.h4, textAlign: 'center' }}>Nhiệt độ :{forecast ? Math.round(forecast.main.temp) : ''}°C</Text>

                    </View> : null
                }


                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}

                />
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
                            userinfo,
                            userinfoname: userinfo?.name ? userinfo.name : null,
                            user_favorite: user_favorite ? user_favorite : [],
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
                                borderRadius: SIZES.radius
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
                            {
                                [1, 2, 3].map((priceRating) => {
                                    return (
                                        <Text
                                            key={priceRating}
                                            style={{
                                                ...FONTS.h3,
                                                color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                            }}
                                        >
                                            $
                                        </Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </TouchableOpacity>
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
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

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
export default Home;


