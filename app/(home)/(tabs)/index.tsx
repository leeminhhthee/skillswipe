/* eslint-disable no-unused-expressions */
import useAuth from "@/hooks/useAuth";
import { usePassed } from "@/stores/usePassed";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import LottieView from "lottie-react-native";
import { dbRealtime } from '../../../FirebaseConfig';
import { ref, get, update } from 'firebase/database';

export default function HomeScreen() {
  const { user } = useAuth()
  const swipeRef = useRef(null)

  const passed = usePassed((state) => state.passed);
  const selectedSubject = usePassed((state) => state.subject);
  const setPassed = usePassed((state) => state.setPassed);

  const [allUsers, setAllUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const [isAllSwiped, setIsAllSwiped] = useState(false);
  const [userLikes, setUserLikes] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = ref(dbRealtime, 'users/');
        const snapshot = await get(usersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert object to array và lọc bỏ user hiện tại (user?.uid)
          const userList = Object.keys(data)
            .filter(uid => uid !== user?.uid)    // Bỏ qua chính mình
            .map((uid) => ({
              uid,
              ...data[uid],
            }));

          setAllUsers(userList);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchUsers();
  }, [user?.uid]); 

  const filterUnmatchedUsers = async () => {
    try {
      const currentUserRef = ref(dbRealtime, `users/${user?.uid}/liked`);
      const currentSnap = await get(currentUserRef);
      const currentUserLikes = currentSnap.exists() ? currentSnap.val() : [];

      const unmatched = [];

      for (const otherUser of allUsers) {
        // 🔥 Lọc theo môn học:
        if (selectedSubject && otherUser.sportTrainer !== selectedSubject) {
          continue; // Bỏ qua user không cùng môn
        }

        const otherUserRef = ref(dbRealtime, `users/${otherUser.uid}/liked`);
        const otherSnap = await get(otherUserRef);
        const otherUserLikes = otherSnap.exists() ? otherSnap.val() : [];

        const currentLikesOther = currentUserLikes.includes(otherUser.uid);
        const otherLikesCurrent = otherUserLikes.includes(user?.uid);

        if (!(currentLikesOther && otherLikesCurrent)) {
          unmatched.push(otherUser);
        }
      }

      setFilteredData(unmatched);
      setIsAllSwiped(unmatched.length === 0);
    } catch (error) {
      console.error("Error filtering unmatched users:", error);
    }
  };

  useEffect(() => {
    if (user?.uid && allUsers.length > 0) {
      filterUnmatchedUsers();
    }
  }, [allUsers, selectedSubject]);

  useEffect(() => {
    if (passed) {
      // Chờ 2.5s sau khi passed mới hiển thị card
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [passed])

  console.log(passed)

  const handleRetry = () => {
    setPassed(false);
    setCardIndex(0);
    setIsAllSwiped(false);
    swipeRef.current?.jumpToCardIndex(0);

    // Gọi lại filter trực tiếp
    filterUnmatchedUsers();

    router.push("/(modals)/needdesign");
  }

  const sportMap = {
    badminton: 'Cầu lông',
    basketball: 'Bóng rổ',
    volleyball: 'Bóng chuyền',
    tennis: 'Tennis',
    guitar: 'Guitar',
    piano: 'Piano',
    swim: 'Bơi lội',
  }


  return (
    <SafeAreaView className="flex-1">
       {!passed ? (
        // Giao diện ban đầu: Spiral + Tap
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            onPress={() => router.push("/(modals)/needdesign")}
            className="items-center"
          >
            <LottieView
              source={require("../../../assets/lotties/spiral.json")}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text className="text-lg mt-4 font-semibold text-black">Tap để bắt đầu</Text>
          </TouchableOpacity>
        </View>
      ) : isLoading ? (
        // Hiệu ứng loading
        <View className="flex-1 justify-center items-center">
          <LottieView
            source={require("../../../assets/lotties/loading.json")} 
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text className="text-black mt-4 text-lg font-semibold">Đang tải...</Text>
        </View>
      ) : (
        <>
        {!isAllSwiped && (
          <View className="flex flex-row justify-evenly mt-3">
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-white"
              onPress={() => console.log("lac")}
            >
              <AntDesign name="shake" size={24} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
              onPress={() => swipeRef.current?.swipeLeft()}
            >
              <Entypo name="cross" size={24} color="red"/>
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
              onPress={() => swipeRef.current?.swipeRight()}
            >
              <AntDesign name="heart" size={24} color="green" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center justify-center rounded-full w-16 h-16 bg-white border-yellow-300 border"
              onPress={handleRetry}
            >
              <AntDesign name="reload1" size={24} color="#e6c619" />
            </TouchableOpacity>
          </View>
          )}

          {/*Card*/}
          <View className="flex-1 -mt-14">
            {!isAllSwiped ? (
            <Swiper
              ref={swipeRef}
              cardIndex={0}
              stackSize={3}
              stackSeparation={0}
              backgroundColor="transparent"
              verticalSwipe={false}
              onSwiped={(index) => {
                setCardIndex(index + 1);
                if (index + 1 >= filteredData.length) {
                  setIsAllSwiped(true);
                }
              }}
              onSwipedAll={() => setIsAllSwiped(true)}
              onSwipedLeft={(index) => {
                const currentCard = filteredData[index];
                if (!currentCard) return;
                setUserLikes((prev) => ({ ...prev, [currentCard.uid]: false }));
                console.log("👎 Nope", currentCard.username);
              }}
              onSwipedRight={async (index) => {
                const currentCard = filteredData[index];
                if (!currentCard) return;
                if (!user?.uid) return console.warn("User chưa đăng nhập");

                const userAUid = user.uid;
                const userBUid = currentCard.uid;

                try {
                  const userARef = ref(dbRealtime, `users/${userAUid}/liked`);
                  const userBRef = ref(dbRealtime, `users/${userBUid}/liked`);

                  // Lấy mảng liked của 2 user
                  const [snapA, snapB] = await Promise.all([get(userARef), get(userBRef)]);
                  let likedA = snapA.exists() ? snapA.val() : [];
                  let likedB = snapB.exists() ? snapB.val() : [];

                  if (!Array.isArray(likedA)) likedA = [];
                  if (!Array.isArray(likedB)) likedB = [];

                  // Thêm user B vào mảng liked của user A nếu chưa có
                  if (!likedA.includes(userBUid)) {
                    likedA.push(userBUid);
                    await update(ref(dbRealtime, `users/${userAUid}`), { liked: likedA });
                  }

                  // Kiểm tra match: user A liked B và user B liked A
                  const isMatched = likedB.includes(userAUid);

                  if (isMatched) {
                    console.log("💖 MATCHED WITH", currentCard.username);

                    // Tạo chat room trong /chats
                    const chatId = [userAUid, userBUid].sort().join("_"); // Đảm bảo ID không bị trùng lặp đảo ngược
                    const chatRef = ref(dbRealtime, `chats/${chatId}`);
                    await update(chatRef, {
                      chatting: true,
                      users: {
                        [userAUid]: true,
                        [userBUid]: true,
                      },
                      createdAt: Date.now(),
                    });

                    // Điều hướng đến màn hình match
                    router.push({
                      pathname: "/(modals)/match",
                      params: {
                        user: JSON.stringify({ username: user?.displayName, photoUrl: user?.photoURL }),
                        matchedUser: JSON.stringify(currentCard),
                      }
                    });
                  } else {
                    console.log("❤️ Liked", currentCard.username);
                  }

                } catch (error) {
                  console.error("Lỗi khi xử lý match:", error);
                }
              }}
              overlayLabels={{
                left: {
                  title: "NOPE",
                  style: {
                    label: {
                      textAlign: "right",
                      color: "red",
                    },
                  },
                },
                right: {
                  title: "MATCH",
                  style: {
                    label: {
                      color: "#4DED30",
                    },
                  },
                }
              }}
              animateCardOpacity
              cards={filteredData}
              renderCard={(card) => {
                if (!card) return null;
                return (
                <View key={card.uid} className="relative bg-white h-[75%] rounded-xl">
                  <Image className="absolute top-0 h-full w-full rounded-xl" source={card.photoUrl ? { uri: card.photoUrl } : require("../../../assets/images/avt_placeholder_2.png")} />
                  <View className="absolute bottom-0 left-0 right-0 bg-black/30 px-6 py-4 flex-row justify-between items-center rounded-xl">
                    {/* Left side: Text info */}
                    <View>
                      <View className="flex-row items-center space-x-2">
                        <Text className="text-white text-2xl font-bold">
                          {card.username}
                        </Text>
                        <Text className="text-white text-2xl font-semibold ms-4">{card.age} 💎</Text>
                      </View>
                      <Text className="text-primary text-lg font-semibold">{sportMap[card.sportTrainer] ?? card.sportTrainer} {card.role.charAt(0).toUpperCase() + card.role.slice(1)}</Text>
                    </View>

                    {/* Right side: More icon */}
                    <TouchableOpacity className="bg-primary bg-opacity-20 rounded-full w-10 h-10 items-center justify-center"
                      onPress={() => router.push({ pathname: '/(modals)/profile', params: { card: JSON.stringify(card) } }) }
                    >
                      <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}}
            />
            ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-3xl mb-4 text-gray-600">😞 Không còn hồ sơ</Text>
              <TouchableOpacity
                onPress={handleRetry}
                className="bg-yellow-300 px-6 py-3 rounded-full"
              >
                <Text className="text-white font-bold text-lg">Thử lại</Text>
              </TouchableOpacity>
            </View>
          )}
          </View>
          {/*End Card*/}
        </>
      ) }
    </SafeAreaView>
  );
}
