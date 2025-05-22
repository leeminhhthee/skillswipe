import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Post from '../../components/Post'
import { router } from 'expo-router'
import { usePostStore } from '@/stores/postStore'

const CommunityScreen = () => {
  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} giây trước`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} phút trước`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} giờ trước`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ngày trước`;
    const weeks = Math.floor(days / 7);
    return `${weeks} tuần trước`;
  }

  const posts = usePostStore((state) => state.posts)
  const sortedPosts = [...posts].sort((a, b) => b.createdAt - a.createdAt)

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row items-center justify-center px-4 py-2 border-b border-gray-200 pt-4">
        <View className="flex-1 flex-row items-center justify-center bg-gray-100 rounded-full px-5 py-1.5 border h-14">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="bg-transparent text-md flex-1 ps-3"
            placeholder="Search"
            placeholderTextColor="#808080"
            returnKeyType="done"
          />
          <TouchableOpacity>
            <Ionicons name="filter" size={20} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post Content */}
      <FlatList
        data={sortedPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Post
            authorName={item.authorName}
            authorRole={item.authorRole}
            authorAvatar={item.authorAvatar}
            timeAgo={getTimeAgo(item.createdAt)}
            caption={item.caption}
            postMedia={item.postMedia}
            mediaType={item.mediaType}
            initialLikes={item.initialLikes}
            initialIsLiked={item.initialIsLiked}
          />

        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Nút tạo bài viết */}
      <TouchableOpacity
        onPress={() => router.push('/(modals)/newpost')}
        className="absolute bottom-5 right-5 bg-blue-500 p-4 rounded-full shadow-lg"
      >
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CommunityScreen
