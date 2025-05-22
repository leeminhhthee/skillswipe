import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { usePostStore } from '@/stores/postStore';
import useAuth from '@/hooks/useAuth';
import { Video } from 'expo-av';

const NewPost = () => {
  const addPost = usePostStore((state) => state.addPost);
  const router = useRouter();
  const { user } = useAuth();

  const [caption, setCaption] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Bóng đá', 'Bóng chuyền', 'Cầu lông'];

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const pickMedia = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setSelectedMedia(asset.uri);
      setMediaType(asset.type as 'image' | 'video');
    }
  };

  const handlePost = () => {
    if (!caption.trim() || !selectedCategory) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung và chọn lĩnh vực.');
      return;
    }

    const newPost = {
      id: Date.now(),
      authorName: user?.displayName || user?.email || 'Người dùng mới',
      authorRole: selectedCategory,
      authorAvatar: user?.photoURL
        ? { uri: user.photoURL }
        : require('../../assets/images/avt_placeholder.png'),
      caption,
      postMedia: selectedMedia,
      mediaType,
      createdAt: Date.now(),
      initialLikes: 0,
      initialIsLiked: false,
    };

    addPost(newPost);
    Alert.alert('Đã đăng bài!', 'Bài viết của bạn đã được tạo.');
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold">Tạo bài viết</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <TextInput
        className="text-base border border-gray-300 rounded-md p-3 mb-4"
        placeholder="Bạn đang nghĩ gì?"
        placeholderTextColor="gray"
        multiline
        value={caption}
        onChangeText={setCaption}
      />

      {/* Media preview */}
      {selectedMedia ? (
        <View className="relative mb-4">
          {mediaType === 'image' ? (
            <Image
              source={{ uri: selectedMedia }}
              className="w-full h-60 rounded-lg"
              resizeMode="cover"
            />
          ) : (
            <Video
              source={{ uri: selectedMedia }}
              useNativeControls
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ width: '100%', height: 240, borderRadius: 8 }}
            />
          )}
          <TouchableOpacity
            className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
            onPress={() => {
              setSelectedMedia(null);
              setMediaType(null);
            }}
          >
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickMedia}
          className="border border-dashed border-gray-400 rounded-lg h-40 justify-center items-center mb-4"
        >
          <Ionicons name="image-outline" size={30} color="gray" />
          <Text className="text-gray-500 mt-2">Chọn ảnh hoặc video</Text>
        </TouchableOpacity>
      )}

      {/* Categories */}
      <Text className="text-base font-semibold mb-2">Chọn lĩnh vực:</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? 'bg-blue-500 border-blue-500'
                : 'bg-white border-gray-300'
            }`}
          >
            <Text
              className={`${
                selectedCategory === cat ? 'text-white' : 'text-gray-700'
              }`}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit button */}
      <TouchableOpacity
        className="bg-blue-500 py-3 rounded-lg items-center"
        onPress={handlePost}
      >
        <Text className="text-white text-base font-semibold">Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewPost;
