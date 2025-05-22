import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, router  } from 'expo-router';

const ProfileScreen = () => {
  const { card: cardStr } = useLocalSearchParams();
  const card = useMemo(() => {
    try {
      return JSON.parse(cardStr as string);
    } catch {
      return null;
    }
  }, [cardStr]);

  const [rating, setRating] = useState(0); // số sao được chọn

  const handleRating = (index) => {
    setRating(index);
    // Bạn có thể gọi API lưu rating ở đây nếu cần
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Profile Banner */}
        <View className="relative">
          <Image 
            source={require('../../assets/images/avt2.jpg')} 
            className="w-full h-32" 
            resizeMode="cover"
          />

          {/* Profile Picture */}
          <View className="absolute -bottom-12 left-4 border-2 border-white rounded-full bg-white shadow-md">
            <Image source={require('../../assets/images/avt2.jpg')} className="w-24 h-24 rounded-full" />
          </View>
        </View>

        {/* Profile Info */}
        <View className="mt-14 px-4 pb-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-gray-800">Gia Bảo</Text>
            <Ionicons name='diamond' size={18} color="#422f96" style={{ marginLeft: 8 }} />
          </View>
          <Text className="text-gray-600 text-bold mt-1">{card?.sportName} {card.role.charAt(0).toUpperCase() + card.role.slice(1)}</Text>
          <View className="mt-2">
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-sm">Foreign Trade University HCMC</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Text className="text-gray-500 text-sm">Binh Thanh District, Ho Chi Minh City</Text>
            </View>
          </View>
        </View>

        {/* Introduction Section */}
        <View className="p-4 border-b border-gray-200">
          <Text className="font-bold text-lg text-gray-800 mb-2">Giới thiệu</Text>
          <Text className="text-gray-700 leading-5">
            Tôi đang có nhu cầu tìm một huấn luyện viên cầu lông chuyên nghiệp. Mục tiêu của tôi là rèn luyện đúng kỹ
            thuật cơ bản, có thêm khả năng di chuyển, phản xạ...
          </Text>
        </View>


        {/* If is Trainee */}
        {/* Requirements Section */}
        {card?.role === 'trainee' && (
        <>
          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800 mb-2">Nhu cầu cụ thể đối với trainer</Text>
            <View className="bg-gray-50 p-3 rounded-lg">
              <Text className="text-gray-700 font-medium mb-1">Yêu cầu về kinh nghiệm:</Text>
              <View className="flex-row items-center mb-2">
                <Ionicons name='bookmark' size={13}/>
                <Text className="text-gray-700 ps-2">Có kinh nghiệm huấn luyện</Text>
              </View>

              <Text className="text-gray-700 font-medium mb-1">Phương pháp giảng dạy:</Text>
              <View className="flex-row items-center mb-2">
                <Ionicons name='bookmark' size={13}/>
                <Text className="text-gray-700 ps-2">Dễ hiểu, chi tiết</Text>
              </View>

              <Text className="text-gray-700 font-medium mb-1">Phương pháp huấn luyện mong muốn:</Text>
              <View className="flex-row items-center">
                <Ionicons name='bookmark' size={13}/>
                <Text className="text-gray-700 ps-2">Tập trung vào kỹ thuật cơ bản</Text>
              </View>
            </View>
          </View>

          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800 mb-2">Ngân sách dự kiến</Text>
            <Text className="text-gray-700 leading-5">
            Mức học phí mong muốn theo buổi/tuần/tháng.
            </Text>
            <Text className="text-gray-700 leading-5">
            Hình thức thanh toán (theo buổi, theo gói...).
            </Text>
          </View>
        </>
        )}

        {/* If is Trainer */}
        {/* Availability Section */}
        {card?.role === 'trainer' && (
        <>
          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800 mb-2">Nổi bật</Text>
            <View>
              <Text className="text-gray-700 leading-5 font-bold">
                Hội thao Cơ sở II Trường Đại học Ngoại thương - FTUGames | Môn Cầu lông 
              </Text>
              <Text className="text-gray-700 leading-5 font-light italic">
                Huy chương Vàng đôi nam
              </Text>
            </View>
            <View>
              <Text className="text-gray-700 leading-5 font-bold">
                Giải cầu lông trẻ tỉnh Quảng Nam 2019 | Môn Cầu lông 
              </Text>
              <Text className="text-gray-700 leading-5 font-light italic">
                Huy chương Vàng đơn nam
              </Text>
            </View>
          </View>

          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800 mb-2">Đánh giá</Text>
            <View className="flex-row items-center justify-evenly">
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => handleRating(i)} className="mr-1">
                  <FontAwesome 
                    name={i <= rating ? 'star' : 'star-o'}
                    size={30}
                    color={i <= rating ? '#facc15' : '#d1d5db'} // vàng nếu được chọn, xám nếu chưa
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="p-4 border-b border-gray-200">
            <Text className="font-bold text-lg text-gray-800 mb-2">Nội dung đào tạo</Text>
            <View>
              <Text className="text-gray-700 leading-5 font-bold">
                Kỹ năng cơ bản
              </Text>
              <Text className="text-gray-700 leading-5 font-light italic">
                Kỹ năng cầm vợt; Tư thế chuẩn bị & di chuyển; Kỹ thuật đánh cầu cơ bản;...
              </Text>
            </View>
            <View>
              <Text className="text-gray-700 leading-5 font-bold">
                Kỹ năng nâng cao
              </Text>
              <Text className="text-gray-700 leading-5 font-light italic">
                Chiến thuật cơ bản trong thi đấu; Tâm lý thi đấu & dinh dưỡng thể thao;...
              </Text>
            </View>
          </View>

          {/* Contact Button */}
          <View className="p-4 mb-6">
            <TouchableOpacity>
              <View className="bg-emerald-600 py-3 rounded-lg items-center">
                <Text className="text-white font-bold">Liên hệ ngay</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen