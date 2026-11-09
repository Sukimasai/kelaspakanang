import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

type Props = {
  onLogout: () => void;
};

export default function HomePage({ onLogout }: Props) {
  return (
    <ScrollView
      className="flex-1 bg-[#f4f1ea]"
      contentContainerClassName="px-6 pt-16 pb-10"
    >
      <StatusBar style="dark" />

      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity
          className="border-2 border-black px-3 py-1"
          onPress={onLogout}
        >
          <Text className="text-black text-xs font-black tracking-widest">
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
