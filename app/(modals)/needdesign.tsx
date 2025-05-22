import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import useAuth from '@/hooks/useAuth';
import { router } from 'expo-router';
import { usePassed } from '@/stores/usePassed';

export default function NeedDesign() {
  const { user, setUser } = useAuth();

  // Dropdown 1: Lĩnh vực/môn học giảng dạy
  const [openSubject, setOpenSubject] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [itemsSubject, setItemsSubject] = useState([
    { label: 'Cầu lông', value: 'badminton' },
    { label: 'Bóng rổ', value: 'basketball' },
    { label: 'Bóng chuyền', value: 'volleyball' },
    { label: 'Tennis', value: 'tennis' },
    { label: 'Guitar', value: 'guitar' },
    { label: 'Piano', value: 'piano' },
    { label: 'Bơi lội', value: 'bơi lội' },
  ]);

  // Dropdown 2: Hình thức giảng dạy
  const [openMethod, setOpenMethod] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [itemsMethod, setItemsMethod] = useState([
    { label: 'Offline', value: 'offline' },
    { label: 'Online', value: 'online' },
  ]);

  // Dropdown 3: Mức thù lao
  const [openFee, setOpenFee] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [itemsFee, setItemsFee] = useState([
    { label: 'Dưới 2.000.000 VND/tháng', value: 'under_2m' },
    { label: '2.000.000 - 3.999.999 VND/tháng', value: '2m_to_4m' },
    { label: '4.000.000 - 5.999.999 VND/tháng', value: '4m_to_6m' },
    { label: '6.000.000 - 7.999.999 VND/tháng', value: '6m_to_8m' },
    { label: 'Trên 8.000.000 VND/tháng', value: 'above_8m' },
  ]);

  // Dropdown 4: Mức độ kỹ năng giảng dạy
  const [openSkill, setOpenSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [itemsSkill, setItemsSkill] = useState([
    { label: 'Cơ bản', value: 'basic' },
    { label: 'Nâng cao', value: 'advanced' },
    { label: 'Chuyên nghiệp', value: 'pro' },
  ]);

  // Dropdown 5: Thời gian giảng dạy
  const [openTime, setOpenTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [itemsTime, setItemsTime] = useState([
    { label: 'Dưới 2 buổi/tuần', value: 'under_2' },
    { label: '3 buổi/tuần', value: '3_per_week' },
    { label: '3 - 5 buổi/tuần', value: '3_5_per_week' },
    { label: 'Cả tuần', value: 'full_week' },
  ]);

  const handleConfirm = () => {
    const selectedItem = itemsSubject.find(item => item.value === selectedSubject);
    const selectedLabel = selectedItem?.label;

    usePassed.getState().setPassed(true);
    usePassed.getState().setSubject(selectedLabel); // gửi label thay vì value
    router.dismiss();
  };

  return (
    <View className="flex-1 bg-white px-6 pt-10" style={{ position: 'relative' }}>
      <Text className="text-3xl font-bold mb-6 text-center">Thiết kế nhu cầu</Text>

      {/* Dropdown 1 */}
      <Text className="text-xl font-base mb-1">Lĩnh vực/môn học giảng dạy</Text>
      <View style={{ zIndex: openSubject ? 3000 : 0 }}>
        <DropDownPicker
          open={openSubject}
          value={selectedSubject}
          items={itemsSubject}
          setOpen={setOpenSubject}
          setValue={setSelectedSubject}
          setItems={setItemsSubject}
          placeholder="-- Chọn lĩnh vực --"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          placeholderStyle={styles.placeholder}
        />
      </View>

      {/* Dropdown 2 */}
      <Text className="text-xl font-base mb-1 mt-3">Hình thức giảng dạy</Text>
      <View style={{ zIndex: openMethod ? 2500 : 0 }}>
        <DropDownPicker
          open={openMethod}
          value={selectedMethod}
          items={itemsMethod}
          setOpen={setOpenMethod}
          setValue={setSelectedMethod}
          setItems={setItemsMethod}
          placeholder="-- Chọn hình thức --"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          placeholderStyle={styles.placeholder}
        />
      </View>

      {/* Dropdown 3 */}
      <Text className="text-xl font-base mb-1 mt-3">Mức thù lao</Text>
      <View style={{ zIndex: openFee ? 2000 : 0 }}>
        <DropDownPicker
          open={openFee}
          value={selectedFee}
          items={itemsFee}
          setOpen={setOpenFee}
          setValue={setSelectedFee}
          setItems={setItemsFee}
          placeholder="-- Chọn mức thù lao --"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          placeholderStyle={styles.placeholder}
        />
      </View>

      {/* Dropdown 4 */}
      <Text className="text-xl font-base mb-1 mt-3">Mức độ kỹ năng giảng dạy</Text>
      <View style={{ zIndex: openSkill ? 1500 : 0 }}>
        <DropDownPicker
          open={openSkill}
          value={selectedSkill}
          items={itemsSkill}
          setOpen={setOpenSkill}
          setValue={setSelectedSkill}
          setItems={setItemsSkill}
          placeholder="-- Chọn trình độ --"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          placeholderStyle={styles.placeholder}
        />
      </View>

      {/* Dropdown 5 */}
      <Text className="text-xl font-base mb-1 mt-3">Thời gian giảng dạy</Text>
      <View style={{ zIndex: openTime ? 1000 : 0 }}>
        <DropDownPicker
          open={openTime}
          value={selectedTime}
          items={itemsTime}
          setOpen={setOpenTime}
          setValue={setSelectedTime}
          setItems={setItemsTime}
          placeholder="-- Chọn thời gian --"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.text}
          placeholderStyle={styles.placeholder}
        />
      </View>

      <TouchableOpacity
        className="bg-primary rounded-full py-4 mt-10"
        onPress={handleConfirm}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Xác nhận
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = {
  dropdown: {
    borderRadius: 25,
    borderColor: '#ccc',
    height: 55,
    paddingHorizontal: 16,
  },
  dropdownContainer: {
    borderRadius: 20,
    borderColor: '#ccc',
  },
  placeholder: {
    color: '#999',
  },
  text: {
    fontSize: 16,
  },
};
