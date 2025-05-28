import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  FlatList,
  Text,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Post from '../../components/Post'
import { router } from 'expo-router'
import { ref,  onValue, get, ref as refDb } from 'firebase/database';
import { dbRealtime } from '../../../FirebaseConfig'

type Post = {
  id: string,
  authorName: string,
  authorRole: string,
  authorAvatar: string | null,
  caption: string,
  postMedia?: string,
  mediaType?: 'image' | 'video',
  createdAt: number,
  initialLikes: number,
  initialIsLiked: boolean,
}

type User = {
  name: string,
  role: string,
  photoUrl: string | null,
}

const CommunityScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});

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
  
  useEffect(() => {
    // Listen to all users' info
    const usersRef = ref(dbRealtime, 'users');
    const unsubscribeUsers = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(data);
      }
    });

    // Listen to all posts
    const postsRef = ref(dbRealtime, 'postsByUser');
    const unsubscribePosts = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setPosts([]);
        return;
      }

      const allPosts: Post[] = [];

      Object.entries(data).forEach(([uid, userPosts]) => {
        if (userPosts && typeof userPosts === 'object') {
          Object.entries(userPosts).forEach(([postId, post]: any) => {
            const userData = users[uid] || {};
            const avatarUrl = userData?.photoUrl || null;
            allPosts.push({
              id: postId,
              authorName: post.authorName,
              authorRole: post.authorRole,
              authorAvatar: avatarUrl,
              caption: post.caption,
              postMedia: post.postMedia,
              mediaType: post.mediaType,
              createdAt: post.createdAt,
              initialLikes: post.initialLikes,
              initialIsLiked: post.initialIsLiked,
            });
          });
        }
      });

      // Sort posts by createdAt descending
      allPosts.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(allPosts);
    });

    return () => {
      unsubscribeUsers();
      unsubscribePosts();
    };
  }, [users]);

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

      {posts.length === 0 ? (
          <View className="flex-1 justify-center items-center">
            <Ionicons name="chatbubble-ellipses-outline" size={64} color="#A0A0A0" />
            <Text className="text-gray-500 text-lg mt-4">Không có bài viết nào</Text>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
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
      )}

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
