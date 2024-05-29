import { IconButton } from "@/components/ui/IconButton";
import { InputField } from "@/components/ui/InputField";
import { MainButton } from "@/components/ui/MainButton";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";

export const SignUp = () => {
  return (
    <SafeAreaView>
      <View className="p-3">
        <View className="items-center">
          <Text className="font-poppinsBold text-2xl my-3">Create Account</Text>
          <Text className="font-poppins text-sm max-w-4/5 text-center">
            Create an account so you can explore all the existing jobs
          </Text>
        </View>
        <View className="my-3">
          {/* <InputField inputProps="Email" />
          <InputField inputProps="Password" secure />
          <InputField inputProps="Confirm Password" secure /> */}
        </View>
  {/*       <MainButton
          stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
          styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
          onPressProps={}
          children="Sign Up"
          screenName="Login"
        />
        <MainButton
          stylePressableProps="p-3"
          styleTextProps="font-poppins text-center text-base"
          onPressProps={}
          children="Already have an account"
          screenName="Login"
        /> */}
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
