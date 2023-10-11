/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SIZES, icons, COLORS, FONTS } from '../constants';
import firestore from '@react-native-firebase/firestore';



const Stats = ({ navigation, route }) => {



  const [food, setFood] = useState([])
  const [food1, setFood1] = useState([])
  const [count, setCount] = useState([]);
  const [countbilllist, setCountbillist] = useState([]);

  const [restaurantName, setRestaurantName] = useState("")
  React.useEffect(() => {
    const reload = async () => {
      const { restaurant, countbill, restaurantName } = route.params;

      setFood(restaurant.menu);
      setCountbillist(countbill);
      setRestaurantName(restaurantName);

      console.log('reload')
    }
    const unsubscribe = navigation.addListener('focus', () => {
      reload()
    });
    return unsubscribe;
  }, [])

  useEffect(() => {
    getFoodfunc(food, countbilllist);
  }, [food]);
  const getFoodfunc = useCallback((food, countbill) => {

    const keylist = countbill.map((e) => {
      const key = Number(Object.keys(e).join());
      return key;
    })
    const value = countbill.map((e) => {
      const value = Number(Object.values(e).join());
      return value;
    })
    const result = [];
    setCount(keylist);

    keylist.forEach((element, id) => {
      const tmp = { ...food[element - 1], count: value[id] };
      result.push(tmp)
    });
    setFood1(result);
  }, [food]);



  function renderHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        alignItems: 'center',
        width: "100%",
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
            <Text style={{ ...FONTS.h3 }}>{restaurantName}</Text>
          </View>
        </View>
      </View>
    )
  }


  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity style={styles.card}>

        <Image source={item.photo} style={styles.image} />
        <View style={styles.cardBody}>
          <Text style={styles.price}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
          <Text style={styles.price}>{item.price}k vnd</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.beds}>Số lượt đã order: {item.count} </Text>
        </View>
      </TouchableOpacity>
    );
  }



  const filteredData = food1.filter((item) => {
    return item
  })

  return (
    <View style={styles.container}>
      {renderHeader()}
      {food1 ? <FlatList
        contentContainerStyle={styles.propertyListContainer}
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.menuId}
      /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  searchInputContainer: {
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  propertyListContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    height: 150,
    marginBottom: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardBody: {
    marginBottom: 10,
    padding: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    marginBottom: 5
  },
  price: {
    fontSize: 14,
    marginBottom: 5,
    color: '#666'
  },
  cardFooter: {
    padding: 10,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    justifyContent: 'space-between',
  },
  beds: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  baths: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  parking: {
    fontSize: 14,
    color: '#ffa500',
    fontWeight: 'bold'
  }
});

export default Stats