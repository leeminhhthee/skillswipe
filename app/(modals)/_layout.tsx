import { Stack } from 'expo-router';

export default function ModalLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal', // 👈 hiện như modal từ dưới lên
        headerShown: false,    // tắt header mặc định
        animation: 'slide_from_bottom',
      }}
    />
  );
}
