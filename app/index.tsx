import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

const SplashScreen = () => {
  const router = useRouter();
  useEffect(() => {
  const timer = setTimeout(() => {
    router.replace('/(auth)/login')
  }, 3000); // 3000ms = 3 giây

  return () => clearTimeout(timer); // Cleanup nếu unmount sớm
  }, []);

  return (
  <View className="flex-1 bg-white items-center justify-center">
      <Image
          source={require("../assets/images/logo_stroke.png")} // Đảm bảo bạn đã đặt đúng logo
          className="w-45 h-40 mb-6"
          resizeMode="contain"
      />

      <Text className="text-gray-500 text-2xl">Chào mừng đến với</Text>

      <Text className="text-black font-bold italic text-5xl mt-5">
          SkillSwipe
      </Text>
  </View>
  )
}

export default SplashScreen