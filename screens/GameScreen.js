import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const GameScreen = ({ userChoice, onGameOver }) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice))

    const [rounds, setRounds] = useState(0)

    const currentLow = useRef(1) // why refs ? values survice component re-renders
    const currentHigh = useRef(100)

    useEffect(() => {
        if (currentGuess === userChoice ) {
            onGameOver(rounds)
        }
        return () => {  }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Trynna be Smart?!', 'We both know that\'s wrong', [{ text: 'Sorry!', style: 'cancel'}])
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1 )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPressBtn={() => nextGuessHandler('lower')}> <Ionicons name="md-remove" size={24} color="white" /> </MainButton>
                <MainButton onPressBtn={nextGuessHandler.bind(this, 'greater')}> <Ionicons name="md-add" size={24} color="white" /> </MainButton>
            </Card>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    }
})
