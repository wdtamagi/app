import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "./core/colors";

import HomeScreen from "./screens/Home";
import LoginScreen from "./screens/Login";
import FormPostScreen from "./screens/FormPost";
import UserScreen from "./screens/User";
import PostScreen from "./screens/Post";
import SettingsScreen from "./screens/Settings";
import FormCommentScreen from "./screens/FormComment";

import Logo from "./components/Logo";
import UserAvatar from "./containers/UserAvatar";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <StatusBar backgroundColor={colors.dark} barStyle="light-content" />
    <Stack.Navigator
      initialRouteName={firebase.auth().currentUser ? "Home" : "Login"}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitle: props => <Logo {...props} />,
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0
          },
          headerRight: props => (
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <UserAvatar />
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="FormPost"
        component={FormPostScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
      <Stack.Screen
        name="FormComment"
        component={FormCommentScreen}
        options={{
          headerTitle: "",
          headerStyle: { backgroundColor: colors.background, elevation: 0 }
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
