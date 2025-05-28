import { Feather, FontAwesome } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import useAuth from '@/hooks/useAuth'
import { uploadToCloudinary } from '@/utils/cloudinary'
import { ref, update } from 'firebase/database'
import { auth, dbRealtime } from '@/FirebaseConfig'
import { updateProfile } from '@firebase/auth'

export default function MyProfile() {
    const { user, setUser } = useAuth(); 
    const [isUploading, setIsUploading] = useState(false);

    const handleUploadImage = async (localUri: string) => {
        try {
            setIsUploading(true);
            const cloudinaryResponse = await uploadToCloudinary(localUri, 'image');
            console.log("Kết quả upload Cloudinary:", cloudinaryResponse);

            const imageUrl =
                typeof cloudinaryResponse === 'string'
                ? cloudinaryResponse
                : cloudinaryResponse?.secure_url || ''
            
            if (imageUrl) {
                // Update vào Realtime Database
                await update(ref(dbRealtime, `users/${user.uid}`), { photoUrl: imageUrl })
                console.log('Đã lưu URL vào Realtime DB')

                // Update user state local
                setUser({ ...user, photoURL: imageUrl })

                // Update Firebase Auth profile
                await updateProfile(auth.currentUser, {
                photoURL: imageUrl,
                })
                console.log('Cập nhật UI xong')
            }
        } catch (error: any) {
            console.error('Lỗi khi upload ảnh:', error.response?.data || error.message || error)
        } finally {
            setIsUploading(false)
        }
    };

    const handleChangeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            handleUploadImage(localUri); // Gọi hàm upload
        }
    };

    const [rating, setRating] = useState(0); // số sao được chọn
    // Mô phỏng fetch từ "DB"
    useEffect(() => {
        setTimeout(() => {
        const mockDBResponse = {
            rating: 4, // Số sao giả lập từ DB
        };
        setRating(mockDBResponse.rating)
        }, 1000); // Mô phỏng delay 1 giây
    }, []);
    const handleRating = (index) => {
        setRating(index);
        // Bạn có thể gọi API lưu rating ở đây nếu cần
    };

    // Chế độ chỉnh sửa trainee
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editedName, setEditedName] = useState(user?.displayName);
    const [editedSchool, setEditedSchool] = useState('Foreign Trade University HCMC');
    const [editedAddress, setEditedAddress] = useState('Binh Thanh District, Ho Chi Minh City');

    // Chế độ chỉnh sửa trainer
    const [editingIntroTrainer, setEditingIntroTrainer] = useState(false);
    const [introTrainer, setIntroTrainer] = useState("Bạn là ai?");

    const [editingHighlightIndex, setEditingHighlightIndex] = useState(null);
    const [highlights, setHighlights] = useState([
    {
        title: "Hội thao Cơ sở II Trường Đại học Ngoại thương - FTUGames | Môn Cầu lông",
        description: "Huy chương Vàng đôi nam",
    },
    {
        title: "Giải cầu lông trẻ tỉnh Quảng Nam 2019 | Môn Cầu lông",
        description: "Huy chương Vàng đơn nam",
    },
    ]);

    const [isEditingContent, setIsEditingContent] = useState(false);
    const [basicSkillText, setBasicSkillText] = useState(
    "Something..."
    );
    const [advancedSkillText, setAdvancedSkillText] = useState(
    "Something..."
    );

    const handleSaveProfile = () => {
        // Gửi lên DB nếu cần
        console.log('Saving profile:', editedName, editedSchool, editedAddress);

        // Ẩn chế độ chỉnh sửa
        setIsEditingProfile(false);
    };

    return (
    <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View>
            {/* Banner + Avatar */}  
            <View className="relative">
                <Image
                    source={require("../../assets/images/logo_stroke.png")}
                    className="w-full h-40"
                    resizeMode="cover"
                />
                {/* <TouchableOpacity className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full" onPress={() => handleChangeBanner()}>
                    <Feather name="camera" size={18} color="#000" />
                </TouchableOpacity> */}

                {/* Avatar đè lên banner */}
                <View className="absolute -bottom-10 left-1/2 -ml-10 z-10">
                    <Image
                    source={
                        user?.photoURL
                        ? { uri: user?.photoURL }
                        : require("../../assets/images/avt_placeholder.png")
                    }
                        className="w-20 h-20 rounded-full border-4 border-white"
                    />
                    {isUploading ? (
                    <View className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                        <ActivityIndicator size="small" color="#fff" />
                    </View>
                    ) : (
                    <TouchableOpacity
                        className="absolute bottom-0 right-0 bg-white/90 p-1 rounded-full"
                        onPress={() => handleChangeAvatar()}
                    >
                        <Feather name="camera" size={16} color="#000" />
                    </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Info + Tabs */}
            <View className="px-4 mt-10 items-center">
                <View className="flex-row items-center space-x-2 mb-1">
                {isEditingProfile ? (
                    <TextInput
                    value={editedName}
                    onChangeText={setEditedName}
                    className="text-xl font-semibold border border-gray-300 rounded px-2 py-1 items-center"
                    placeholder="Tên"
                    />
                ) : (
                    <Text className="text-xl font-semibold">
                    {editedName} <Text>💎</Text>
                    </Text>
                )}
                
                <TouchableOpacity
                    onPress={() => {
                    if (isEditingProfile) {
                        // TODO: Save to DB here
                        console.log('Saving:', editedName, editedSchool, editedAddress);
                    }
                    setIsEditingProfile(!isEditingProfile);
                    }}
                >
                    {isEditingProfile ? (
                    <Feather name="check" size={20} color="green" />
                    ) : (
                    <Feather name="edit" size={14} color="gray" />
                    )}
                </TouchableOpacity>
                </View>

                {isEditingProfile ? (
                <>
                    <TextInput
                    value={editedSchool}
                    onChangeText={setEditedSchool}
                    className="text-center text-sm border border-gray-300 rounded px-2 py-2 mt-1 w-full"
                    placeholder="Trường học"
                    />
                    <TextInput
                    value={editedAddress}
                    onChangeText={setEditedAddress}
                    className="text-center text-sm border border-gray-300 rounded px-2 py-2 mt-1 w-full"
                    placeholder="Địa chỉ"
                    />
                </>
                ) : (
                <>
                    <Text className="text-center text-gray-600 text-sm mt-1">{editedSchool}</Text>
                    <Text className="text-center text-gray-600 text-sm mt-1">{editedAddress}</Text>
                </>
                )}
            </View>
        </View>

        {/* Nội dung tabs */}
        <ScrollView className="p-4">
            <View className="p-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-lg text-gray-800">Giới thiệu</Text>
                    <TouchableOpacity onPress={() => setEditingIntroTrainer(!editingIntroTrainer)}>
                    {editingIntroTrainer ? (
                        <Feather name="check" size={20} color="green" />
                    ) : (
                        <Feather name="edit-2" size={20} color="gray" />
                    )}
                    </TouchableOpacity>
                </View>
                {editingIntroTrainer ? (
                    <TextInput
                    multiline
                    value={introTrainer}
                    onChangeText={setIntroTrainer}
                    className="text-gray-700 p-2 bg-white border border-gray-300 rounded"
                    />
                ) : (
                    <Text className="text-gray-700 leading-5">{introTrainer}</Text>
                )}
            </View>

            <View className="p-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-lg text-gray-800">Nổi bật</Text>
                    <TouchableOpacity onPress={() => setHighlights([...highlights, { title: "", description: "" }])}>
                    <Feather name="plus" size={20} color="gray" />
                    </TouchableOpacity>
                </View>

                {highlights.map((item, index) => (
                    <View key={index} className="mb-2 border border-gray-200 rounded p-2">
                    {editingHighlightIndex === index ? (
                        <>
                        <TextInput
                            value={item.title}
                            onChangeText={(text) => {
                            const newHighlights = [...highlights];
                            newHighlights[index].title = text;
                            setHighlights(newHighlights);
                            }}
                            placeholder="Tiêu đề"
                            className="text-gray-800 font-bold mb-1 border border-gray-300 rounded px-2 py-1"
                        />
                        <TextInput
                            value={item.description}
                            onChangeText={(text) => {
                            const newHighlights = [...highlights];
                            newHighlights[index].description = text;
                            setHighlights(newHighlights);
                            }}
                            placeholder="Mô tả"
                            className="text-gray-600 italic border border-gray-300 rounded px-2 py-1"
                        />
                        <View className="flex-row justify-end space-x-3 mt-2">
                            <TouchableOpacity onPress={() => setEditingHighlightIndex(null)}>
                            <Feather name="check" size={20} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={() => {
                                const newHighlights = highlights.filter((_, i) => i !== index);
                                setHighlights(newHighlights);
                            }}
                            >
                            <Feather name="trash-2" size={20} color="red" />
                            </TouchableOpacity>
                    </View>
                    </>
                ) : (
                    <>
                    <Text className="text-gray-800 font-bold">{item.title}</Text>
                    <Text className="text-gray-600 italic">{item.description}</Text>
                    <TouchableOpacity onPress={() => setEditingHighlightIndex(index)} className="absolute top-2 right-2">
                        <Feather name="edit" size={16} color="gray" />
                    </TouchableOpacity>
                    </>
                )}
                </View>
            ))}
            </View>


            <View className="p-4 border-b border-gray-200">
                <Text className="font-bold text-lg text-gray-800 mb-2">Đánh giá</Text>
                <View className="flex-row items-center justify-evenly">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <TouchableOpacity key={i} onPress={() => handleRating(i)} className="mr-1">
                        <FontAwesome
                            name={i <= rating ? 'star' : 'star-o'}
                            size={30}
                            color={i <= rating ? '#facc15' : '#d1d5db'} // vàng nếu được chọn, xám nếu chưa
                        />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View className="p-4 border-b border-gray-200">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="font-bold text-lg text-gray-800">Nội dung đào tạo</Text>
                    <TouchableOpacity onPress={() => setIsEditingContent(!isEditingContent)}>
                    <Feather
                        name={isEditingContent ? "check" : "edit-2"}
                        size={20}
                        color={isEditingContent ? "green" : "gray"}
                    />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-gray-700 leading-5 font-bold">
                        Kỹ năng cơ bản
                    </Text>
                    <View className="flex-row items-start">
                        {isEditingContent ? (
                            <TextInput
                            value={basicSkillText}
                            onChangeText={setBasicSkillText}
                            className="text-gray-700 ps-2 flex-1 border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <Text className="text-gray-700 leading-5 font-light italic">{basicSkillText}</Text>
                        )}
                    </View>
                </View>
                <View>
                    <Text className="text-gray-700 leading-5 font-bold">
                        Kỹ năng nâng cao
                    </Text>
                    <View className="flex-row items-start">
                        {isEditingContent ? (
                            <TextInput
                            value={advancedSkillText}
                            onChangeText={setAdvancedSkillText}
                            className="text-gray-700 ps-2 flex-1 border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <Text className="text-gray-700 leading-5 font-light italic">{advancedSkillText}</Text>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}
