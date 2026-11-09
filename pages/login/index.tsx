import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type Props = {
  onLogin: () => void;
};

export default function LoginPage({ onLogin }: Props) {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  function changeTab(newTab: string) {
    setTab(newTab);
    setErrorMessage("");
  }

  function handleLogin() {
    setErrorMessage("");

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (email === "admin@example.com" && password === "password123") {
      onLogin();
    } else {
      setErrorMessage("Wrong email or password");
    }
  }

  function handleRegister() {
    setErrorMessage("");

    if (email === "" || password === "") {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setIsRegistered(true);
  }

  function handleBack() {
    setIsRegistered(false);
    setEmail("");
    setPassword("");
    setErrorMessage("");
  }

  if (isRegistered) {
    return (
      <View className="flex-1 bg-[#f4f1ea] justify-center px-6">
        <StatusBar style="dark" />
        <Text className="text-black text-3xl font-black mb-8">
          {email} registered!
        </Text>

        <View className="bg-black">
          <TouchableOpacity
            className="bg-white border-2 border-black py-4 items-center -translate-x-1 -translate-y-1"
            onPress={handleBack}
          >
            <Text className="text-black text-base font-black tracking-widest">
              ← BACK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#f4f1ea]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerClassName="flex-grow justify-center px-6 py-16"
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-row border-2 border-black mb-8">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${tab === "login" ? "bg-black" : "bg-white"}`}
            onPress={() => changeTab("login")}
          >
            <Text
              className={`text-xs font-black tracking-widest ${tab === "login" ? "text-white" : "text-black"}`}
            >
              LOG IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${tab === "register" ? "bg-black" : "bg-white"}`}
            onPress={() => changeTab("register")}
          >
            <Text
              className={`text-xs font-black tracking-widest ${tab === "register" ? "text-white" : "text-black"}`}
            >
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-black text-6xl font-black">
          {tab === "login" ? "LOG" : "SIGN"}
        </Text>
        <Text className="text-orange-500 text-6xl font-black mb-10">
          {tab === "login" ? "IN." : "UP."}
        </Text>

        <Text className="text-black text-xs font-black tracking-widest mb-2">
          EMAIL
        </Text>
        <TextInput
          className="bg-white border-2 border-black text-black text-base px-4 py-3.5 mb-6"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#a3a3a3"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text className="text-black text-xs font-black tracking-widest mb-2">
          PASSWORD
        </Text>
        <View className="flex-row bg-white border-2 border-black">
          <TextInput
            className="flex-1 text-black text-base px-4 py-3.5"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            placeholderTextColor="#a3a3a3"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="bg-black justify-center px-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text className="text-white text-xs font-black tracking-widest">
              {showPassword ? "HIDE" : "SHOW"}
            </Text>
          </TouchableOpacity>
        </View>

        {errorMessage !== "" && (
          <View className="bg-red-500 border-2 border-black px-4 py-3 mt-4">
            <Text className="text-white text-sm font-bold">{errorMessage}</Text>
          </View>
        )}

        <View className="bg-black mt-8">
          <TouchableOpacity
            className="bg-orange-500 border-2 border-black py-4 items-center -translate-x-1 -translate-y-1"
            onPress={tab === "login" ? handleLogin : handleRegister}
          >
            <Text className="text-black text-base font-black tracking-widest">
              {tab === "login" ? "LOG IN →" : "REGISTER →"}
            </Text>
          </TouchableOpacity>
        </View>

        {tab === "login" && (
          <View className="border-2 border-dashed border-black p-4 mt-10">
            <Text className="text-black text-xs font-black tracking-widest mb-2">
              DEMO ACCOUNT
            </Text>
            <Text className="text-black text-sm">admin@example.com</Text>
            <Text className="text-black text-sm">password123</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
