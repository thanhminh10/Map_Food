/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from '../constants';
import { isIphoneX } from 'react-native-iphone-x-helper';

const GetFood = ({ route, navigation }) => {
    const { restaurant, currentLocation, numberpeople, daytime, time, userinfomation } = route.params;

    const [selectedItems, setSelectedItems] = useState([]);

    const [menu, SetMenu] = useState(restaurant.menu)

    const handleItemSelection = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter((item) => item !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    function sumOrder(selectedItems) {
        console.log(selectedItems);
        // menu[selectedItems - 1]
        const menuprice = selectedItems.map((item) => {
            return menu[item - 1].price
        })
        const total = menuprice.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );
        return total.toFixed(3);
    }
    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 5,
                alignItems: 'center',
                height: 40,
                marginBottom: 20,
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
            </View>
        )
    }
    const renderItem = ({ item }) => {
        const isSelected = selectedItems.includes(item.menuId);
        return (
            <TouchableOpacity
                onPress={() => handleItemSelection(item.menuId)}
                style={[styles.itemContainer, isSelected && styles.selectedItemContainer]}
            >
                <Image source={item.photo} style={styles.itemImage} />
                <View style={styles.itemdesciption}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{item.price.toFixed(3)} VND</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            <FlatList
                data={restaurant.menu}
                renderItem={renderItem}
                keyExtractor={(item) => item.menuId}
                extraData={selectedItems}
            />
            <View style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
            }}>

                <View style={{
                    backgroundColor: COLORS.white,
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,

                }}>



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
                            onPress={() =>

                                navigation.navigate("Confirm", {
                                    userinfomation,
                                    restaurant,
                                    numberpeople: numberpeople,
                                    daytime: daytime,
                                    time,
                                    selectedItems,
                                    currentLocation,
                                })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Đặt Món</Text>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,

    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
        elevation: 2,
        flexDirection: "row",
        justifyContent: 'flex-start'
    },
    selectedItemContainer: {
        backgroundColor: '#a6d8ff',
    },
    itemImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
    },
    itemdesciption: {
        marginLeft: 30,
    }
    ,
    itemName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#333333',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

export default GetFood;