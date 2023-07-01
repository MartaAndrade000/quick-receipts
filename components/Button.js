import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const Button = ({ imageSource, label, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F6F7FC',
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: 'center',
    },
    image: {
        marginRight: 8,
        width: 8,
        height: 8,
        alignSelf: 'center',
    },
    label: {
        color: '#505050',
        fontSize: 8,
        alignSelf: 'center',
    },
});

export default Button;
