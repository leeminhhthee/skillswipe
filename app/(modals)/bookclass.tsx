import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker'

const BookClassScreen = () => {
  const { name } = useLocalSearchParams();

  const [classTypeOpen, setClassTypeOpen] = useState(false);
  const [classTypeValue, setClassTypeValue] = useState(null);
  const [classTypeItems, setClassTypeItems] = useState([
    { label: '1 kèm 1', value: '1on1' },
    { label: 'Nhóm nhỏ', value: 'group' },
    { label: 'Online', value: 'online' },
  ]);

  const [packageOpen, setPackageOpen] = useState(false);
  const [packageValue, setPackageValue] = useState(null);
  const [packageItems, setPackageItems] = useState([
    { label: 'Cơ bản', value: 'basic' },
    { label: 'Nâng cao', value: 'advanced' },
    { label: 'Chuyên sâu', value: 'premium' },
  ]);

  // Ensure only one dropdown is open at a time
  const onClassOpen = () => {
    setPackageOpen(false);
  };

  const onPackageOpen = () => {
    setClassTypeOpen(false);
  };

  return (
    <View className="px-6 pt-6 flex-1 bg-white">
      {/* Avatar + Info */}
      <View className="items-center">
        <Image source={require('../../assets/images/avt.png')} className="w-24 h-24 rounded-full border-2 border-primary" />
        <Text className="mt-4 text-lg font-semibold text-gray-900">{name}</Text>
        <Text className="text-sm text-gray-500">Badminton Trainer</Text>
      </View>

      {/* Form */}
      <View className="mt-6 z-50">
        <Text className="mb-1 text-sm text-gray-700">Chọn loại hình lớp học:</Text>
        <DropDownPicker
          open={classTypeOpen}
          value={classTypeValue}
          items={classTypeItems}
          setOpen={setClassTypeOpen}
          setValue={setClassTypeValue}
          setItems={setClassTypeItems}
          onOpen={onClassOpen}
          placeholder="Chọn lớp học"
          style={{
            borderRadius: 20,
            borderColor: '#d1d5db',
            zIndex: 50,
          }}
          dropDownContainerStyle={{
            borderColor: '#d1d5db',
            borderRadius: 12,
            zIndex: 50,
          }}
        />
      </View>

      <View className="mt-4 z-40">
        <Text className="mb-1 text-sm text-gray-700">Chọn gói chi phí:</Text>
        <DropDownPicker
          open={packageOpen}
          value={packageValue}
          items={packageItems}
          setOpen={setPackageOpen}
          setValue={setPackageValue}
          setItems={setPackageItems}
          onOpen={onPackageOpen}
          placeholder="Chọn gói chi phí"
          style={{
            borderRadius: 20,
            borderColor: '#d1d5db',
            zIndex: 40,
          }}
          dropDownContainerStyle={{
            borderColor: '#d1d5db',
            borderRadius: 12,
            zIndex: 40,
          }}
        />
      </View>

      {/* Submit button (zIndex thấp hơn dropdowns) */}
      <View className="mt-6 z-10">
        <Pressable
          className="bg-primary py-3 rounded-full items-center"
          onPress={() => {
            router.back()
          }}
        >
          <Text className="text-white font-semibold text-base">Gửi yêu cầu</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default BookClassScreen