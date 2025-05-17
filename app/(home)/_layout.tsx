import { Ionicons } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="chat" options={{
        title: "Nhắn tin",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            className="flex-row items-center -ml-5"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#FF5864" />
            <Text className="ml-2 text-[#FF5864] font-semibold">Quay lại</Text>
          </TouchableOpacity>
        ),
      }}
      />
    </Stack>
  );
}
