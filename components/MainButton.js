import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Colors from '../constants/colors'

const MainButton = ({ children, onPressBtn }) => {
    let BtnComponent = TouchableOpacity
    if (Platform.OS === 'android' && Platform.Version >=21 ) {
        BtnComponent = TouchableNativeFeedback
    }
    return (
        <View style={styles.btnContainer}>
            <BtnComponent onPress={onPressBtn} activeOpacity={0.5}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </BtnComponent>
        </View>


    )
}

export default MainButton

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    },
})
