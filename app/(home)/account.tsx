import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Entypo, Feather, MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import useAuth from '@/hooks/useAuth';
import { auth } from '@/FirebaseConfig';
import { signOut } from '@firebase/auth';
import { useRouter } from 'expo-router';

export default function AccountMenu() {
  const { user, setUser } = useAuth(); 

  const router = useRouter();

  const menuItems = [
    { icon: <FontAwesome name="user" size={26} color="#e53162" />, label: 'Hồ sơ cá nhân', onPress: () => router.push('/(modals)/myprofile'), },
    { icon: <FontAwesome name="cog" size={26} color="#e53162" />, label: 'Cài đặt và Quyền riêng tư' },
    { icon: <MaterialIcons name="history" size={26} color="#e53162" />, label: 'Lịch sử quản lý khóa học' },
    { icon: <FontAwesome name="credit-card" size={26} color="#e53162" />, label: 'Phương thức thanh toán' },
    { icon: <Feather name="star" size={26} color="#e53162" />, label: 'Đánh giá và phản hồi' },
    { icon: <Ionicons name="help-circle-outline" size={26} color="#e53162" />, label: 'Trung tâm Hỗ trợ' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="bg-white p-5">
        {/* Header */}
        <View className="flex-row items-center mb-4">
          <Image
            className="h-16 w-16 rounded-full mr-4"
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require('../../assets/images/avt_placeholder.png')
            }
          />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">{user?.displayName ? user?.displayName : "Gia Bao"}</Text>
            <Text className="text-sm text-primary">Xem trang cá nhân</Text>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={20} color="#E91E63" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center justify-between py-3 border-b border-gray-200 m-3"
            onPress={item.onPress}
          >
            <View className="flex-row items-center space-x-4">
              {item.icon}
              <Text className="text-lg text-gray-900 ms-3">{item.label}</Text>
            </View>
            <Entypo name="chevron-right" size={24} color="gray" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View className="absolute bottom-8 left-5 right-5">
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center bg-gray-100 py-4 rounded-full"
        >
          <AntDesign name="logout" size={22} color="#e53162" />
          <Text className="ml-2 text-lg font-semibold text-primary">Đăng xuất</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
