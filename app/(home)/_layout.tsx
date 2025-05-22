import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{
        title: "Nhắn tin",
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#e53162" />
            <Text className="ml-2 text-primary font-semibold">Quay lại</Text>
          </TouchableOpacity>
        ),
      }}
      />
      <Stack.Screen name="account" options={{
        title: "Cài đặt",
        headerTitleAlign: "center",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#e53162" />
            <Text className="ml-2 text-primary font-semibold">Quay lại</Text>
          </TouchableOpacity>
        ),
      }}
      />
    </Stack>
  );
}
