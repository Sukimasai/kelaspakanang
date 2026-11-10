import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  image: string;
  onPress: () => void;
};

export default function BookCard({ title, image, onPress }: Props) {
  return (
    <View className="w-[47%] bg-black mb-6">
      <TouchableOpacity
        className="flex-1 bg-white border-2 border-black -translate-x-1.5 -translate-y-1.5"
        onPress={onPress}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-56 border-b-2 border-black"
        />
        <Text className="text-black text-base font-black p-3">{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
