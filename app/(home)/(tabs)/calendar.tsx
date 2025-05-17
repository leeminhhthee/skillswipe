import { View, Text, Image, Alert, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const CalendarScreen = () => {

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

  const matchedUsers = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" },
    { id: 4, name: "Phạm Thị D" },
    { id: 5, name: "Hoàng Văn E" },
    { id: 6, name: "Đặng Thị F" },
    { id: 7, name: "Bùi Văn G" },
    { id: 8, name: "Võ Thị H" },
  ];

  // Xử lý khi nhấn vào avatar
  const handleAvatarPress = (user) => {
    Alert.alert(
      "Chọn hành động",
      `Bạn muốn làm gì với ${user.name}?`,
      [
        { text: "Đăng ký lớp học", onPress: () => router.push({ pathname: '/(modals)/bookclass', params: { name: user.name }}) },
        { text: "Nhắn tin", onPress: () => router.push({ pathname: '/(home)/chat', params: { id: user.id}}) },
        { text: "Huỷ kết nối", style: "destructive", onPress: () => console.log("Huỷ kết nối") },
        { text: "Đóng", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-white mt-4">
      {/* Danh sách người đã match */}
      <View className="py-3 border-b border-gray-200 px-2">
        <View className="flex-row flex-wrap -mx-2">
          {matchedUsers.map((user) => (
            <View key={user.id} className="w-1/4 px-2 mb-4 items-center">
              <Pressable onPress={() => handleAvatarPress(user)} className="relative">
                <Image
                  source={require('../../../assets/images/avt.png')}
                  className="w-14 h-14 rounded-full"
                />
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      {/* Weekly Calendar */}
      <View className="flex-1 px-4 pt-4">
        <Text className="text-lg font-bold mb-3">Lịch học trong tuần</Text>

        {/* Days of Week */}
        <View className="flex-row">
          {daysOfWeek.map((day) => (
            <View key={day} className="flex-1 items-center">
              <View className="bg-pink-600 rounded-md py-1 px-1 w-11">
                <Text className="text-white text-xs font-medium text-center">{day}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View className="flex-1 mt-1">
          {/* Calendar rows */}
          {[...Array(5)].map((_, rowIndex) => (
            <View key={rowIndex} className="flex-row h-16 border-t border-gray-100">
              {daysOfWeek.map((day, colIndex) => (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  className="flex-1 border-r border-gray-100 items-center justify-center"
                  style={{ borderRightWidth: colIndex === 6 ? 0 : 1 }}
                >
                  {/* Empty cell or event would go here */}
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default CalendarScreen