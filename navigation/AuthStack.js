import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Start from "../screens/Start";
import Home from "../screens/Home";


const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        // <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Start" component={Start} />
                {<Stack.Screen name="Home" component={Home} />}
            </Stack.Navigator>
        // </NavigationContainer>
    );
}