import React, { useRef } from "react";
import { TextInput, View } from "react-native";

interface FourDigitInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FourDigitInput: React.FC<FourDigitInputProps> = ({
  value,
  onChange,
}) => {
  const values = value.split("");
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newValues = [...values];
    newValues[index] = text.replace(/[^0-9]/g, "").slice(-1); // Ensure only one digit
    onChange(newValues.join(""));

    // Focus on the next input
    if (text && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <View className="flex-row justify-center items-center mt-3 space-x-2">
      {Array(4)
        .fill("")
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputsRef.current[index] = el!)}
            className="text-xl tracking-widest text-center border border-gray-400 rounded-md w-12 h-12"
            value={values[index] || ""}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
    </View>
  );
};
