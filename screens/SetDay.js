/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { icons, COLORS, FONTS, SIZES } from '../constants';


function SetDay({ route, navigation }) {
    const { restaurant, numberpeople, currentLocation, userinfomation } = route.params;
    const [daytime, setDaytime] = useState('');

    var CurrentDate = new Date();

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

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <Calendar
                onDayPress={day => {
                    const GivenDate = new Date(day.dateString)
                    if (GivenDate > CurrentDate) {
                        setDaytime(day)
                    }
                    else {
                        Alert.alert("Vui lòng chọn ngày hôm nay hoặc những ngày hôm sau.")
                    }
                }}
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 150,
                    marginTop: 40,
                }}
                markedDates={{
                    [daytime]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedColor: '#F1EFFE',
                        selectedTextColor: '#7954FA',
                    }
                }}
                theme={{
                    todayTextColor: '#7954FA',
                    'stylesheet.calendar.header': {
                        dayHeader: {
                            color: '#616061',
                            fontWeight: 'bold'
                        }
                    }
                }}
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
                        paddingVertical: SIZES.padding * 1,
                        paddingHorizontal: SIZES.padding * 2
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
                            onPress={() => navigation.navigate("SetTime", {
                                userinfomation,
                                restaurant,
                                numberpeople: numberpeople,
                                daytime: daytime,
                                currentLocation,
                            })}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Đặt thời gian</Text>
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default SetDay;