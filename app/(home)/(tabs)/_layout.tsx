import { router, Tabs, useSegments } from 'expo-router';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Text, View, TouchableOpacity, Image } from 'react-native';
import { useMemo } from 'react';

function TopHeader({ title }: { title: string }) {
  return (
    <SafeAreaView>
      <View className="flex-row justify-between items-center px-5 mt-2">
        <Text className="text-3xl font-semibold">{title}</Text>
        <View className="flex-row items-center">
          <TouchableOpacity className="pr-3" onPress={() => router.push('/(home)/chat')}>
            <Ionicons name="chatbubbles-sharp" size={28} color="#FF5864" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image className="h-10 w-10 rounded-full" source={require('../../../assets/images/avt.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function TabsLayout() {
  const segments = useSegments(); // ví dụ: ["(home)", "(tabs)", "calendar"]

  const title = useMemo(() => {
    const current = segments[segments.length - 1]; // lấy segment cuối cùng
    switch (current) {
      case '(tabs)':
        return 'SWIPPING AREA';
      case 'community':
        return 'COMMUNITY';
      case 'calendar':
        return 'CALENDAR';
      case 'trainee':
        return 'TRAINEE SWIPE';
      case 'trainer':
        return 'TRAINER SWIPE';
      default:
        return 'SWIPPING AREA';
    }
  }, [segments]);

  return (
    <>
      <TopHeader title={title} />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 90,
            paddingBottom: 10,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name='community'
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Ionicons name="people" size={focused ? 30 : 28} color={focused ? color : '#FF5864'} />
            ),
          }}
        />
        <Tabs.Screen
          name='trainer'
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <FontAwesome5 name="chalkboard-teacher" size={focused ? 25 : 23} color={focused ? color : '#FF5864'} />
            ),
          }}
        />
        <Tabs.Screen
          name='index'
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Ionicons name="repeat" size={focused ? 30 : 28} color={focused ? color : '#FF5864'} />
            ),
          }}
        />
        <Tabs.Screen
          name='trainee'
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <FontAwesome5 name="book-reader" size={focused ? 25 : 23} color={focused ? color : '#FF5864'} />
            ),
          }}
        />
        <Tabs.Screen
          name='calendar'
          options={{
            tabBarIcon: ({size, color, focused}) => (
              <Ionicons name="calendar" size={focused ? 30 : 28} color={focused ? color : '#FF5864'} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
