import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";


import {useNavigation} from "@react-navigation/native";
const Card = ({ categoryName, numberReceipts, color }) => {

    const navigation = useNavigation();

    const handleCardPress = () => {
        navigation.navigate('Category');
    };

    const trapeziumStyle = {
        borderTopColor: color,
        borderRightColor: color,
    };

    return (
        <TouchableOpacity onPress={handleCardPress} style={styles.cardContainer}>
            <View style={styles.leftSection}>
                <Text style={styles.categoryName}>{categoryName}</Text>
                <Text style={styles.numberReceipts}>{numberReceipts} Receipts</Text>
            </View>
            <View style={styles.rightSection}>
                <View style={[styles.trapezium, trapeziumStyle]}></View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    cardContainer: {
        padding: 16,
        flexDirection: 'row',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 25,
        width: '45%',
        marginRight: 35,
        height: 120,


    },
    leftSection: {
        alignSelf: 'flex-end',

    },
    categoryName: {
        fontSize: 14,
        marginBottom: 4,
        color: '#9EDCE1',
        fontWeight: 'bold',

    },
    numberReceipts: {
        fontSize: 11,
        color: '#888888',
    },
    rightSection: {
        position: 'absolute', // Added position absolute
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',


    },
    trapezium: {
        borderTopWidth: 120,
        borderTopColor: '#9EDCE1',
        borderBottomWidth: 0,
        borderRightWidth: 10,
        borderRightColor: '#9EDCE1',
        borderLeftWidth: 55,
        borderLeftColor: '#FFFFFF',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: 10,
    },
});

export default Card;