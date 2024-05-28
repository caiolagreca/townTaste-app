import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  inputProps: string;
  secure?: boolean;
}

export const InputField: React.FC<Props> = ({ inputProps, secure }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [iseFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View className={`relative my-3 ${iseFocused ? "shadow-lg" : ""}`}>
      <TextInput
        placeholder={inputProps}
        secureTextEntry={secure && !isPasswordVisible}
        className={`font-poppins text-sm p-4 bg-slate-200 rounded-lg my-1 ${
          iseFocused ? "border-2 border-blue-500" : ""
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {secure && (
        <Pressable
          onPress={togglePasswordVisibility}
          className="absolute right-3 top-4"
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </Pressable>
      )}
    </View>
  );
};
