/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { icons, SIZES, COLORS, FONTS } from '../constants';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Confirm = ({ route, navigation }) => {


    const orderdefault = {
        userinfomation: {},
        time: "",
        daytime: "",
        numberpeople: 0,
        food_list: [],
        state: false,
    }

    const [userinfomation, setUserinfomation] = useState({});


    React.useEffect(() => {
        const { restaurant,
            numberpeople,
            daytime,
            time,
            selectedItems,
            currentLocation,
            userinfomation,
        } = route.params;

        setRestaurantid(restaurant.id);
        setMenu(restaurant.menu);
        setOrder({
            userinfomation: userinfomation,
            time: time,
            daytime: daytime,
            numberpeople: numberpeople,
            food_list: [...selectedItems],
            state: false,
        });
        setUserinfomation(userinfomation);
        setRestaurant(restaurant);
        setLocation(currentLocation)
        setUser_Orderlist(userinfomation.Orderlist);

        const getOrderlist = async () => {
            const restaurants = (await firestore().collection('restaurants').doc(`quan${restaurant.id}`).get()).data();
            setRes_Orderlist(restaurants.Orderlist);
        }

        getOrderlist();
    }, [restaurantid])



    const [menu, setMenu] = useState({})
    const [confirm, setConfirm] = useState([])
    const [order, setOrder] = useState(orderdefault);

    const [restaurant, setRestaurant] = useState({})

    const [restaurantid, setRestaurantid] = useState({})

    // setRes_Orderlist
    const [res_Orderlist, setRes_Orderlist] = useState([])
    // user_Orderlist
    const [user_Orderlist, setUser_Orderlist] = useState([]);

    // User info 

    const [Location, setLocation] = useState([]);


    function sumOrder(selectedItems) {
        // menu[selectedItems - 1]
        const menuprice = selectedItems.map((item) => {
            return menu[item - 1].price
        })
        const total = menuprice.reduce(
            (accumulator, currentValue) => (accumulator + currentValue) * order.numberpeople / 2,
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
                justifyContent: 'flex-end',
                height: 30,
                marginBottom: 5,
            }}>
                <TouchableOpacity
                    style={{
                        paddingLeft: SIZES.padding * 2,
                        width: 100,
                        height: '100%',
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={{ color: 'red', fontSize: 20 }}>Hủy</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const Datban = async (restaurantid, numberpeople, daytime, time, selectedItems, state, userinfomation) => {
        const key = makeid(4);
        res_Orderlist.push({
            key: key,
            username: userinfomation.name ? userinfomation.name : "",
            useremail: userinfomation.email ? userinfomation.email : null,
            usersdt: userinfomation.sdt ? userinfomation.sdt : null,
            numberpeople: numberpeople,
            daytime: daytime.dateString,
            time: time,
            food_list: selectedItems,
            state: state,
            userid: userinfomation.userid ? userinfomation.userid : null,
        })
        user_Orderlist.push({
            key: key,
            daytime: daytime.dateString,
            time: time,
            food_list: selectedItems,
            state: state,
            numberpeople: numberpeople,
        })
        console.log("res_Orderlist", res_Orderlist.length);
        console.log("user_Orderlist", user_Orderlist.length);

        await firestore()
            .collection('restaurants')
            .doc(`quan${restaurantid}`)
            .update({
                Orderlist: res_Orderlist,
            })
            .then(() => {
                console.log('restaurants - Orderlist updated!');
            });
        await firestore()
            .collection('Users')
            .doc(`${userinfomation.userid}`)
            .update({
                Orderlist: user_Orderlist,
            })
            .then(() => {
                console.log('Users - Orderlist updated!');
            });

        navigation.navigate("Home")
    }


    return (
        <View style={styles.container}>
            {renderHeader()}
            <Text style={styles.title}>Confirmation</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin khách hàng:</Text>
                <Text style={styles.info}>Tên:{userinfomation.name ? userinfomation.name : ""}</Text>
                <Text style={styles.info}>Email: {userinfomation.email ? userinfomation.email : ""}</Text>
                <Text style={styles.info}>Số điện thoại: 73252352</Text>
                <Text style={styles.info}>Ngày: {order.daytime.day}/{order.daytime.month}/{order.daytime.year}</Text>
                <Text style={styles.info}>Giờ: {order.time}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Thông tin nhà hàng:</Text>
                <Text style={styles.info}>Địa chỉ: </Text>
                <Text style={styles.info}>Tổng tiền: {sumOrder(order.food_list)} VND</Text>
                <Text style={styles.info}>Ngân hàng: VietComBank (VCB)</Text>
                <Text style={styles.info}>Số tài khoản: 12xxxxx424</Text>
            </View>
            <Text style={styles.notifationTitle}>Lưu ý:</Text>
            <Text style={styles.notifation}> Quý khách vui lòng thanh toán 1/2 hóa đơn dành cho {order.numberpeople} người.</Text>
            <Text style={styles.message}>Bạn có muốn đặt bàn và di chuyển đến quán ăn ?</Text>


            <View style={{
                flexDirection: 'row',
                paddingTop: SIZES.padding * 1,
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%'

            }}>
                <TouchableOpacity
                    style={{
                        width: SIZES.width * 0.4,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => {
                        Datban(
                            restaurantid,
                            order.numberpeople,
                            order.daytime,
                            order.time,
                            order.food_list,
                            order.state,
                            userinfomation,
                        )
                    }
                    }
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Đặt bàn</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: SIZES.width * 0.4,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.primary,
                        alignItems: 'center',
                        borderRadius: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("OrderDelivery", {
                        restaurant: restaurant.location,
                        restaurantName: restaurant?.name,
                        userinfomation: userinfomation,
                    })}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Di chuyển</Text>

                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        padding: 12,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
        alignItems: 'center'
    },
    section: {
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    info: {
        fontSize: 20,
        marginBottom: 4,
        color: '#666666',
    },
    notifationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: COLORS.ratings,
    },
    notifation: {
        fontSize: 17,
        marginBottom: 10,
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        color: '#666666',
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333333',
        textAlign: 'center'
    },
});

export default Confirm;