import React from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'

const GameOverScreen = ({ numberOfRounds, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    fadeDuration={400}
                    source={require('../assets/success.png')}
                    // source={{uri: 'https://cdn.pixabay.com/photo/2018/08/26/01/40/mountain-3631349__340.jpg'}}
                    resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}> <Text style={styles.highlight}>{numberOfRounds}</Text> rounds  were needed to guess the number <Text style={styles.highlight}>{userNumber}</Text>  </BodyText>
            </View>

            <MainButton onPressBtn={onRestart}>New Game</MainButton>
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: Colors.primary,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 18
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    }
})
