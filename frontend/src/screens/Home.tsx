import React from "react";
import { SafeAreaView, Text, View, ScrollView, Image } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import logo from "../../assets/logo.png";

export const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
        <View className="items-center mb-6">
          <Image source={logo} className="w-24 h-24 mb-4" />
          <Text className="font-poppinsBold text-3xl text-primary-red mb-2">
            Welcome to Towntaste
          </Text>
          <Text className="font-poppins text-lg text-neutral-dark max-w-4/5 text-center">
            Discover and share the best local food experiences in your town!
          </Text>
        </View>

        <View className="flex-1 items-center">
          <Text className="font-poppinsBold text-2xl text-neutral-dark mb-4">
            App in construction...
          </Text>
          <MainButton
            stylePressableProps="p-4 bg-primary-red rounded-lg shadow mb-4"
            styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
            onPressProps={() => {}}
            children="Nearby Restaurants"
          />
          <MainButton
            stylePressableProps="p-4 bg-primary-orange rounded-lg shadow mb-4"
            styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
            onPressProps={() => {}}
            children="Popular Dishes"
          />
          <MainButton
            stylePressableProps="p-4 bg-secondary-blue rounded-lg shadow mb-4"
            styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
            onPressProps={() => {}}
            children="Food Events"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
