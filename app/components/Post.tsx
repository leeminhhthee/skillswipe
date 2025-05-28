import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

type PostProps = {
  authorName: string;
  authorRole: string;
  authorAvatar: ImageSourcePropType;
  timeAgo: string;
  caption: string;
  postMedia?: string | ImageSourcePropType;
  mediaType?: 'image' | 'video';
  initialLikes?: number;
  initialIsLiked?: boolean;
  onLikePress?: (liked: boolean) => void;
};

export default function Post({
  authorName,
  authorRole,
  authorAvatar,
  timeAgo,
  caption,
  postMedia,
  mediaType,
  initialLikes = 0,
  initialIsLiked = false,
  onLikePress,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikes);

  const toggleLike = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setLikeCount(likeCount + (newLikeState ? 1 : -1));
    if (onLikePress) onLikePress(newLikeState);
  };

  return (
    <View className="flex-1 overflow-auto border-b border-gray-200">
      {/* Header */}
      <View className="flex-row items-center gap-2 p-3">
        <View className="w-10 h-10 rounded-full overflow-hidden">
          <Image 
            source={
              authorAvatar
                ? { uri: authorAvatar }
                : require('../../assets/images/avt_placeholder.png')
            } 
            style={{ width: 40, height: 40 }} />
        </View>
        <View className="flex-1">
          <Text className="text-sm font-medium">{authorName}</Text>
          <Text className="text-xs text-gray-500">{authorRole}</Text>
        </View>
        <Text className="text-xs text-gray-500">{timeAgo}</Text>
      </View>

      {/* Media */}
      {postMedia && mediaType === 'image' && (
        <Image
          source={typeof postMedia === 'string' ? { uri: postMedia } : postMedia}
          style={{ width: '100%', height: undefined, aspectRatio: 4 / 4 }}
          resizeMode="cover"
        />
      )}

      {postMedia && mediaType === 'video' && typeof postMedia === 'string' && (
        <Video
          source={{ uri: postMedia }}
          useNativeControls
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          style={{ width: '100%', height: 350 }}
        />
      )}

      {/* Actions */}
      <View className="p-3">
        <View className="flex-row items-center gap-4 mb-2">
          <TouchableOpacity onPress={toggleLike} className="flex-row items-center gap-1">
            <Ionicons name="heart" size={24} color={isLiked ? '#EF4444' : 'gray'} />
            <Text className="text-sm">{likeCount}</Text>
          </TouchableOpacity>
          <View className="flex-row items-center gap-1">
            <Ionicons name="chatbubble" size={24} color="gray" />
            <Text className="text-sm">0</Text>
          </View>
          <Ionicons name="share" size={24} color="gray" />
        </View>
        <Text className="text-sm font-bold text-amber-600">{caption}</Text>
      </View>
    </View>
  );
}
