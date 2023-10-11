/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View} from "react-native/Libraries/Components/View/View";
import { Rating } from "react-native-ratings";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { Button } from '@rneui/themed'
import { Text, TouchableOpacity } from "react-native";
import listRating from "../ListRating";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES, COLORS, FONTS } from "../../../constants";



const Star = ({ max, resID, userid }) => {

  const [averageStar, setAverageStar] = useState(0)
  const [ratinglist, setRatinglist] = useState([])

  const submitRating = async () => {
    if (userid) {
      const getRating = await firestore().collection('Rating')
        .doc(`quan${resID}`)
        .get()
      console.log("get ", getRating.data().listRating)
      var arrGetRating = getRating.data().listRating
      setRatinglist(arrGetRating)


      //
      const caculatingAvg = async () => {
        arrGetRating.push(max)
        console.log("ratinglist StarComponent", arrGetRating);
        await firestore().collection('Rating')
          .doc(`quan${resID}`)
          .set(
            {
              "RestaurantID": resID,
              "listRating": arrGetRating
            }
          )
        console.log('Update listrating')
      }
      caculatingAvg()
      alert("Cảm ơn bạn đã đánh giá!!")
    }
    else {
      console.log("Log in")
    }

  }


  const showStar = (avg) => {
    console.log("avg", avg)
    return avg
  }


  return (
    <SafeAreaView style={{
     
      alignItems:"center",
      justifyContent:"center",
      width:"100%",
    }}>
      <TouchableOpacity
          style={{
              width: SIZES.width * 0.3,
              padding: SIZES.padding*0.2,
              backgroundColor: COLORS.secondary,
              alignItems: 'center',
              borderRadius: SIZES.radius,
              
          }}
          onPress={submitRating}
      >
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Submit</Text>

      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

export default Star
