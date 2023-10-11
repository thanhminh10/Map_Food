/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import { SIZES, FONTS, icons, COLORS } from '../../../constants';
import firestore from '@react-native-firebase/firestore';

import { Card, Text, TextInput, Button } from 'react-native-paper';


export default function Review({ route, navigation }) {


  let { restaurantid, userid, username } = route.params
  const [listComment, setListComment] = useState([]);
  const [text, setText] = useState('');


  const snapdoc = async () => {
    const arrComment = (await firestore().collection('Comment').doc(`quan${restaurantid}`).get()).data().Comment
    setListComment(arrComment)
    console.log("reload")

  }
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      snapdoc();
    });
    return unsubscribe

  }, [restaurantid, text])


  console.log(listComment)


  const SubmitComment = () => {
    listComment.push({
      Content: text,
      User:
      {
        ID: userid,
        Name: username
      },
      restaurantid: restaurantid
    })
    firestore().collection('Comment')
      .doc(`quan${restaurantid}`)
      .set({ Comment: listComment })
  }

  function renderHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginTop: (Platform.OS == "android" ? 30 : 0),
        maxHeight: SIZES.height,
        maxWidth: SIZES.width,
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

      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View >
        {renderHeader()}
      </View>
      <View style={styles.boxComment_Parent}>
        <View style={styles.boxComment}>
          <TextInput
            value={text}
            onChangeText={text => setText(text)}
            label="Bình luận"
            mode='outlined'
            style={styles.inputComment}
          />
          <Button 
            onPress={SubmitComment}
            mode="contained"
            compact={true}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
        <View style={styles.list_Comment}>
          <FlatList
            data={listComment}
            renderItem={({ item }) =>
            <ScrollView>
              <Card 
                mode='outlined'
                style={{
                  marginVertical:5,
                  marginHorizontal:5,
                }}>
                <Card.Content>
                  <Text variant="titleLarge">{item.User.Name}</Text>
                  <Text variant="bodyMedium">{item.Content}</Text>
                </Card.Content>  
              </Card>
            </ScrollView>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 10,
    borderBottomColor: "#000",
    height:'100%',
    width:'100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  boxComment_Parent:{
    height:'100%',
    width:'100%'
  },
  boxComment: {
    height:'20%',
    width: '95%',
  },
  inputComment:{
    marginLeft:20,
    marginVertical:10
  },
  list_Comment:{
    height:'80%',
    width:'100%'
  },
  button: {
    width: 100,
    marginTop: 10,
    left: 300
  },
  review: {
    display: "flex",
    height: 50,
    borderRadius: 2,
    borderColor: "#000",
    justifyContent: "center",
  }
});


