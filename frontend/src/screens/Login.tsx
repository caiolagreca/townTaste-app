import React from "react";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  OpenSans_400Regular,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { Lato_400Regular, Lato_700Bold } from "@expo-google-fonts/lato";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export const Login = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_700Bold,
    Lato_400Regular,
    Lato_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
  });
  return (
    <SafeAreaView>
      <View className="p-2">
        <View className="items-center">
          <Text className="font-poppinsBold text-2xl my-3">Login Here</Text>
          <Text className="font-poppins text-lg max-w-3/5 text-center">Welcome back you've been missed!</Text>
        </View>
        <View className="my-3">
            <TextInput placeholder="Email" className="font-poppins text-sm p-2 bg-slate-200 rounded-lg "/>
        </View>
      </View>
    </SafeAreaView>
  );
};
