import { RootStackParamList } from "@/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  styleTextProps: string;
  stylePressableProps: string;
  onPressProps: () => void;
  children: string;
  //screenName: keyof RootStackParamList;
}

export const MainButton: React.FC<Props> = ({
  styleTextProps,
  stylePressableProps,
  onPressProps,
  children,
  /* screenName, */
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      onPress={onPressProps}
      /* onPress={() => navigation.navigate(screenName)} */
      className={stylePressableProps}
    >
      <Text className={styleTextProps}>{children}</Text>
    </Pressable>
  );
};
