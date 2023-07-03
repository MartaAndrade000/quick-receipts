import React, { useState } from 'react';
import { View, Button, Modal, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';

const ColorChooser = ({ onSelectColor }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState('');

    const colors = [
        '#FDC7C9', // Light Pink
        '#FDD9B5', // Peach
        '#FFE7C4', // Pale Yellow
        '#B9E1DC', // Light Blue
        '#D9E4DD', // Mint Green
        '#F4D2C4', // Soft Orange
        '#C9D6DB', // Grayish Blue
        '#F0E0A3', // Pale Gold
        '#EFD6AC', // Cream
        '#FDC6E3', // Soft Pink
        '#FFD8B8', // Apricot
        '#FFF9C4', // Light Lemon
        '#D6EFFC', // Sky Blue
        '#DAF4EF', // Mint Cream
        '#F9D6C9', // Salmon
        '#CEDDE3', // Periwinkle
        '#FFECB3', // Pale Canary
        '#F9E8A6', // Pale Sunflower
        '#EADFB9', // Light Khaki
        '#FFE2BC', // Pale Peach
    ];

    const renderColorItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.colorItem, { backgroundColor: item }]}
            onPress={() => {
                setSelectedColor(item);
                onSelectColor(item);
                setModalVisible(false);
            }}
        />
    );

    return (
        <View>
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={[styles.button, { backgroundColor: selectedColor ? selectedColor : '#DAF4EF' }]}
            />

            <Modal visible={modalVisible} animationType="slide">
                <FlatList
                    data={colors}
                    numColumns={4}
                    keyExtractor={(item) => item}
                    renderItem={renderColorItem}
                />

                <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#DAF4EF',
        borderRadius: 15,
        width: 120,
        height: 30,
    },
    colorItem: {
        flex: 1,
        aspectRatio: 1,
        margin: 5,
    },
    selectedColor: {
        marginTop: 20,
        width: 50,
        height: 50,
        alignSelf: 'center',
    },
});

export default ColorChooser;
