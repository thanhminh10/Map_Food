
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons, COLORS } from '../../../constants';
import { Image } from 'react-native';

const Favourite = ({ isSelected }) => {
    return (
        <Image
            source={icons.like}
            resizeMode="contain"
            style={{
                width: 25,
                height: 25,
                tintColor: isSelected ? "red" : COLORS.secondary
            }}
        />

    )
};

export default Favourite;