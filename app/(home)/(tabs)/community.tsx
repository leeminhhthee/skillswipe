import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Post from '../../components/Post';

const CommunityScreen = () => {
  const posts = [
    {
      id: 1,
      authorName: "Nguyễn Phước Gia Bảo",
      authorRole: "Badminton",
      authorAvatar: require('../../../assets/images/avt.png'), // ảnh local
      timeAgo: "3 giờ trước",
      caption: "Nguyễn Phước Gia Bảo champion 🏆",
      postImage: require('../../../assets/images/npgb.jpg'),
      initialLikes: 10,
      initialIsLiked: false,
    },
    {
      id: 2,
      authorName: "Lê Minh Thế",
      authorRole: "Volleyball",
      authorAvatar: require('../../../assets/images/avt2.jpg'),
      timeAgo: "1 ngày trước",
      caption: "Hahaa champion 🏆",
      postImage: require('../../../assets/images/avt2.jpg'),
      initialLikes: 5,
      initialIsLiked: true,
    },
  ];

  return (
      <SafeAreaView className="flex-1">
        <View className="flex flex-row items-center justify-center px-4 py-2 border-b border-gray-200 pt-4">
          <View className="flex-1 flex-row items-center justify-center bg-gray-100 rounded-full px-5 py-1.5 border h-14">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
              className="bg-transparent text-md flex-1 ps-3"
              placeholder="Search"
              returnKeyType="done"
            />
            <TouchableOpacity>
              <Ionicons name="filter" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Post Content */}
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Post
              authorName={item.authorName}
              authorRole={item.authorRole}
              authorAvatar={item.authorAvatar}
              timeAgo={item.timeAgo}
              caption={item.caption}
              postImage={item.postImage}
              initialLikes={item.initialLikes}
              initialIsLiked={item.initialIsLiked}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }} // tùy chọn
        />
      </SafeAreaView>
  )
}

export default CommunityScreen
