import { auth, dbRealtime } from '@/FirebaseConfig';
import useAuth from '@/hooks/useAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignupScreen() {
  const { setUser } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [phoneOrMail, setPhoneOrMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Dropdown picker for role
  const [openRole, setOpenRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleItems, setRoleItems] = useState([
    { label: 'Trainee', value: 'trainee' },
    { label: 'Trainer', value: 'trainer' },
  ]);

  const handleSignup = async () => {
    if (!displayName || !phoneOrMail || !password || !confirmPassword || !selectedRole) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, phoneOrMail, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      // Lưu role vào Realtime Database
      await set(ref(dbRealtime, `users/${user.uid}/role`), selectedRole);

      // Set user vào context (kèm role)
      setUser({
        uid: user.uid,
        email: user.email,
        displayName,
        photoURL: user.photoURL,
        role: selectedRole,
      });

      Alert.alert('Đăng ký thành công', `Chào mừng, ${displayName}`);
      router.replace('/(home)/(tabs)');
    } catch (error) {
      Alert.alert('Đăng ký thất bại', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white px-6 pt-16">
        <Text className="text-center text-4xl font-semibold mb-10 mt-11">Đăng ký</Text>

        <Text className="mb-1 text-gray-700">Tên hiển thị</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Nguyễn Văn A"
          placeholderTextColor="gray"
          className="border border-gray-300 rounded-full px-4 h-12 mb-5 pb-1 text-base text-gray-900"
        />

        <Text className="mb-1 text-gray-700">Email hoặc SĐT</Text>
        <TextInput
          value={phoneOrMail}
          onChangeText={setPhoneOrMail}
          placeholder="example@gmail.com"
          placeholderTextColor="gray"
          className="border border-gray-300 rounded-full px-4 h-12 mb-5 pb-1 text-base text-gray-900"
          keyboardType="email-address"
        />

        <Text className="mb-1 text-gray-700">Mật khẩu</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          placeholderTextColor="gray"
          secureTextEntry
          className="border border-gray-300 rounded-full px-4 h-12 mb-5 text-base text-gray-900"
        />

        <Text className="mb-1 text-gray-700">Xác nhận mật khẩu</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="••••••••"
          placeholderTextColor="gray"
          secureTextEntry
          className="border border-gray-300 rounded-full px-4 h-12 mb-5 text-base text-gray-900"
        />

        {/* Role Picker */}
        <Text className="mb-1 text-gray-700">Vai trò</Text>
        <View style={{ zIndex: openRole ? 3000 : 1000 }}>
          <DropDownPicker
            open={openRole}
            value={selectedRole}
            items={roleItems}
            setOpen={setOpenRole}
            setValue={setSelectedRole}
            setItems={setRoleItems}
            placeholder="-- Chọn vai trò --"
            style={{
              borderRadius: 25,
              borderColor: '#ccc',
              height: 55,
              paddingHorizontal: 16,
              marginBottom: 10,
            }}
            dropDownContainerStyle={{
              borderRadius: 20,
              borderColor: '#ccc',
            }}
            placeholderStyle={{
              color: '#999',
            }}
            textStyle={{
              fontSize: 16,
            }}
            theme="LIGHT"
          />
        </View>

        <TouchableOpacity className="bg-primary rounded-full py-5 mt-5 mb-5" onPress={handleSignup}>
          <Text className="text-center text-white font-semibold text-xl">
            Đăng ký
          </Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-500 text-sm mb-5">
          Đã có tài khoản?{' '}
          <Text className="text-primary font-semibold" onPress={() => router.back()}>
            Đăng nhập
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
