import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import { Controller } from 'react-hook-form'

const CustomInput = ({ type, control, name, rules = {}, placeholder, secureTextEntry }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
                        <TextInput
                            keyboardType={type}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={[styles.input, {}]}
                            secureTextEntry={secureTextEntry}>

                        </TextInput>
                    </View>
                    {error && (
                        <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || 'Error'}</Text>
                    )}
                </>
            )}>
        </Controller>

    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,

    },
    input: {},
});

export default CustomInput