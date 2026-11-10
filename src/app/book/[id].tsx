import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import books from "../../../data/books.json";
import ShadowButton from "../../components/ShadowButton";

export default function BookPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = books.find((item) => item.id === Number(id));

  if (!book) {
    return (
      <View className="flex-1 bg-[#f4f1ea] justify-center px-6">
        <Text className="text-black text-2xl font-black">Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-[#f4f1ea]"
      contentContainerClassName="px-6 pt-16 pb-10"
    >
      <TouchableOpacity
        className="self-start border-2 border-black px-3 py-1 mb-8"
        onPress={() => router.back()}
      >
        <Text className="text-black text-xs font-black tracking-widest">
          ← BACK
        </Text>
      </TouchableOpacity>

      <View className="self-center bg-black mb-8">
        <Image
          source={{ uri: book.image }}
          className="w-48 h-72 border-2 border-black -translate-x-1.5 -translate-y-1.5"
        />
      </View>

      <Text className="text-black text-4xl font-black mb-2">{book.title}</Text>
      <Text className="text-orange-500 text-lg font-black mb-8">
        by {book.author}
      </Text>

      <View className="border-2 border-black bg-white mb-8">
        <View className="p-4 border-b-2 border-black">
          <Text className="text-neutral-500 text-xs font-black tracking-widest mb-1">
            GENRE
          </Text>
          <Text className="text-black text-lg font-black">{book.genre}</Text>
        </View>
        <View className="p-4">
          <Text className="text-neutral-500 text-xs font-black tracking-widest mb-1">
            ISBN
          </Text>
          <Text className="text-black text-lg font-black">{book.isbn}</Text>
        </View>
      </View>

      <Text className="text-black text-xs font-black tracking-widest mb-3">
        SYNOPSIS
      </Text>
      <Text className="text-black text-base leading-7">
        {book.synopsis}
      </Text>

      <ShadowButton
        label="BORROW →"
        onPress={() => router.push(`/borrow/${book.id}`)}
        className="mt-10"
      />
    </ScrollView>
  );
}
