import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BodyText = ({ children, style }) => <Text style={{ ...styles.body, ...style }}>{children}</Text>

export default BodyText

const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans',
    }
})
