import React from "react";
import { Text, View } from "react-native";

type Row = {
  label: string;
  value: string;
};

type Props = {
  rows: Row[];
  className?: string;
};

export default function InfoBox({ rows, className = "" }: Props) {
  return (
    <View className={`border-2 border-black bg-white ${className}`}>
      {rows.map((row, index) => (
        <View
          key={row.label}
          className={`p-4 ${index < rows.length - 1 ? "border-b-2 border-black" : ""}`}
        >
          <Text className="text-neutral-500 text-xs font-black tracking-widest mb-1">
            {row.label}
          </Text>
          <Text className="text-black text-lg font-black">{row.value}</Text>
        </View>
      ))}
    </View>
  );
}
