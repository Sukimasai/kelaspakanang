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
import tw from "twrnc";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      setIsLoggedIn(true);
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

  function handleLogout() {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setErrorMessage("");
  }

  if (isRegistered) {
    return (
      <View style={tw`flex-1 bg-[#f4f1ea] justify-center px-6`}>
        <StatusBar style="dark" />
        <Text style={tw`text-black text-3xl font-black mb-8`}>
          {email} registered!
        </Text>

        <View style={tw`bg-black`}>
          <TouchableOpacity
            style={tw`bg-white border-2 border-black py-4 items-center -translate-x-1 -translate-y-1`}
            onPress={handleBack}
          >
            <Text style={tw`text-black text-base font-black tracking-widest`}>
              ← BACK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (isLoggedIn) {
    return (
      <View style={tw`flex-1 bg-[#f4f1ea] justify-center px-6`}>
        <StatusBar style="dark" />

        <View style={tw`bg-black`}>
          <View
            style={tw`bg-white border-2 border-black p-6 -translate-x-2 -translate-y-2`}
          >
            <View
              style={tw`self-start bg-orange-500 border-2 border-black px-3 py-1 mb-6`}
            >
              <Text style={tw`text-black text-xs font-black tracking-widest`}>
                ACCESS GRANTED
              </Text>
            </View>

            <Text style={tw`text-black text-5xl font-black mb-2`}>HELLO.</Text>
            <Text style={tw`text-neutral-500 text-base mb-8`}>{email}</Text>

            <View style={tw`bg-black`}>
              <TouchableOpacity
                style={tw`bg-white border-2 border-black py-4 items-center -translate-x-1 -translate-y-1`}
                onPress={handleLogout}
              >
                <Text style={tw`text-black text-base font-black tracking-widest`}>
                  LOG OUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={tw`flex-1 bg-[#f4f1ea]`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={tw`flex-grow justify-center px-6 py-16`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex-row items-center mb-8`}>
          <View style={tw`w-4 h-4 bg-orange-500 border-2 border-black mr-2`} />
          <Text style={tw`text-black text-xs font-black tracking-widest`}>
            KELAS PAKANANG
          </Text>
        </View>

        <View style={tw`flex-row border-2 border-black mb-8`}>
          <TouchableOpacity
            style={tw`flex-1 py-3 items-center ${tab === "login" ? "bg-black" : "bg-white"}`}
            onPress={() => changeTab("login")}
          >
            <Text
              style={tw`text-xs font-black tracking-widest ${tab === "login" ? "text-white" : "text-black"}`}
            >
              LOG IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-1 py-3 items-center ${tab === "register" ? "bg-black" : "bg-white"}`}
            onPress={() => changeTab("register")}
          >
            <Text
              style={tw`text-xs font-black tracking-widest ${tab === "register" ? "text-white" : "text-black"}`}
            >
              REGISTER
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={tw`text-black text-6xl font-black`}>
          {tab === "login" ? "LOG" : "SIGN"}
        </Text>
        <Text style={tw`text-orange-500 text-6xl font-black mb-10`}>
          {tab === "login" ? "IN." : "UP."}
        </Text>

        <Text style={tw`text-black text-xs font-black tracking-widest mb-2`}>
          EMAIL
        </Text>
        <TextInput
          style={tw`bg-white border-2 border-black text-black text-base px-4 py-3.5 mb-6`}
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor="#a3a3a3"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={tw`text-black text-xs font-black tracking-widest mb-2`}>
          PASSWORD
        </Text>
        <View style={tw`flex-row bg-white border-2 border-black`}>
          <TextInput
            style={tw`flex-1 text-black text-base px-4 py-3.5`}
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            placeholderTextColor="#a3a3a3"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={tw`bg-black justify-center px-4`}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={tw`text-white text-xs font-black tracking-widest`}>
              {showPassword ? "HIDE" : "SHOW"}
            </Text>
          </TouchableOpacity>
        </View>

        {errorMessage !== "" && (
          <View style={tw`bg-red-500 border-2 border-black px-4 py-3 mt-4`}>
            <Text style={tw`text-white text-sm font-bold`}>{errorMessage}</Text>
          </View>
        )}

        <View style={tw`bg-black mt-8`}>
          <TouchableOpacity
            style={tw`bg-orange-500 border-2 border-black py-4 items-center -translate-x-1 -translate-y-1`}
            onPress={tab === "login" ? handleLogin : handleRegister}
          >
            <Text style={tw`text-black text-base font-black tracking-widest`}>
              {tab === "login" ? "LOG IN →" : "REGISTER →"}
            </Text>
          </TouchableOpacity>
        </View>

        {tab === "login" && (
          <View style={tw`border-2 border-dashed border-black p-4 mt-10`}>
            <Text style={tw`text-black text-xs font-black tracking-widest mb-2`}>
              DEMO ACCOUNT
            </Text>
            <Text style={tw`text-black text-sm`}>admin@example.com</Text>
            <Text style={tw`text-black text-sm`}>password123</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
