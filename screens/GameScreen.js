import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, ScrollView, FlatList, Dimensions } from 'react-native'
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons';
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import DefaultStyles from '../constants/default-styles'
import BodyText from '../components/BodyText';

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

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]) //flat list key expects a string
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1) // why refs ? values survice component re-renders
    const currentHigh = useRef(100)

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
        }
        return () => { }
    }, [currentGuess, userChoice, onGameOver])

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }
        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    const nextGuessHandler = (direction) => {
        if ((direction === 'lower' && currentGuess < userChoice) || (direction === 'greater' && currentGuess > userChoice)) {
            Alert.alert('Trynna be Smart?!', 'We both know that\'s wrong', [{ text: 'Sorry!', style: 'cancel' }])
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1 )
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <MainButton onPressBtn={() => nextGuessHandler('lower')}> <Ionicons name="md-remove" size={24} color="white" /> </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPressBtn={nextGuessHandler.bind(this, 'greater')}> <Ionicons name="md-add" size={24} color="white" /> </MainButton>
                </View>
                <View style={styles.listContainer}>
                    {/* method 1 using scroll view */}
                    {/* <ScrollView contentContainerStyle={styles.list} >
                         {/* {pastGuesses.map((guess, i) => {return renderListItem(guess, pastGuesses.length - i)})} ///
    
                        {pastGuesses.map((guess, i) => (
                            <View key={guess} style={styles.listItem}>
                                <BodyText>#{pastGuesses.length - i}</BodyText>
                                <BodyText>{guess}</BodyText>
                            </View>
                        ))}
                    </ScrollView> */}
    
                    {/* method 2 using flat list */}
                    <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
                </View>
    
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPressBtn={() => nextGuessHandler('lower')}> <Ionicons name="md-remove" size={24} color="white" /> </MainButton>
                <MainButton onPressBtn={nextGuessHandler.bind(this, 'greater')}> <Ionicons name="md-add" size={24} color="white" /> </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* method 1 using scroll view */}
                {/* <ScrollView contentContainerStyle={styles.list} >
                     {/* {pastGuesses.map((guess, i) => {return renderListItem(guess, pastGuesses.length - i)})} ///

                    {pastGuesses.map((guess, i) => (
                        <View key={guess} style={styles.listItem}>
                            <BodyText>#{pastGuesses.length - i}</BodyText>
                            <BodyText>{guess}</BodyText>
                        </View>
                    ))}
                </ScrollView> */}

                {/* method 2 using flat list */}
                <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list} />
            </View>

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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
})
