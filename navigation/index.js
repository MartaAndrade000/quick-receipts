// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import {useAuthentication} from '../firebase/utils/useAuthentication';

import Category from "../screens/Category";
import AuthStack from "./AuthStack";

export default function Navigation({colorScheme}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
    const {user} = useAuthentication();
    //const user = true;

    return user ? <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Root" component={BottomTabNavigator}/>
            {/*<Stack.Screen name="Categories" component={CategoriesScreen} />*/}
            {/*<Stack.Screen name="CategoryScreen" component={CategoryScreen} />*/}
            <Stack.Screen name="CategoryScreen" component={Category} title={"Category Name"}/>
            <Stack.Screen
                name="NotFound"
                component={NotFoundScreen}
                options={{title: "Oops!"}}
            />
        </Stack.Navigator> :
        <AuthStack/>
        ;
}
