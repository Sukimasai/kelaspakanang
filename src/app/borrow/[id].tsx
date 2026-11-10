import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import books from "../../../data/books.json";
import ShadowButton from "../../components/ShadowButton";
import InfoBox from "../../components/InfoBox";

export default function BorrowPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const book = books.find((item) => item.id === Number(id));
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleConfirm() {
    setErrorMessage("");

    if (pickupDate === "" || returnDate === "") {
      setErrorMessage("Please fill in both dates");
      return;
    }

    setIsConfirmed(true);
  }

  if (isConfirmed) {
    return (
      <View className="flex-1 bg-[#f4f1ea] justify-center px-6">
        <Text className="text-black text-5xl font-black">CONFIRMED!</Text>
        <Text className="text-neutral-500 text-base mt-2 mb-8">
          {book?.title}
        </Text>

        <InfoBox
          rows={[
            { label: "PICKUP", value: pickupDate },
            { label: "RETURN", value: returnDate },
          ]}
          className="mb-8"
        />

        <ShadowButton
          label="← BACK"
          color="white"
          onPress={() => router.back()}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#f4f1ea]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerClassName="flex-grow px-6 pt-16 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          className="self-start border-2 border-black px-3 py-1 mb-8"
          onPress={() => router.back()}
        >
          <Text className="text-black text-xs font-black tracking-widest">
            ← BACK
          </Text>
        </TouchableOpacity>

        <Text className="text-black text-6xl font-black">BORROW.</Text>
        <Text className="text-orange-500 text-lg font-black mb-10">
          {book?.title}
        </Text>

        <Text className="text-black text-xs font-black tracking-widest mb-2">
          PICKUP DATE
        </Text>
        <TextInput
          className="bg-white border-2 border-black text-black text-base px-4 py-3.5 mb-6"
          value={pickupDate}
          onChangeText={setPickupDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#a3a3a3"
          keyboardType="numbers-and-punctuation"
        />

        <Text className="text-black text-xs font-black tracking-widest mb-2">
          RETURN DATE
        </Text>
        <TextInput
          className="bg-white border-2 border-black text-black text-base px-4 py-3.5"
          value={returnDate}
          onChangeText={setReturnDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#a3a3a3"
          keyboardType="numbers-and-punctuation"
        />

        {errorMessage !== "" && (
          <View className="bg-red-500 border-2 border-black px-4 py-3 mt-4">
            <Text className="text-white text-sm font-bold">{errorMessage}</Text>
          </View>
        )}

        <ShadowButton
          label="CONFIRM →"
          onPress={handleConfirm}
          className="mt-8"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
