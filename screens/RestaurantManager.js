/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { icons, COLORS, FONTS, SIZES, images } from '../constants';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Tabs2 } from '../navigation/tabs';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Text } from 'react-native-svg';
import { user } from '../constants/icons';

const RestaurantManager = ({ navigation }) => {
    const statedefault = {
        key: '',
        state: false,
    }
    var resid = auth().currentUser;
    if (auth().currentUser) {
        var resid = auth().currentUser.email;
        resid = resid.replace('@gmail.com', '');
    }
    const [resdata, setResdata] = useState({});
    const [orderList, setOrderList] = useState([]);

    const [orderListState, setOrderListState] = useState(statedefault);

    const [buttonClick, setButtonClick] = useState(false);


    // const [user_orderList_non_selected, SetUser_orderList_non_selected] = useState([]);
    // const [user_orderList_selected, SetUser_orderList_selected] = useState([]);
    const getrestaurant = async () => {
        const userid = await firestore().collection('restaurants').doc(resid).get()
            .then(res => {
                setResdata(res.data());
                setOrderList(res.data().Orderlist);
                return res.data();
            })
    }
    useEffect(() => {
        getrestaurant()
    }, [orderList])


    const Accept = async (orderListid, key) => {
        const tmp = {};
        const userid = orderList[orderListid].userid;

        const user_orderList_non_selected = [];
        const user_orderList_selected = [];


        const res_orderList_non_selected = [];
        const res_orderList_selected = [];


        await firestore().collection('restaurants').doc(resid).get()
            .then(res => {

                const data = res.data().Orderlist.filter(item => {
                    if (item.key == key) {
                        return item
                    }
                })
                console.log("66", data);
                tmp.key = key;
                const state = data[0];
                tmp.state = state.state;
                return res.data();
            })




        setButtonClick(tmp.state);


        await firestore().collection('Users').doc(userid).get()
            .then(res => {
                res.data().Orderlist.forEach(item => {
                    if (item.key != key) {
                        user_orderList_non_selected.push({ ...item });
                    }
                    else {
                        user_orderList_selected.push({
                            ...item, state: !tmp.state
                        });
                    }
                });
                return res.data();
            })
        await firestore().collection('restaurants').doc("quan1").get()
            .then(res => {
                res.data().Orderlist.forEach(item => {
                    if (item.key != key) {
                        res_orderList_non_selected.push({ ...item });
                    }
                    else {
                        res_orderList_selected.push({ ...item, state: !tmp.state });
                    }
                });
                return res.data();
            })


        // console.log("----------------user---------------------");
        // console.log("user_orderList_selected:", user_orderList_selected);
        // console.log("user_orderList_non_selected:", user_orderList_selected);
        // console.log("----------------restaurant---------------------");
        // console.log("res_orderList_selected:", res_orderList_selected);
        // console.log("res_orderList_non_selected:", res_orderList_non_selected.length);


        firestore()
            .collection('Users')
            .doc(userid)
            .update({
                Orderlist: [...user_orderList_selected, ...user_orderList_non_selected],
            })
            .then(() => {
                console.log('User updated!');
            });
        firestore()
            .collection('restaurants')
            .doc("quan1")
            .update({
                Orderlist: [...res_orderList_selected, ...res_orderList_non_selected],
            })
            .then(() => {
                console.log('User updated!');
            });

        alert("Đã update đơn số: ")
    }
    const logout = () => {
        navigation.navigate('SignInScreen')
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Card.Title
                title={resdata.name}
            />
            <Button style={{ padding: 10 }} onPress={logout}>Đăng xuất</Button>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                {orderList ? orderList.map((order, orderListid) => (
                    <Card key={orderListid}>
                        <Card.Cover source={resdata.photo} />
                        <Card.Content>
                            <Title>Tên: {order.username}</Title>
                            <Paragraph>Email:{order.useremail}</Paragraph>
                            <Title>Sdt: {order.usersdt}</Title>
                            <Title>Thông tin đặt hàng</Title>
                            <View style={{ flexDirection: 'row' }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>Tình trạng: </Paragraph>
                                <Paragraph style={{ color: order.state ? 'blue' : 'red' }}>{order.state == true ? "Đã duyệt" : "Chưa"} </Paragraph>
                            </View>
                            <Paragraph>Số người: {order.numberpeople} </Paragraph>
                            <Paragraph>Ngày: {order.daytime} </Paragraph>
                            <Paragraph>Giờ: {order.time} </Paragraph>
                            <Title>Món ăn</Title>
                            {resdata.menu?.map((menu, id) => {
                                if (order.food_list.includes(menu.menuId)) {
                                    return (
                                        <Paragraph key={id}> - {menu.name} :  {menu.price.toFixed(3)} VND</Paragraph>
                                    )
                                }
                            }
                            )}

                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() =>
                                Accept(orderListid, order.key)
                            }>{buttonClick == false ? 'Duyệt' : 'Gỡ'}</Button>
                            <Button onPress={() => alert("Đã gọi tới sđt")}>Gọi điện</Button>
                        </Card.Actions>
                    </Card>
                )) :
                    <View style={{ flex: 1, padding: 16 }}>
                        <Text>Hello</Text>
                    </View>
                }
            </ScrollView>
        </View>
    );
};

export default RestaurantManager;