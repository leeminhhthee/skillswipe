import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal', // 👈 hiện như modal từ dưới lên
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
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: 'bold', // 👈 in đậm
          fontSize: 18,
          color: '#111827',
        },
        headerTitleContainerStyle: {
          paddingTop: 12,     // 👈 đẩy nội dung header xuống
      },
        animation: 'slide_from_bottom',
      }}
    >
      <Stack.Screen name="bookclass" options={{
        title: "Đăng ký lớp học",
        }}/>
      <Stack.Screen name="myprofile" options={{
        title: "Hồ sơ của tôi",
        }}/>
      <Stack.Screen name="needdesign" options={{
        title: "",
        }}/>
      <Stack.Screen name="profile" options={{
        title: "Profile",
        }}/>
      <Stack.Screen name="newpost" options={{
        title: "Tạo bài viết",
      }}/>
    </Stack>
  );
}
