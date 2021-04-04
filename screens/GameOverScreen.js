import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const GameOverScreen = ({numberOfRounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is over</Text>
            <Text>Number of rounds: {numberOfRounds} </Text>
            <Text>Number was: {userNumber} </Text>
            <Button title="New Game" onPress={onRestart} />
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
