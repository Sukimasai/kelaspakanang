import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import books from "../../../data/books.json";
import ShadowButton from "../../components/ShadowButton";
import InfoBox from "../../components/InfoBox";

const formatDate = (date: Date | null | undefined) => {
  if (!date) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
};

export default function BorrowPage() {
  const { id } = useLocalSearchParams();
  const book = books.find((item) => item.id === Number(id));
  
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  
  const [showPickup, setShowPickup] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleConfirm() {
    setErrorMessage("");

    if (!pickupDate || !returnDate) {
      setErrorMessage("Please fill in both dates");
      return;
    }

    if (returnDate < pickupDate) {
      setErrorMessage("Return date cannot be before pickup date");
      return;
    }

    setIsConfirmed(true);
  }

  const onChangePickup = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowPickup(false);
    if (selectedDate) setPickupDate(selectedDate);
  };

  const onChangeReturn = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowReturn(false);
    if (selectedDate) setReturnDate(selectedDate);
  };

  if (isConfirmed) {
    return (
      <View className="flex-1 bg-[#f4f1ea] justify-center px-6">
        <Text className="text-black text-5xl font-black">CONFIRMED!</Text>
        <Text className="text-neutral-500 text-base mt-2 mb-8">
          {book?.title}
        </Text>

        <InfoBox
          rows={[
            { label: "PICKUP", value: formatDate(pickupDate) },
            { label: "RETURN", value: formatDate(returnDate) },
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
        <TouchableOpacity
          onPress={() => setShowPickup(true)}
          className="bg-white border-2 border-black px-4 py-3.5 mb-6 justify-center"
        >
          <Text className={pickupDate ? "text-black text-base" : "text-[#a3a3a3] text-base"}>
            {pickupDate ? formatDate(pickupDate) : "Select Pickup Date"}
          </Text>
        </TouchableOpacity>

        {showPickup && (
          <DateTimePicker
            value={pickupDate || new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangePickup}
            minimumDate={new Date()}
          />
        )}

        <Text className="text-black text-xs font-black tracking-widest mb-2">
          RETURN DATE
        </Text>
        <TouchableOpacity
          onPress={() => setShowReturn(true)}
          className="bg-white border-2 border-black px-4 py-3.5 justify-center"
        >
          <Text className={returnDate ? "text-black text-base" : "text-[#a3a3a3] text-base"}>
            {returnDate ? formatDate(returnDate) : "Select Return Date"}
          </Text>
        </TouchableOpacity>

        {showReturn && (
          <DateTimePicker
            value={returnDate || (pickupDate || new Date())}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeReturn}
            minimumDate={pickupDate || new Date()}
          />
        )}

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