/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import {
    SafeAreaView,
    Platform,
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { icons, COLORS, FONTS, SIZES } from '../constants';
import firestore from '@react-native-firebase/firestore';



const Restaurants = ({ route, navigation }) => {
    let { restaurant, currentLocation, userid } = route.params;


    const [userinfomation, setUserinfomation] = React.useState({});
    const [restaurantReser, setRestaurantReser] = React.useState(restaurant);
    const [people, setPeople] = React.useState(0);



    useEffect(() => {
        const reload = async () => {
            if (userid) {
                const getuserid = async (userid) => {
                    const user = await firestore().collection('Users').doc(userid).get()
                        .then(res => setUserinfomation(res.data()))
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


    const scrollX = new Animated.Value(0);
    function editOrder(action) {
        if (action == "+") {
            if (people < 20) {
                setPeople(people + 1);
            }
            else {
                setPeople(20);
                Alert.alert('Số Lượng Tối Đa là  20!')
            }
        } else {
            if (people > 0) {
                setPeople(people - 1);
            }
            else {
                setPeople(0)
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
                        height: '100%',
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
                        backgroundColor: COLORS.lightGray3,
                    }}>
                        <Text style={{ ...FONTS.h3 }}>{restaurantReser.name}</Text>
                    </View>
                </View>
            </View>
        )
    }
    function renderFoodInfo() {
        return (
            <View style={{ height: SIZES.height * 0.35, position: 'relative', top: 0, }}>
                {/* Food Image */}
                <Image
                    source={restaurant.photo}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width,
                        height: "100%"
                    }}
                />


                {/* Name & Description */}
                <View style={{
                    width: SIZES.width,
                    alignItems: 'center',
                    marginTop: 15,
                    paddingHorizontal: SIZES.padding * 2
                }}>
                    <Text style={{ ...FONTS.body2, color: COLORS.darkgray, paddingBottom: 20, }}>
                        Số Lượng Người ?
                    </Text>


                    <View style={{
                        width: SIZES.width,
                        height: 50,
                        justifyContent: "center",
                        flexDirection: 'row'

                    }}>
                        <TouchableOpacity
                            onPress={() => editOrder("-")}
                            style={{
                                width: 50,
                                backgroundColor: COLORS.white,
                                alignItems: "center",
                                justifyContent: "center",
                                borderTopLeftRadius: SIZES.radius,
                                borderBottomLeftRadius: SIZES.radius
                            }}>
                            <Text style={{ ...FONTS.h1 }}>-</Text>
                        </TouchableOpacity>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: COLORS.white,
                            width: 50,
                        }}>
                            <Text style={{ ...FONTS.h3 }}>{people}</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 50,
                                borderTopRightRadius: SIZES.radius,
                                borderBottomRightRadius: SIZES.radius,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => editOrder("+")}
                        >
                            <Text style={{ ...FONTS.h1 }}>+</Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={icons.family}
                        resizeMode="contain"
                        style={{
                            width: 100,
                            height: 100,
                            marginRight: 10
                        }}
                    />
                </View>

            </View>

        )
    }


    function renderOrder() {
        return (
            <View style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
            }}>



                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                }}>

                    <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>

                    </Text>

                </View>

                <View style={{
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,

                }}>

                    <View style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingVertical: SIZES.padding * 2,
                        paddingHorizontal: SIZES.padding * 3
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                        }}>
                            <Image
                                source={icons.user}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginRight: SIZES.padding, ...FONTS.h3 }} >{people} - Thành viên</Text>
                        </View>

                    </View>

                    {/* Order Button */}
                    <View style={{
                        padding: SIZES.padding * 2,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            // onPress={() => navigation.navigate("OrderDelivery", {
                            // })}
                            onPress={() => navigation.navigate("SetDay", {
                                userinfomation,
                                restaurant,
                                numberpeople: people > 2 ? people : 1,
                                currentLocation
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Đặt ngày</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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