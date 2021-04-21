import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = ({title}) => {
    return (
        <View style={{
            ...styles.headerBase,
            ...Platform.select({android: styles.headerAndroid, ios: styles.headerIOS })
        }}>
            <TitleText style={styles.headerTitle} >{title}</TitleText>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Platform.OS === 'android' ? Colors.primary : 'aliceblue',
    },

    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerIOS: {
        backgroundColor: 'aliceblue',
    }
})
