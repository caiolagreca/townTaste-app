import { RootStackParamList } from "@/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableStateCallbackType,
  Text,
} from "react-native";

interface Props {
  styleTextProps: string;
  stylePressableProps: string;
  onPressProps: () => void;
  children: string;
  isLoading?: boolean;
}

export const MainButton: React.FC<Props> = ({
  styleTextProps,
  stylePressableProps,
  onPressProps,
  children,
  isLoading,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={onPressProps}
      className={`${stylePressableProps} ${
        isLoading ? "opacity-70" : "opacity-100"
      } ${({ pressed }: PressableStateCallbackType) =>
        pressed ? "opacity-70" : "opacity-100"} `}
      android_ripple={{ color: "rgba(255, 255, 255, 0.2)" }}
    >
      {isLoading ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <Text className={styleTextProps}>{children}</Text>
      )}
    </Pressable>
  );
};
