import React from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  nameProps: "logo-google" | "logo-facebook" | "logo-apple";
}

export const IconButton: React.FC<Props> = ({ nameProps }) => {
  return (
    <Pressable className="p-1 m-3 bg-neutral-light rounded-sm">
      <Ionicons name={nameProps} color="black" size={28} />
    </Pressable>
  );
};
