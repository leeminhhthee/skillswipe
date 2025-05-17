import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import {  Ionicons } from '@expo/vector-icons';

type PostProps = {
  authorName: string;
  authorRole: string;
  authorAvatar: ImageSourcePropType;
  timeAgo: string;
  caption: string;
  postImage?: ImageSourcePropType;
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
  postImage,
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
    <View className="flex-1 overflow-auto">
        <View className="border-b border-gray-200">
            {/* Post Header */}
            <View className="flex-row items-center gap-2 p-3">
                <View className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                    source={authorAvatar}
                    style={{ width: 40, height: 40 }}
                    className="object-cover"
                    />
                </View>
                <View className="flex-1">
                    <View className="flex-row items-center gap-1">
                        <Text className="text-sm font-medium">{authorName}</Text>
                    </View>
                    <Text className="text-xs text-gray-500">{authorRole}</Text>
                </View>
                <Text className="text-xs text-gray-500">{timeAgo}</Text>
            </View>

            {/* Post Image */}
            <View className="w-full aspect-[3/4] bg-gray-100 relative">
                <Image
                    source={postImage}
                    style={{ width: '100%', height: undefined, aspectRatio: 3 / 4 }}
                    className="object-cover"
                />
            </View>

            {/* Post Actions */}
            <View className="p-3">
                <View className="flex-row items-center gap-4 mb-2">
                    <TouchableOpacity
                    className="flex-row items-center gap-1"
                    onPress={toggleLike}
                    accessibilityLabel={isLiked ? "Bỏ yêu thích" : "Yêu thích"}
                    >
                        <Ionicons
                            name="heart"
                            size={24}
                            color={isLiked ? "#EF4444" : "gray"}
                        />
                        <Text className="text-sm">{likeCount}</Text>
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="chatbubble" size={24} color="gray" />
                        <Text className="text-sm">35</Text>
                    </View>
                    <Ionicons name="share" size={24} color="gray" />
                </View>
                <View className="flex-row items-center gap-2">
                    <Text className="text-sm font-bold text-amber-600">{caption}</Text>
                </View>
            </View>
        </View>
    </View>

  );
}
