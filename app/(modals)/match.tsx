// app/(modals)/MatchScreen.tsx
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function MatchScreen() {
  const { user, matchedUser } = useLocalSearchParams();

  const parsedUser = JSON.parse(user);
  const parsedMatched = JSON.parse(matchedUser);

  console.log(parsedUser.photoUrl)

  return (
    <View className="flex-1 bg-red-400 justify-center items-center px-6">
      <Image source={{ uri: "https://links.papareact.com/mg9" }}
          className="w-full h-24 -mt-10" />
      <Text className="text-white text-lg text-center mb-6 mt-3">
        You and {parsedMatched.username} have liked each other.
      </Text>

      <View className="flex-row justify-between w-full px-10 mb-6">
        <Image
            source={
              parsedUser?.photoURL
                ? { uri: parsedUser.photoURL }
                : require('../../assets/images/avt_placeholder.png')
            }
          className="w-28 h-28 rounded-full border-[4px] border-white"
          resizeMode="cover"
        />
        <Image
          source={
            parsedMatched?.photoURL
              ? { uri: parsedMatched.photoURL }
              : require('../../assets/images/avt_placeholder.png')
          }
          className="w-28 h-28 rounded-full border-4 border-white"
        />
      </View>

      <TouchableOpacity
        onPress={() => router.replace('/(home)/chat')} // hoặc custom action
        className="bg-white px-6 py-4 rounded-full shadow-lg"
      >
        <Text className="text-red-500 text-lg font-bold">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
}
