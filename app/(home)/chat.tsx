import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View, Image, ActivityIndicator } from "react-native";
import { ref, onValue } from "firebase/database";
import { dbRealtime } from "../../FirebaseConfig"; // thay đường dẫn phù hợp
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";

export default function chat() {
  const { user } = useAuth();

  const [matchedUsers, setMatchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const chatsRef = ref(dbRealtime, "chats");

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setMatchedUsers([]);
        setIsLoading(false);
        return;
      }

      // Lọc chat rooms user hiện tại tham gia
      const matched = [];

      Object.entries(data).forEach(([chatId, chat]) => {
        if (chat.users && chat.users[user.uid]) {
          // Tìm uid của đối phương trong chat
          const otherUid = Object.keys(chat.users).find(uid => uid !== user.uid);
          if (otherUid) {
            matched.push({ chatId, otherUid, chat });
          }
        }
      });

      // Lấy thêm info của user đối phương
      const fetchUsersInfo = async () => {
        const usersPromises = matched.map(async ({ otherUid, chatId, chat }) => {
          const userRef = ref(dbRealtime, `users/${otherUid}`);
          return new Promise((resolve) => {
            onValue(userRef, (snap) => {
              const userInfo = snap.val();
              resolve({ chatId, otherUid, userInfo, chat });
            }, { onlyOnce: true });
          });
        });

        const usersInfo = await Promise.all(usersPromises);
        setMatchedUsers(usersInfo);
        setIsLoading(false);
      };

      fetchUsersInfo();
    });

    return () => unsubscribe();

  }, [user?.uid]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4DED30" />
        <Text>Đang tải danh sách bạn bè...</Text>
      </View>
    );
  }

  if (matchedUsers.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Chưa có kết bạn nào</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const { userInfo } = item;
    return (
      <TouchableOpacity
        className="flex-row items-center p-4 border-b border-gray-300"
      >
        <Image
          source={userInfo?.photoUrl ? { uri: userInfo.photoUrl } : require("../../assets/images/avt_placeholder_2.png")}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          <Text className="text-lg font-semibold">{userInfo?.username || "Người dùng"}</Text>
          {/* Bạn có thể thêm phần hiển thị tin nhắn cuối nếu muốn */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={matchedUsers}
        keyExtractor={(item) => item.chatId}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
