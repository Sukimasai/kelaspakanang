import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import books from "../../data/books.json";
import BookCard from "../components/BookCard";

export default function HomePage() {
  return (
    <ScrollView
      className="flex-1 bg-[#f4f1ea]"
      contentContainerClassName="px-6 pt-16 pb-10"
    >
      <View className="flex-row items-center justify-between mb-8">
        <TouchableOpacity
          className="border-2 border-black px-3 py-1"
          onPress={() => router.replace("/")}
        >
          <Text className="text-black text-xs font-black tracking-widest">
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            image={book.image}
            onPress={() => router.push(`/book/${book.id}`)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
