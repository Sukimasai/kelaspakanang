import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  color?: "orange" | "white";
  className?: string;
};

export default function ShadowButton({
  label,
  onPress,
  color = "orange",
  className = "",
}: Props) {
  return (
    <View className={`bg-black ${className}`}>
      <TouchableOpacity
        className={`${color === "orange" ? "bg-orange-500" : "bg-white"} border-2 border-black py-4 items-center -translate-x-1 -translate-y-1`}
        onPress={onPress}
      >
        <Text className="text-black text-base font-black tracking-widest">
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
