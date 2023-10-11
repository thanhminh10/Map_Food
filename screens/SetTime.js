/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Dropdown } from 'react-native-element-dropdown';
import { icons, COLORS, FONTS, SIZES } from '../constants';
const data = [
    { label: '12:00 - 12:30', value: '12:00 - 12:30' },
    { label: '13:00 - 13:30', value: '13:00 - 13:30' },
    { label: '14:00 - 14:30', value: '14:00 - 14:30' },
    { label: '16:00 - 16:30', value: '16:00 - 16:30' },
    { label: '17:00 - 17:30', value: '17:00 - 17:30' },
    { label: '18:00 - 18:30', value: '18:00 - 18:30' },
    { label: '19:00 - 19:30', value: '19:00 - 19:30' },
    { label: '20:00 - 20:30', value: '20:00 - 20:30' },
];

const SetTime = ({ route, navigation }) => {
    const { restaurant, numberpeople, currentLocation, daytime, userinfomation } = route.params;
    const [value, setValue] = useState(null);
    // console.log(numberpeople, daytime.dateString);
    console.log(userinfomation)
    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 20,
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
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            {renderHeader()}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={500}
                labelField="label"
                valueField="value"
                placeholder="Chọn thời gian"
                searchPlaceholder="Tìm kiếm"
                value={value}
                onChange={item => {
                    setValue(item.value);
                }}
                renderLeftIcon={() => (
                    <Image
                        source={icons.clock}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: COLORS.darkgray,
                            marginRight: 5,
                        }}
                    />
                )}
            />
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
                            marginTop: 10,
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
                            <Text style={{ marginRight: SIZES.padding, ...FONTS.h3 }} >{numberpeople} - Thành viên</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}>
                            <Image
                                source={icons.calendar}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginRight: SIZES.padding, ...FONTS.h3 }} >{daytime.dateString}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            marginTop: 10,
                        }}>
                            <Image
                                source={icons.clock}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginRight: SIZES.padding, ...FONTS.h3 }} >{value ? value : '00:00 - 00:00'}</Text>
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
                            onPress={() => {
                                if (value) {
                                    navigation.navigate("GetFood", {
                                        userinfomation,
                                        restaurant: restaurant,
                                        numberpeople: numberpeople,
                                        daytime: daytime,
                                        time: value,
                                        currentLocation,
                                    })
                                } else {
                                    alert("Vui lòng chọn giờ")
                                }
                            }}
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
        </SafeAreaView>
    );
};

export default SetTime;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        marginTop: 100,
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