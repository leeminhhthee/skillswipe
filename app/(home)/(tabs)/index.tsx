/* eslint-disable no-unused-expressions */
import useAuth from "@/hooks/useAuth";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation, router } from "expo-router"
import { useRef, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import Swiper from "react-native-deck-swiper"

const DUMMY_DATA = [
  {
    id: 111,
    firstName: "Bao1",
    lastName: "Gia",
    occupation: "Badminton Trainee",
    photoUrl: "https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/474786888_1682733842588503_8017608394310659508_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeG6oedSW66O7pQy2oo3zJauUSLIj0TyBfBRIsiPRPIF8Dkh4A1p1Mc1BeIbm1Aw7Vj2GBN5U8eqyzTtNNSVHm0A&_nc_ohc=1YE8hktPSFQQ7kNvwHvXH7H&_nc_oc=AdkPGDDp9D_vy5tXcnu7b5NkqreKsRHDKrO1qWE3I2YV7fSqEUXW3UNwYgo25mRCfpM&_nc_zt=23&_nc_ht=scontent.fdad3-5.fna&_nc_gid=AqBzgWcezUAtz496n3EBVQ&oh=00_AfIgtT36uzsVhz1_WM4vbjv6WpBd_MzHScFt03wgRihjeA&oe=682CBF25",
    age: "21",
    role: "trainee",
  },
  {
    id: 112,
    firstName: "Bao2",
    lastName: "Gia",
    occupation: "Badminton Trainer",
    photoUrl: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/474683145_1682733985921822_4846905900448368010_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFCJMIQ-f9hYUg71XAa_i8QL50NtA_Ns0QvnQ20D82zRAMsqHdX2zqhEiUbY9-gewi-J_P4e54mD2pPWp3qyMjk&_nc_ohc=2MP5L_pu9EgQ7kNvwHI6S5A&_nc_oc=Adnmx9Km47YOhAxd1SXF6DMa9uqGYCTzWURzNMpYDdW9tdcIRY0bUGp_JNBcX7OlGjQ&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=RP1KKl544fsXIbC1tGXQ2w&oh=00_AfLoymanmnpYQX0nS0WB-AP66SZeP2ggWNQhjSgmPfqrBg&oe=682CCB5B",
    age: "21",
    role: "trainer",
  },
  {
    id: 113,
    firstName: "Bao3",
    lastName: "Gia",
    occupation: "Badminton Trainee",
    photoUrl: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/474888024_1682734179255136_4684435507278851960_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeG0EIvZWjPELu4mTmUA5M1pedSHdtUfVD551Id21R9UPt7o3hd-Qj1VJKJDk0WIYknzyQ0gi0L1uhS2JOQYblnp&_nc_ohc=e8ci7yfxOjkQ7kNvwH_e29G&_nc_oc=AdlfADp7o7HD1WoK2HyHovoUA7BzoiaP5htqeBKyYRG7jbNlmLv862dp3gBDFTh9pWU&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=VGv2PbBEeVkB6SKkjGI67A&oh=00_AfJtm20QC26jIcU3diKi8gv6LvkuwhbnKU3WzZUPmD9bZw&oe=682CCE0A",
    age: "21",
    role: "trainee",
  },
  {
    id: 114,
    firstName: "Bao4",
    lastName: "Gia",
    occupation: "Badminton Trainer",
    photoUrl: "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/474673768_1682733899255164_3600579688935570451_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGhfK_8_C5g-7koO98421IcU_uXnTabz5FT-5edNpvPkUnycrY0jdm-fa6NUBL5alI4ZXlLG1O3dQqLQxJsIEf0&_nc_ohc=qc49u-YSSqkQ7kNvwFHOHcM&_nc_oc=Adm9UIW9jk9ADs3_nwXG99iZjZYW1jHP9LLVORSLZg03cq5VXbOVCA-vUkn7LL3kgT4&_nc_zt=23&_nc_ht=scontent.fdad3-4.fna&_nc_gid=nMTry7YljMmGJmOyRHvwgA&oh=00_AfK6QE6yk4mouVWaLKh6xL2jzfhOiLZzxhzXa0MzP8pfKg&oe=682CB936",
    age: "21",
    role: "trainer",
  },
]

export default function HomeScreen() {
  const navigation = useNavigation()
  const { user, setUser } = useAuth(); 

  const handleLogout = () => {
    setUser(null);
  };

  const swipeRef = useRef(null)

  return (
    <SafeAreaView className="flex-1">
      {/*Header*/}
      {/* <View className="flex-row justify-between items-center px-5 mt-2">
        <Text className="text-3xl font-semibold">SWIPPING AREA</Text>

        <View className="flex-row items-center">
          <TouchableOpacity className="pr-3" onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="chatbubbles-sharp" size={28} color="#FF5864" />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Image
              className="h-10 w-10 rounded-full"
              source={require("../../assets/images/avt.png")}
            />
          </TouchableOpacity>
        </View>
      </View> */}
      {/*End Header*/}

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
          onPress={() => console.log("reload")}
        >
          <AntDesign name="reload1" size={24} color="#e6c619" />
        </TouchableOpacity>
      </View>

      {/*Card*/}
      <View className="flex-1 -mt-14">
        <Swiper
          ref={swipeRef}
          cardIndex={0}
          stackSize={DUMMY_DATA.length}
          stackSeparation={1}
          backgroundColor="transparent"
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("Swipe NOPE")
          }}
          onSwipedRight={() => {
            console.log("Swipe MATCH")
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
          cards={DUMMY_DATA}
          renderCard={(card) => (
            <View key={card.id} className="relative bg-white h-[70%] rounded-xl">
              <Image className="absolute top-0 h-full w-full rounded-xl" source={{ uri: card.photoUrl }} />
              <View className="absolute bottom-0 left-0 right-0 bg-black/30 px-6 py-4 flex-row justify-between items-center rounded-xl">
                {/* Left side: Text info */}
                <View>
                  <View className="flex-row items-center space-x-2">
                    <Text className="text-white text-3xl font-bold">
                      {card.lastName} {card.firstName}
                    </Text>
                    <Text className="text-white text-2xl font-semibold ms-4">{card.age} 💎</Text>
                  </View>
                  <Text className="text-purple-300 text-lg font-semibold">{card.occupation}</Text>
                </View>

                {/* Right side: More icon */}
                <TouchableOpacity className="bg-red-500 bg-opacity-20 rounded-full w-10 h-10 items-center justify-center"
                  onPress={() => router.push({ pathname: '/(modals)/profile', params: { card: JSON.stringify(card) } }) }
                >
                  <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/*End Card*/}
      <View className="absolute bottom-6 w-full px-6 z-50">
        <TouchableOpacity
          className="bg-red-500 py-4 rounded-full items-center"
          onPress={handleLogout}
        >
          <Text className="text-white font-semibold text-lg">Thiết kế nhu cầu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
