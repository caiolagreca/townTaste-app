import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { IconButton } from "@/components/ui/IconButton";
import { InputField } from "@/components/ui/InputField";

export const Login: React.FC = () => {

  return (
    <SafeAreaView>
      <View className="p-3">
        <View className="items-center">
          <Text className="font-poppinsBold text-2xl my-3">Login Here</Text>
          <Text className="font-poppins text-base max-w-3/5 text-center">
            Welcome back, you've been missed!
          </Text>
        </View>
        <View className="my-3">
          <InputField inputProps="Email" />
          <InputField inputProps="Password" secure />
        </View>

        <View>
          <Text className="pb-3 font-poppinsBold text-sm text-secondary-blue self-end">
            Forgot my password
          </Text>
        </View>
        <MainButton
          stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
          styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
          children="Sign in"
          screenName="SignUp"
        />
        <MainButton
          stylePressableProps="p-3"
          styleTextProps="font-poppins text-center text-base"
          children="Create new account"
          screenName="SignUp"
        />
        <View className="p-3">
          <Text className="font-poppins text-center text-sm">
            Or continue with
          </Text>
          <View className="p-1 flex-row justify-center">
            <IconButton nameProps="logo-google" />
            <IconButton nameProps="logo-apple" />
            <IconButton nameProps="logo-facebook" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
