import useAuth from '@/hooks/useAuth';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, Pressable, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/FirebaseConfig';

export default function LoginScreen() {
  const { setUser } = useAuth();
    
  const [phoneOrMail, setPhoneOrMail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ User logged in:', user.email);
        setUser(user); // Cập nhật vào context
      } else {
        console.log('🚫 User logged out or not authenticated');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    if (!phoneOrMail || !password) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, phoneOrMail, password);
      const user = userCredential.user;
      Alert.alert('Đăng nhập thành công', `Chào, ${user.email}`);
      setUser(user);
    } catch (error) {
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  const handleGoogleLogin = async () => {
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white px-6 pt-20">
        <Text className="text-center text-4xl font-semibold mb-10 mt-11">Đăng nhập</Text>

        <Text className="mb-1 text-gray-700">Phone/Mail</Text>
        <TextInput
          value={phoneOrMail}
          onChangeText={setPhoneOrMail}
          placeholder="(+84) 32 650 3456"
          placeholderTextColor="gray"
          className="border border-gray-300 rounded-full px-4 h-12 mb-5 pb-1 text-base text-gray-900"
          keyboardType="email-address"
        />

        <Text className="mb-1 text-gray-700">Password</Text>
        <View className="flex-row items-center border border-gray-300 rounded-full px-4 py-3 mb-3">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="gray"
            secureTextEntry
            className="flex-1 text-base text-gray-900"
          />
          <Pressable>
            <Text className="text-sm text-gray-500">Quên mật khẩu</Text>
          </Pressable>
        </View>

        <TouchableOpacity className="bg-pink-600 rounded-full py-5 mt-10 mb-5" onPress={handleLogin}>
          <Text className="text-center text-white font-semibold text-xl">
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 text-sm mb-5">
          Bạn chưa có tài khoản?{' '}
          <Text className="text-pink-600 font-semibold">Đăng ký</Text>
        </Text>

        <View className="flex-row items-center mb-5 mt-16">
          <View className="flex-1 border-b border-gray-300" />
          <Text className="mx-3 text-gray-400">Hoặc đăng nhập</Text>
          <View className="flex-1 border-b border-gray-300" />
        </View>

        <View className="flex-row justify-center gap-x-8 mt-4">
          <TouchableOpacity className="border border-gray-400 rounded-full w-14 h-14 items-center justify-center">
            <FontAwesome name="facebook" size={28} color="#1877F2" />
          </TouchableOpacity>

          <TouchableOpacity className="border border-gray-400 rounded-full w-14 h-14 items-center justify-center"
            onPress={handleGoogleLogin}
          >
            <AntDesign name="google" size={28} color="#DB4437" />
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}
