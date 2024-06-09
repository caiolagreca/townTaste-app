import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "@/screens/Login";
import { SignUp } from "@/screens/SignUp";
import { RootStackParamList } from "@/types/navigationTypes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Home } from "@/screens/Home";
import { ForgotPassword } from "@/screens/ForgotPassword";
import { ResetPasword } from "@/screens/ResetPassword";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPasword} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
