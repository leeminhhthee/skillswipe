import { Stack } from "expo-router";
import "../global.css"
import { AuthProvider } from "@/hooks/useAuth";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar 
        translucent={true} 
        backgroundColor="transparent" 
        barStyle="dark-content" 
        hidden={false} 
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modals)"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
