/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { COLORS, FONTS, icons, images, SIZES } from "../constants"
import { DataTable } from 'react-native-paper';
import MapLibreGL from '@maplibre/maplibre-react-native';
import LineLayer from '../src/components/LineString';
import axios from 'axios';
import vietmapapi from '../src/config/env';
import { mapselect } from '../data/restaurantData';



MapLibreGL.setAccessToken(null);

const vietmap_api = vietmapapi.Token;

function OrderDelivery({ route }) {

    // bottomSheet
    const [isVisible, setIsVisible] = useState(false);
    // ----------------------------------------------------------

    // Map view
    const [region, setRegion] = React.useState([]);
    // Marker
    const [origin, setOrigin] = useState([]);
    const [destination, setDestination] = useState([]);
    // Name
    const [restaurantName, setRestaurantName] = useState("");
    // Routing
    const [routing, setRouting] = useState([]);
    // Routing instruct
    const [instruct, setInstruct] = useState([]);




    // Time 
    const [time, setTime] = useState(null);
    const [distance, setDistance] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);


    const [buttonClick, setButtonClick] = useState(false);


    // findrestaurant

    const [showRouting, setShowRouting] = useState(true);
    const [showlistcor, setShowlistcor] = useState(false);
    const [listcor, setListcor] = useState([]);

    var i = 0

    var arr = new Array();

    const bottomSheet = useRef();

    React.useEffect(() => {
        let { restaurant, restaurantName, currentLocation } = route.params;
        let restaurantname = restaurantName.replace(",Thành phố Hồ Chí Minh", "")

        let fromLoc = currentLocation;
        let toLoc = restaurant;
        let mapRegion = {
            latitude: (fromLoc[0] + toLoc[0]) / 2,
            longitude: (fromLoc[1] + toLoc[1]) / 2,
            latitudeDelta: Math.abs(fromLoc[0] - toLoc[0]) * 2,
            longitudeDelta: Math.abs(fromLoc[1] - toLoc[1]) * 2
        }
        setRegion(mapRegion);
        setOrigin(fromLoc);
        setDestination(toLoc);
        setRestaurantName(restaurantname)
    }, [])

    // console.log("62---origin", origin);
    // console.log("63---destination", destination);
    React.useEffect(() => {
        const getData = async () => {
            // console.log("62", origin.length, destination.length);
            if (origin.length && destination.length == 2) {
                const a = origin.join(",");
                const b = destination.join(",");
                const url = `https://maps.vietmap.vn/api/route?api-version=1.1&point=${a}&point=${b}&apikey=${vietmap_api}&vehicle=car&points_encoded=false`
                const dataGet = await axios.get(url)
                    .then(function (response) {
                        return response;
                    }).then(function (data) {

                        setInstruct(data.data.paths[0].instructions);
                        setTime((data.data.paths[0].time) / 60000);
                        setDistance(data.data.paths[0].distance);

                        return data.data.paths[0].points.coordinates;
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .finally(function () {
                        // always executed
                    });
                // console.log("79", dataGet);
                setRouting(dataGet)
                arr = dataGet
            }
        }
        const CaculateRoute = () => {
            if (arr.length > 1) {
                arr = arr.slice(i, arr.length)
                i++
                setRouting(arr);
            }
            else {
                clearInterval(CaculateRoute);
                setButtonClick(false);
            }
        }
        if (destination) {
            getData();
            if (buttonClick == true) {
                setInterval(CaculateRoute, 1500);
                //console.log(CaculateRoute)
            }
        }
    }, [destination, origin, buttonClick])

    const findrestaurant = async (currentLocation) => {
        console.log("135", currentLocation);
        if (currentLocation) {
            currentLocation = currentLocation.join(",");
            const api = `https://maps.vietmap.vn/api/autocomplete/v3?apikey=${vietmap_api}&cityId=12&text=quán ăn,quán nước&circle_center=${currentLocation}&circle_radius=200&layers=ADDRESS`
            const dataGet = await axios.get(api)
                .then(function (response) {
                    return response;
                }).then(function (data) {
                    return data.data;
                })
                .then(function (data) {

                    return data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });

            if (dataGet) {
                dataGet.forEach(element => {
                    getlistcor(element.ref_id);
                });
            }
        }
    }


    const getlistcor = async (ref_id) => {

        const api = `https://maps.vietmap.vn/api/place/v3?apikey=${vietmap_api}&refid=${ref_id}`;
        console.log(api);
        await axios.get(api)
            .then(function (response) {
                return response;
            }).then(function (data) {
                const tmp = { lat: data.data.lat, lng: data.data.lng };
                setListcor([...listcor, tmp])
                return tmp;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    function onSelectCategory(item) {
        setShowRouting(false);
        setShowlistcor(true);
        setSelectedCategory(item);
        switch (item.id) {
            case 1:
                // findrestaurant(origin);
                setListcor([
                    [10.776646058710368, 106.65443987551183],
                    [10.776477424787382, 106.65388197608166],
                    [10.776003141372488, 106.65324897480512],
                    [10.776867390590924, 106.65513724979952],
                    [10.777436528965078, 106.65392489142243],
                    [10.777510306082938, 106.65480465590846]])
                alert("Các nhà hàng gần đây!! (Chức năng demo) ")
                break;
            case 2:
                setListcor([[10.776921784902491, 106.65667185148426],
                [10.778523800991506, 106.65456899957773],
                [10.77435010966833, 106.64744505230261],
                [10.772242162767062, 106.65315279319174],
                [10.77123034301325, 106.65280947043148],])
                alert("Các cây xăng gần đây!! (Chức năng demo) ")
                break;
            case 3:
                setListcor([
                    [10.851015538698897, 106.76604498459946],
                    [10.85119834183466, 106.76310803680775],
                    [10.851324785784232, 106.76407363207096],
                    [10.85147230365779, 106.76851537028163],
                    [10.871332044172584, 106.79637458296547],
                ])
                alert("Các ATM gần đây!! (Chức năng demo) ")
                break;
            default:
                return null;
        }
    }


    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        marginLeft: SIZES.padding,
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.primary : COLORS.lightGray4),
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",

                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View style={{
                        backgroundColor: (selectedCategory?.id === item.id ? COLORS.white : COLORS.lightGray4),
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: "center",

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
                    {
                        item.name ? <Text style={{
                            color: (selectedCategory?.id === item.id ? COLORS.white : COLORS.black),
                            marginTop: SIZES.padding,
                            fontSize: 15,
                            fontWeight: 500,
                        }}>{item.name}</Text> : null
                    }
                </TouchableOpacity>
            )
        }
        return (
            <View style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                opacity: 1,
                zIndex: 3,
                width: '100%'

            }}>
                <FlatList
                    data={mapselect}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }




    function renderMap() {
        const destinationOrigin = () => {
            if (origin && routing[0]) {

                const [long, lat] = routing[0];
                return (

                    <MapLibreGL.MarkerView
                        coordinate={[long, lat]}
                        x={1}
                        y={1}
                        anchor={{ x: 0, y: 1 }}
                    >
                        <View>
                            <MapLibreGL.Callout title="Bạn đang ở đây"
                                style={{ color: 'black' }}
                            />
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require('../src/accest/img/gps.png')}
                            />
                        </View>
                    </MapLibreGL.MarkerView>

                )
            }
        }





        const destinationRetaurant = () => {
            if (destination) {
                return (
                    <MapLibreGL.MarkerView
                        coordinate={[destination[1], destination[0]]}
                        x={1}
                        y={1}
                        anchor={{ x: 0, y: 1 }}
                    >
                        <View>
                            <MapLibreGL.Callout title={restaurantName}
                                style={{ color: 'black' }}
                            />
                            <Image
                                style={{ height: 50, width: 50 }}
                                source={require('../src/accest/img/map-marker-icon.png')}
                            />
                        </View>
                    </MapLibreGL.MarkerView>
                )
            }
        }

        return (
            <View style={{ flex: 1, }}>
                <MapLibreGL.MapView
                    style={styles.map}
                    logoEnabled={false}
                    styleURL="https://demotiles.maplibre.org/style.json" >

                    {
                        region.latitude && region.longitude ? <MapLibreGL.Camera
                            zoomLevel={13}
                            maxZoomLevel={20}
                            animationMode={'flyTo'}
                            animationDuration={1100}
                            centerCoordinate={[region.longitude, region.latitude]}
                        /> : null
                    }

                    <MapLibreGL.RasterSource
                        maxZoomLevel={18}
                        id="raster-id"
                        tileUrlTemplates={[
                            `https://maps.vietmap.vn/tm/{z}/{x}/{y}@2x.png?apikey=${vietmap_api}`,
                        ]}>
                        <MapLibreGL.RasterLayer
                            maxZoomLevel={18}
                            id="id-example"
                            sourceID="source-id-example"
                        />
                    </MapLibreGL.RasterSource>

                    {origin ? destinationOrigin() : null}
                    {showRouting && showlistcor == false && destination ? destinationRetaurant() : null}
                    {showlistcor ? listcor.map(cor => {
                        return (<MapLibreGL.MarkerView
                            coordinate={[cor[1], cor[0]]}
                            x={1}
                            y={1}
                            anchor={{ x: 0, y: 1 }}
                        >
                            <View>
                                <Image
                                    style={{ height: 50, width: 50 }}
                                    source={require('../src/accest/img/map-marker-icon.png')}
                                />
                            </View>
                        </MapLibreGL.MarkerView>)
                    }) : null}

                    {
                        showRouting && routing.length > 0 ? < LineLayer coordinates={routing} /> : null
                    }
                </MapLibreGL.MapView>
            </View>
        )
    }
    // console.log("162 : ", routing)


    const routingIntrust = () => {
        return (
            <SafeAreaView style={{
                zIndex: 1,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: SIZES.padding * 0.5,
                backgroundColor: 'transparant',
                opacity: 0.9,
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
                        setButtonClick(!buttonClick)
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Di chuyển</Text>

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
                    onPress={() => bottomSheet.current.show()}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Xem lộ trình</Text>
                </TouchableOpacity>
                <BottomSheet hasDraggableIcon ref={bottomSheet} height={600}>

                    <View style={{
                        padding: SIZES.padding * 3,
                        alignItems: "center",
                        justifyContent: "space-around",
                        flexDirection: "row",
                        maxHeight: SIZES.height,
                        maxWidth: SIZES.width,

                    }}>
                        <Text style={{ color: COLORS.black, ...FONTS.h2 }}>{Math.ceil(distance / 1000)}km - {Math.ceil(time)} phút</Text>
                    </View>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Distance</DataTable.Title>
                            <DataTable.Title>Mô tả</DataTable.Title>
                            <DataTable.Title>Tên đường</DataTable.Title>
                            <DataTable.Title numeric>Thời gian</DataTable.Title>
                        </DataTable.Header>
                        {instruct.map((ins, i) => {
                            return (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>{Math.ceil(ins.distance)}m</DataTable.Cell>
                                    <DataTable.Cell>{ins.text}</DataTable.Cell>
                                    <DataTable.Cell>{ins.street_name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{Math.ceil(ins.time / 60000)} - phút</DataTable.Cell>
                                </DataTable.Row>
                            )
                        })}
                    </DataTable>

                </BottomSheet>

            </SafeAreaView>
        );
    }

    return (
        <View style={styles.container}>

            {renderMainCategories()}
            {routing && renderMap()}
            {routingIntrust()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        opacity: 0.9,
        width: '100%',
        height: '100%',

    },
    map: {
        flex: 1,
    },
    fasf: {
        fontWeight: 20,
    }


});
export default OrderDelivery;