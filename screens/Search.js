/* eslint-disable prettier/prettier */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { icons, COLORS, FONTS, SIZES } from '../constants';
import TabTwoScreen from '../src/components/Autocomplete';

function Search() {
    return (
        <SafeAreaView style={styles.container}>
            <TabTwoScreen />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Search;