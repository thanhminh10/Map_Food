/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Text } from 'react-native-svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const MyOrderlist = ({ navigation, route }) => {

    const [orderList, setOrderList] = useState([])
    const [userinfo, setUserinfo] = useState({})

    const [resdata, setResdata] = useState([])


    useEffect(() => {
        const { userinfo } = route.params;
        setUserinfo(userinfo);
        setOrderList(userinfo.Orderlist);
    }, [orderList])

    useEffect(() => {
        const reload = async () => {
            const getresData = async () => {
                await firestore().collection('restaurants').doc(`quan1`).get()
                    .then(res => {
                        setResdata(res.data())
                        return res.data()
                    })
            }
            getresData(userinfo.id)
        }
        console.log('reload')

        const unsubscribe = navigation.addListener('focus', () => {
            reload()
        });
        return unsubscribe;
    }, [userinfo.id])


    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Card.Title
                title="My Orderlist"
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                {orderList ? orderList.map((order, orderListid) => (
                    <Card key={orderListid}>
                        <Card.Content>

                            <Title style={{ fontWeight: 'bold' }}>Thông tin đặt hàng</Title>
                            <View style={{ flexDirection: 'row' }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>Tình trạng: </Paragraph>
                                <Paragraph style={{ color: order.state ? 'blue' : 'red' }}>{order.state ? "Đã duyệt" : "Đang duyệt"} </Paragraph>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>Mã đơn hàng: </Paragraph>
                                <Paragraph style={{ color: 'red' }}>{order.key}</Paragraph>
                            </View>
                            <Paragraph>Số người: {order.numberpeople} </Paragraph>
                            <Paragraph>Ngày: {order.daytime} </Paragraph>
                            <Paragraph>Giờ: {order.time} </Paragraph>
                            <Title style={{ fontWeight: 'bold' }}>Món ăn</Title>
                            {resdata.menu?.map((menu, id) => {
                                if (order.food_list.includes(menu.menuId)) {
                                    return (
                                        <View key={id}>
                                            <Paragraph >{menu.name} :  {menu.price.toFixed(3)} VND</Paragraph>
                                            <Card.Cover source={menu.photo} />
                                        </View>
                                    )
                                }
                            }
                            )}
                        </Card.Content>
                        <Card.Actions>
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

export default MyOrderlist;