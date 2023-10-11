import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { HistoryDirection } from '../../model/HistoryDirection';

export function HistoryofUser() {

  const [hisOfUser, setHisOfUser] = useState(null)

  // const getHisOfUser = firestore().collection('History')
  //                       .doc(auth().currentUser.uid)
  //                       .get()

  // const listRestaurants = firestore().collection('restaurants')
  //                         .doc(auth().currentUser.uid)
  //                         .get()

  const getHisOfUser = []
  const listRestaurants = []

  const recommendHis = () =>{
    listRestaurants.map(location => {
      getHisOfUser.map(road => {
        
      })
    })
  }

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>HistoryofUser</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#312e38',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
});
