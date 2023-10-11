/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect } from 'react';
import {
    SafeAreaView,
    Platform,
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Button
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { icons, COLORS, FONTS, SIZES, Images } from '../constants';
import Favourite from '../src/components/Favourite';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { Review } from '../src/components/Review';
import { Rating } from "react-native-ratings";

import { Comment } from '../src/components/Comment';

import Star from '../src/components/Star/Star';

const Restaurants = ({ route, navigation }) => {
    var userid = auth().currentUser;


    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [restaurantid, setRestaurantid] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [currentLocationName, setCurrentLocationName] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);
    const [like, setLike] = React.useState(false);
    const [userinfomation, setUserinfomation] = React.useState({});
    const [username, setUsername] = React.useState(false);
    const [getcomment, setGetcomment] = React.useState(false);
    const [star, setStar] = React.useState(1);
    const [Orderlist, setOrderlist] = React.useState([]);

    if (auth().currentUser) {
        var userid = auth().currentUser.uid;
        var useremail = auth().currentUser.email;
    }
    React.useEffect(() => {
        const reload = async () => {
            let { item, currentLocation, currentLocationName, user_favorite, userinfo, userinfoname } = route.params;
            // setLike(() =>
            //     checklike(item.id, user_favorite)
            // )
            getrestaurant(item.id);
            setUserinfomation(userinfo)
            setRestaurant(item);

            setUsername(userinfoname);
            setCurrentLocation(currentLocation);
            setCurrentLocationName(currentLocationName)
            setRestaurantid(item.id)

            console.log('reload')
        }
        const unsubscribe = navigation.addListener('focus', () => {
            reload()
        });
        return unsubscribe;
    }, [userid])


    useEffect(() => {
        if (restaurant) {
            setOrderlist(restaurant?.Orderlist);
        }
    }, [restaurant])


    const getrestaurant = async (id) => {
        const snapshot = await firestore().collection('restaurants').doc(`quan${id}`).get();
        setRestaurant(snapshot.data());
    }


    const getFoodlist = (Orderlist) => {
        const food_list = Orderlist.map((item) => {
            return item.food_list;
        })
        const tmp = food_list.join().split(",");
        const obj = tmp.reduce(function (a, b) {
            a[b] = a[b] + 1 || 1
            return a;
        }, {});
        const sortedArray = Object.entries(obj).sort((a, b) => b[1] - a[1]);

        const sortedObj = sortedArray.map(item => {
            const obj = Object.fromEntries([item]);
            return obj;
        })

        return sortedObj;
    }


    const countbill = getFoodlist(Orderlist);
    console.log("12", countbill);

    function checklike(id, userinfo_favorite) {
        if (auth().currentUser) {
            return userinfo_favorite.includes(id)
        }
    }


    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQuantity(id) {
        let orderItem = orderItems.filter(item => item.menuId == id)
        if (orderItem.length > 0) {
            return orderItem[0].qty
        } else {
            return 0;
        }
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
        return itemCount;
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.qty * b.price || 0), 0)
        return total.toFixed(3);
    }

    const onSelect = async (id, isSelected) => {
        let tempDart = []
        if (!auth().currentUser) {
            alert('Vui lòng đăng nhập');
            navigation.navigate('SignInScreen');
        }
        else {
            setLike(!isSelected)
            await firestore()
                .collection('restaurants')
                .doc(`quan${id}`)
                .update({
                    isSelected: !isSelected
                })
                .then(() => {
                    console.log('Updated!');
                });


            if (userid) {
                const user = await firestore().collection('Users').doc(userid).get()
                    .then(res => tempDart = res.data().favorite)
            }

            //Add Favorite list

            if (!isSelected == true && userid) {
                // console.log('--------------------------')
                // console.log('add')
                if (tempDart.length > 0) {
                    let existing = false;
                    tempDart.map(item => {
                        if (item === id) {
                            existing = true
                        }
                    })
                    if (existing == false) {
                        tempDart.push(id);
                    }
                }
                else {
                    tempDart.push(id);
                }
                await firestore()
                    .collection('Users')
                    .doc(userid)
                    .update({
                        favorite: tempDart,
                    })
                    .then(() => {
                        console.log('Updated! Favorite');
                    });

            }

            //Remove Favorite list
            else {
                // console.log('--------------------------')
                // console.log('remove')
                let tmp = []
                if (tempDart.length <= 0) {
                    tempDart = [];
                }
                else {
                    tmp = tempDart.filter((item) => {
                        if (item != id) {
                            return item;
                        }
                    });
                }
                await firestore()
                    .collection('Users')
                    .doc(userid)
                    .update({
                        favorite: tmp,
                    })
                    .then(() => {
                        console.log('Updated! Favorite');
                    });
            }


        }
    }

    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 15,
                marginBottom: 15,
                alignItems: 'center',
                height: 40,
            }}>
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.padding * 2,
                        width: 50,
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

                {/* Restaurant Name Section */}
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
                        <Text style={{ ...FONTS.h3 }}>{restaurant?.name}</Text>
                    </View>

                </View>

                <TouchableOpacity style={{
                    width: 50,
                    paddingRight: SIZES.padding * 2,
                    justifyContent: "center"

                }} onPress={() => onSelect(restaurantid, like)}>
                    <Favourite isSelected={like} />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu - ${index} `}
                            style={{
                                alignItems: "center"
                            }}

                        >
                            <View style={{ height: SIZES.height * 0.3 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMethod='auto'
                                    resizeMode='cover'
                                    style={{
                                        width: SIZES.width,
                                        height: SIZES.height * 0.3,
                                    }}
                                />
                            </View>

                            {/* Name & Description */}
                            <View style={{
                                width: SIZES.width,
                                alignItems: 'center',
                                marginTop: 15,
                                paddingHorizontal: SIZES.padding * 2
                            }}>
                                <Text style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}>{item.name} </Text>
                                <Text style={{ ...FONTS.body3, textAlign: 'center' }}>{item.description}</Text>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                                <Image
                                    source={icons.fire}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />
                                <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>
                                    {item.price.toFixed(3)} VND
                                </Text>
                            </View>
                        </View>
                    ))
                }

            </Animated.ScrollView>
        )
    }
    function renderOrder() {

        return (
            <SafeAreaView>
                <View style={{
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,

                }}>
                    {renderStarRating()}
                    <View style={{
                        justifyContent: "center",
                        flexDirection: "row"
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '30%',
                                padding: SIZES.padding * 1.4,
                                backgroundColor: COLORS.transparent,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={() => navigation.navigate("Review", {
                                restaurantid, userid, username
                            })}
                        >
                            <Image
                                source={icons.comment}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10
                                }}
                            />
                            <Text>Comments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '30%',
                                padding: SIZES.padding,
                                backgroundColor: COLORS.transparent,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                            onPress={() => navigation.navigate("Stats", { restaurant, countbill, restaurantName: restaurant?.name, })}
                        >
                            <Image
                                source={icons.fire}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10
                                }}
                            />
                            <Text>Best Seller</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'center',
                        paddingVertical: SIZES.padding * 1,
                        paddingHorizontal: SIZES.padding * 1,
                        borderBottomColor: COLORS.lightGray2,
                        borderBottomWidth: 2,
                    }}>

                    </View>

                    <View style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingVertical: SIZES.padding * 1,
                        paddingHorizontal: SIZES.padding * 1,
                        borderBottomColor: COLORS.lightGray2,
                        borderBottomWidth: 2,
                    }}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding * 2, ...FONTS.h4, }} >{currentLocationName}</Text>
                        </View>

                    </View>

                    {/* Order Button */}
                    <View style={{
                        padding: SIZES.padding * 2,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        maxHeight: SIZES.height,
                        maxWidth: SIZES.width,
                    }}>
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.4,
                                padding: SIZES.padding,
                                backgroundColor: "#009298",
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {
                                if (auth().currentUser && useremail != "quan1@gmail.com") {
                                    navigation.navigate("Reservation", {
                                        userid,
                                        restaurant: restaurant,
                                        restaurantName: restaurant?.name,
                                        currentLocation: [currentLocation[1], currentLocation[0]],
                                    })
                                }
                                else {
                                    alert('Vui lòng đăng nhập để thực hiện chức năng này !!!')
                                    navigation.navigate("SignInScreen")
                                }
                            }
                            }
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Đặt Bàn</Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.4,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                right: -20,
                            }}
                            onPress={() => navigation.navigate("OrderDelivery", {
                                restaurant: restaurant.location,
                                restaurantName: restaurant?.name,
                                currentLocation: [currentLocation[1], currentLocation[0]],
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Let's Go</Text>

                        </TouchableOpacity>

                    </View>

                </View>
                {getcomment && renderReview()}
                {
                    isIphoneX() &&
                    <View
                        style={{
                            position: "absolute",
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}></View>
                }
            </SafeAreaView>
        )
    }

    function renderStarRating() {
        const countRating = (countStar) => {
            setStar(countStar)
        }


        return (
            <View style={{
                width: "100%",
            }}>
                <Rating
                    showRating
                    type="star"
                    ratingColor="#f1c40f"
                    ratingCount={5}
                    onFinishRating={countRating}
                >
                </Rating>
                <Star
                    max={star}
                    resID={restaurantid}
                    userid={userid}
                ></Star>
            </View>
        )
    }

    function renderReview() {
        return (
            <View>
                <Review key={Comment}>
                </Review>
            </View>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})
export default Restaurants;