import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  inputProps: string;
  secure?: boolean;
  onChangeProps: (value: string) => void;
  onBlurProps?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string | false | undefined;
}

export const InputField: React.FC<Props> = ({
  inputProps,
  secure,
  onChangeProps,
  onBlurProps,
  error,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [iseFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlurProps) {
      onBlurProps(e);
    }
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
        onChangeText={onChangeProps}
        {...props}
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
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};
