import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const EMAIL = "admin@example.com";
  const PASSW = "password123";

  const handleLogin = () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (email === EMAIL && password === PASSW) {
      setIsLoggedIn(true);
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  if (isLoggedIn) {
    return (
      <SafeAreaView className="flex-1 bg-stone-50 justify-center items-center px-6">
        <View className="w-full max-w-sm bg-white border border-stone-200 rounded-2xl p-8 items-center">
          <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center mb-4">
            <Text className="text-emerald-700 font-medium text-lg">✓</Text>
          </View>

          <Text className="text-xl font-semibold text-stone-900 mb-1">
            Welcome back
          </Text>
          <Text className="text-stone-500 text-sm text-center mb-6">
            Signed in as {email}
          </Text>

          <TouchableOpacity
            onPress={handleLogout}
            activeOpacity={0.8}
            className="w-full py-3 bg-stone-900 rounded-xl items-center"
          >
            <Text className="text-white font-medium text-sm">Sign out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-stone-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center items-center px-6"
      >
        <View className="w-full max-w-sm">
          <View className="mb-8">
            <View className="w-9 h-9 bg-stone-900 rounded-lg justify-center items-center mb-6">
              <Text className="text-white font-semibold text-base">Tes tess</Text>
            </View>
            <Text className="text-2xl font-bold text-stone-900 tracking-tight">
              Sign in to Studio
            </Text>
            <Text className="text-stone-500 text-sm mt-1">
              Welcome back, please enter your details
            </Text>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="admin@example.com"
                placeholderTextColor="#a8a29e"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full px-3.5 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm"
              />
            </View>

            <View className="mt-4">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                  Password
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-xs font-medium text-stone-600">
                    Forgot?
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="relative justify-center">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#a8a29e"
                  secureTextEntry={!showPassword}
                  className="w-full px-3.5 py-3 bg-white border border-stone-300 rounded-xl text-stone-900 text-sm pr-16"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  className="absolute right-3 py-1 px-2"
                >
                  <Text className="text-xs font-medium text-stone-500">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {errorMessage ? (
              <View className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <Text className="text-xs font-medium text-rose-700">
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={handleLogin}
              activeOpacity={0.85}
              className="w-full py-3.5 bg-stone-900 rounded-xl items-center mt-6 shadow-sm"
            >
              <Text className="text-white font-medium text-sm">
                Continue with Email
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8 p-3.5 bg-stone-100 rounded-xl border border-stone-200">
            <Text className="text-xs font-medium text-stone-700 mb-1">
              Demo Credentials:
            </Text>
            <Text className="text-xs text-stone-500">
              Email: <Text className="font-mono text-stone-800">admin@example.com</Text>
            </Text>
            <Text className="text-xs text-stone-500">
              Password: <Text className="font-mono text-stone-800">password123</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}