/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    FlatList,
    Platform,
    Text,
    Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import { restaurantData, RecommendTag } from '../data/restaurantData';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Circle from '../src/model/Circle/Circle';


const openweatherkey = 'e8a1b72ec80923a3e9dbe526f1079044'


const Recommend = ({ navigation, route }) => {
    var userinfodefault = {
        age: 0,
        email: "",
        favorite: [],
        name: "",
        password: "",
    };



    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);


    const [recommendtag, setRecommendtag] = useState([]);
    const [selectedrecommendtag, setSelectedRecommendtag] = useState([]);


    const [restaurants, setRestaurants] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [currentLocationName, setCurrentLocationName] = useState(null);
    const [like, setLike] = React.useState(false);

    // Get weather
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Get User
    const [user_info, setUserinfo] = useState(userinfodefault);


    // Get Rating
    const [rating, setRating] = useState([]);

    //---------------------------------------------------------------
    // get UserID
    let { restaurantsRec, categoriesRec, forecastRec, currentLocationRec, currentLocationnameRec, userinfo, user_infoname, user_favorite } = route.params;
    useEffect(() => {

        setUserinfo(userinfo)
        setCategories(categoriesRec);
        setRecommendtag(RecommendTag);
        setForecast(forecastRec)
        setRestaurants(restaurantsRec);
        setCurrentLocation(categoriesRec);
        setCurrentLocationName(currentLocationnameRec);
    }, [])


    const getratinglist = async () => {
        const snapshot = await firestore().collection('restaurants').get()
        const documents = [];

        snapshot.forEach(doc => {
            if (doc.data().rating >= 4) {
                documents.push(doc.data());
            }
        })
        setRestaurants(documents)
    }

    const getAreares = async () => {
        const snapshot = await firestore().collection('restaurants').get()
        const documents = [];
        const restaurant_sub = []
        snapshot.forEach(doc => {
            documents.push(doc.data())
        })
        setRestaurants(documents)

        if (currentLocation && restaurants) {
            restaurants.forEach(
                res => {

                    const Area = new Circle(1000, currentLocationRec[1], currentLocationRec[0]);
                    const inside = Area.DrawCircle(res.location[1], res.location[0]);
                    console.log(inside, Area)
                    if (inside < 0) {

                        restaurant_sub.push(res)
                    }
                }
            )
        }
        setRestaurants(restaurant_sub)
        console.log(restaurants[0].name)
    }

    // Chức năng filter cho recomemd 
    function onSelectRec(rec) {
        let restaurantsList = [];
        var forecast_temp = Math.round(forecast.main.temp);
        const temp = [];
        const temp_id = [];
        if (rec.id == 2 && !auth().currentUser || auth().currentUser.email == "quan1@gmail.com") {
            navigation.navigate('SignInScreen');
        }
        else {
            switch (rec.id) {
                case 1:
                    console.log('Thời tiết');
                    switch (true) {
                        case forecast_temp >= 30:
                            alert('Hiện tại thời tiết khá nóng !!');
                            restaurantsList = [8, 9];
                            break;

                        case forecast_temp >= 25 && forecast_temp < 30:
                            alert('Hiện tại thời tiết mát mẻ !!');
                            restaurantsList = [1, 2, 4, 5, 6];
                            break;
                        case forecast_temp < 25:
                            alert('Thời tiết lạnh ạ');
                            restaurantsList = [1, 2, 3, 4];
                            break;
                        default:
                            alert("Có nhiệt độ chưa ?");
                    }
                    break;
                case 2:
                    switch (true) {
                        case user_info.age > 0 && user_info.age <= 20:
                            restaurantsList = [7, 8, 9]
                            break;

                        case user_info.age > 20 && user_info.age <= 50:
                            restaurantsList = [1, 2, 3, 4, 6]
                            break;
                        case user_info.age > 50:
                            restaurantsList = [1, 2, 3]
                            break;
                        default:
                            alert("Chưa đăng nhập");
                    }
                    break;

                case 3:
                    getratinglist()
                    alert("Danh sách những quán phổ biến nhất hiện tại !!");

                    break;
                case 4:
                    getAreares()
                    alert("Quán ăn gần bạn");
                    break;
                default:
                    alert("NUMBER NOT FOUND");

            }
        }

        // setRestaurants(restaurantsList);


        const restaurantsfilter = restaurantData.forEach(a => restaurantsList.forEach(i => {
            // thêm phần tử vào danh sách 
            if (a.categories.includes(i) && !temp_id.includes(a.id)) {
                // Để loại bỏ các phần tử trùng lặp nếu có
                temp_id.push(a.id);
                // Thêm phần tử vào nếu không bị trùng
                temp.push(a);
            }
        }))

        // temp.forEach((a, i) => console.log(i, a));
        setRestaurants(temp);
        setSelectedCategory(rec);
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
            <View style={{
                flexDirection: 'row',
                marginTop: (Platform.OS == "android" ? 30 : 0)
            }}>
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.padding * 2,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            justifyContent: "center"
                        }}
                    />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <View style={{
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: SIZES.padding * 3,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray3
                    }}>
                        <Text style={{ ...FONTS.h3 }}>Các Gợi Ý Cho Bạn</Text>
                    </View>

                </View>
            </View>
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
                    onPress={() => onSelectRec(item)}
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
                <Text style={{ ...FONTS.h1, textAlign: 'center' }}>Danh Mục</Text>
                <Text style={{ ...FONTS.h1, textAlign: 'center' }}>Gợi ý</Text>
                <FlatList
                    data={recommendtag}
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
                            currentLocation: currentLocationRec,
                            currentLocationName: currentLocationnameRec,

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

export default Recommend
