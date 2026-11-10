import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import books from "../../data/books.json";

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
    
      <View className="flex-row flex-wrap justify-between">
        {books.map((book) => (
          <View key={book.id} className="w-[47%] bg-black mb-6">
            <View className="flex-1 bg-white border-2 border-black -translate-x-1.5 -translate-y-1.5">
              <Image
                source={{ uri: book.image }}
                className="w-full h-56 border-b-2 border-black"
              />
              <Text className="text-black text-base font-black p-3">
                {book.title}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
