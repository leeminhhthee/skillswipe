/* eslint-disable no-unused-expressions */
import useAuth from "@/hooks/useAuth";
import { usePassed } from "@/stores/usePassed";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router"
import { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Swiper from "react-native-deck-swiper"
import LottieView from "lottie-react-native";

const DUMMY_DATA = [
  {
    id: 111,
    username: "Lê Hoàng Minh",
    sportName: "Cầu lông",
    sportValues: 'badminton',
    photoUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    age: "21",
    role: "trainer",
    subject: "Cầu lông",
    method: "Offline",
    fee: "2.000.000 VND - 3.999.9999 VND",
    skillLevel: "Nâng cao",
    teachingFrequency: "3 buổi/tuần",
    likedMe: true,
    iLiked: true // ✅ Match!
  },
  {
    id: 112,
    username: "Phạm Thanh Tùng",
    sportName: "Bóng chuyền",
    photoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    age: "21",
    role: "trainer",
    subject: "Bóng chuyền",
    method: "Offline",
    fee: "Dưới 2.000.000 VND",
    skillLevel: "Cơ bản",
    teachingFrequency: "3 buổi/tuần",
    likedMe: false,
    iLiked: true
  },
  {
    id: 113,
    username: "Nguyễn Thái Dương",
    sportName: "Guitar",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    age: "21",
    role: "trainer",
    subject: "Guitar",
    method: "Offline",
    fee: "6.000.000 VND - 8.000.000 VND",
    skillLevel: "Nâng cao",
    teachingFrequency: "3-5 buổi/tuần",
    likedMe: true,
    iLiked: false
  },
  {
    id: 114,
    username: "Bùi Minh Tuấn",
    sportName: "Bơi lội",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    age: "21",
    role: "trainer",
    subject: "Bơi lội",
    method: "Offline",
    fee: "Dưới 2.000.000 VND",
    skillLevel: "Cơ bản",
    teachingFrequency: "Dưới 2 buổi/tuần",
    likedMe: false,
    iLiked: false
  },
  {
    id: 115,
    username: "Nguyễn Văn Hậu",
    sportName: "Piano",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    age: "21",
    role: "trainer",
    subject: "Piano",
    method: "Offline",
    fee: "4.000.000 VND - 6.000.000 VND",
    skillLevel: "Nâng cao",
    teachingFrequency: "3-5 buổi/tuần",
    likedMe: true,
    iLiked: true // ✅ Match!
  },
  {
    id: 116,
    username: "Trần Quốc Hưng",
    sportName: "Bóng rổ",
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
    age: "21",
    role: "trainer",
    subject: "Bóng rổ",
    method: "Offline",
    fee: "4.000.000 VND - 6.000.000 VND",
    skillLevel: "Cơ bản",
    teachingFrequency: "3-5 buổi/tuần",
    likedMe: false,
    iLiked: false
  },
  {
    id: 117,
    username: "Vương Thanh Bình",
    sportName: "Tennis",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    age: "21",
    role: "trainer",
    subject: "Tennis",
    method: "Offline",
    fee: "4.000.000 VND - 6.000.000 VND",
    skillLevel: "Nâng cao",
    teachingFrequency: "3-5 buổi/tuần",
    likedMe: true,
    iLiked: false
  },
  {
    id: 118,
    username: "Lý Gia Bảo",
    sportName: "Cầu lông",
    photoUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    age: "21",
    role: "trainer",
    subject: "Cầu lông",
    method: "Offline",
    fee: "6.000.000 VND - 8.000.000 VND",
    skillLevel: "Nâng cao",
    teachingFrequency: "3 buổi/tuần",
    likedMe: false,
    iLiked: true
  },
  {
    id: 119,
    username: "Tạ Quốc Khánh",
    sportName: "Guitar",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    age: "21",
    role: "trainer",
    subject: "Guitar",
    method: "Offline",
    fee: "2.000.000 VND - 3.999.9999 VND",
    skillLevel: "Cơ bản",
    teachingFrequency: "3 buổi/tuần",
    likedMe: true,
    iLiked: true // ✅ Match!
  },
  {
    id: 120,
    username: "Đỗ Nhật Trường",
    sportName: "Bóng rổ",
    photoUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
    age: "21",
    role: "trainer",
    subject: "Bóng rổ",
    method: "Offline",
    fee: "2.000.000 VND - 3.999.9999 VND",
    skillLevel: "Cơ bản",
    teachingFrequency: "3 buổi/tuần",
    likedMe: false,
    iLiked: false
  },
];


export default function HomeScreen() {
  const { user } = useAuth()

  const swipeRef = useRef(null)

  const passed = usePassed((state) => state.passed);
  const selectedSubject = usePassed((state) => state.subject);
  const filteredData = selectedSubject ? DUMMY_DATA.filter((item) => item.sportName === selectedSubject) : DUMMY_DATA

  console.log(filteredData)

  useEffect(() => {
    setCardIndex(0);
    setIsAllSwiped(false);
    swipeRef.current?.jumpToCardIndex(0);
  }, [selectedSubject]);

  const [isLoading, setIsLoading] = useState(true);

  const [cardIndex, setCardIndex] = useState(0);
  const [isAllSwiped, setIsAllSwiped] = useState(false);
  const setPassed = usePassed((state) => state.setPassed);

  useEffect(() => {
    if (passed) {
      // Chờ 2.5s sau khi passed mới hiển thị card
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [passed]);

  console.log(passed)

  const handleRetry = () => {
    setPassed(false);
    setCardIndex(0);
    setIsAllSwiped(false);
    swipeRef.current?.jumpToCardIndex(0);
    router.push("/(modals)/needdesign");
  };

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
              stackSize={DUMMY_DATA.length}
              stackSeparation={1}
              backgroundColor="transparent"
              verticalSwipe={false}
              onSwiped={(index) => {
                setCardIndex(index + 1);
                if (index + 1 >= filteredData.length) {
                  setIsAllSwiped(true);
                }
              }}
              onSwipedAll={() => setIsAllSwiped(true)}
              onSwipedLeft={() => {
                console.log("Swipe NOPE")
              }}
              onSwipedRight={(index) => {
                const currentCard = filteredData[index];
                if (currentCard?.likedMe) {
                  console.log("💖 MATCHED WITH", currentCard.username);

                  // 👉 Gọi MatchScreen modal
                  router.push({
                    pathname: "/(modals)/match",
                    params: {
                      user: JSON.stringify({ username: user?.displayName, photoUrl: user?.photoURL }), // 👈 chỉnh sửa lại theo user thật
                      matchedUser: JSON.stringify(currentCard),
                    }
                  });

                } else {
                  console.log("Liked", currentCard.username);
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
              renderCard={(card) => (
                <View key={card.id} className="relative bg-white h-[75%] rounded-xl">
                  <Image className="absolute top-0 h-full w-full rounded-xl" source={{ uri: card.photoUrl }} />
                  <View className="absolute bottom-0 left-0 right-0 bg-black/30 px-6 py-4 flex-row justify-between items-center rounded-xl">
                    {/* Left side: Text info */}
                    <View>
                      <View className="flex-row items-center space-x-2">
                        <Text className="text-white text-3xl font-bold">
                          {card.username}
                        </Text>
                        <Text className="text-white text-2xl font-semibold ms-4">{card.age} 💎</Text>
                      </View>
                      <Text className="text-primary text-lg font-semibold">{card.sportName} {card.role.charAt(0).toUpperCase() + card.role.slice(1)}</Text>
                    </View>

                    {/* Right side: More icon */}
                    <TouchableOpacity className="bg-primary bg-opacity-20 rounded-full w-10 h-10 items-center justify-center"
                      onPress={() => router.push({ pathname: '/(modals)/profile', params: { card: JSON.stringify(card) } }) }
                    >
                      <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
