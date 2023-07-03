import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, View, Image} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../constants/Colors';
import Header from "../components/Header";
import HomeScreen from "../screens/Home";
import Categories from "../screens/Categories";
import Finances from "../screens/Finances";
import Profile from "../screens/Profile";
import AddReceipt from "../screens/AddReceipt";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            // activeColor="#C0E5E8"
            // inactiveColor="#C0E5E8"
            screenOptions={() => ({
                // tabBarIcon: ({ color }) => (
                //     // <CustomTabBarIcon
                //     //     name={route.name}
                //     //     color={color}
                //     //     focused={route.name === getFocusedRouteNameFromRoute(route)}
                //     // />
                // ),
                tabBarActiveTintColor: Colors[colorScheme].tint,
                tabBarStyle: {
                    height: 60,
                },
            })}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={({}) => ({
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <View style={styles.tabBarIconContainer}>
                            {focused && <View style={styles.tabBarLine}/>}
                            <TabBarIcon name="home" color={"#C0E5E8"}/>
                        </View>
                    ),
                })}
            />


            <BottomTab.Screen
                name="Categories"
                component={Categories}
                options={() => ({
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <View style={styles.tabBarIconContainer}>
                            {focused && <View style={styles.tabBarLine}/>}
                            <TabBarIcon name="categories" color={"#C0E5E8"}/>
                        </View>
                    ),
                })}
            />

            <BottomTab.Screen
                name="Add"
                component={AddReceipt}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <View style={styles.addButtonContainer}>
                            <View style={styles.addButton}>
                                <Image
                                    source={require('../assets/icons/plus.png')}
                                    style={styles.addButtonImage}
                                />
                            </View>
                        </View>
                    ),
                    tabBarLabel: '', // Remove the label text
                }}
            />

            <BottomTab.Screen
                name="Finances"
                component={Finances}
                options={({}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabBarIconContainer}>
                            {focused && <View style={styles.tabBarLine}/>}
                            <TabBarIcon name="finances" color={"#C0E5E8"}/>
                        </View>
                    ),
                })}
            />

            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={({}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <View style={styles.tabBarIconContainer}>
                            {focused && <View style={styles.tabBarLine}/>}
                            <TabBarIcon name="profile" color={"#C0E5E8"}/>
                        </View>
                    ),
                })}
            />

        </BottomTab.Navigator>
    );
}

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: () => <Header/>,
                headerTitleAlign: 'center',
                headerStyle: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5E5',
                    height: 95,
                },
            }}
        >
            <Stack.Screen name="Main" component={BottomTabNavigator}/>
        </Stack.Navigator>
    );
};

export default RootNavigator;

function TabBarIcon({name, color}) {
    let iconPath = '';

    switch (name) {
        case 'home':
            iconPath = require('../assets/icons/home.png');
            break;
        case 'categories':
            iconPath = require('../assets/icons/categories.png');
            break;
        case 'finances':
            iconPath = require('../assets/icons/money.png');
            break;
        case 'profile':
            iconPath = require('../assets/icons/user1.png');
            break;
        default:
            break;
    }

    return (
        <View>
            <Image
                source={iconPath}
                style={{width: 30, height: 30, tintColor: color}}
            />
        </View>
    );
}


const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButtonContainer: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF', // Set the background color
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7, // Adjust the marginTop to center the button within the bottom navigation bar
    },
    addButtonImage: {
        width: 64, // Adjust the size of the image as needed
        height: 64,
        resizeMode: 'contain',
    },

    tabBarIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarLine: {
        position: 'absolute',
        top: -6,
        width: '100%', // Set the width of the line to cover the entire icon width
        height: 3, // Adjust the height of the line as needed
        backgroundColor: '#C0E5E8', // Set the color of the line
    },
};
