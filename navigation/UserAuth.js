import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import SignUp from "../screens/SignUp";
import SignInScreen from "../screens/SignIn";

const Stack = createStackNavigator();

export default function UserStack() {
    // Probs precisa do resto dos screens aqui
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}