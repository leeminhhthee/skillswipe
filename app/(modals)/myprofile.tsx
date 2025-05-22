import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function MyProfileS() {
    const [activeTab, setActiveTab] = useState<'trainee' | 'trainer'>('trainee');
    const [avatar, setAvatar] = useState(require('../../assets/images/avt.png'));
    const [banner, setBanner] = useState(require('../../assets/images/avt2.jpg'));

    const handleChangeBanner = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImage = { uri: result.assets[0].uri };
            setBanner(newImage);
            // TODO: Gửi newImage.uri lên server tại đây
            // await uploadToServer('banner', newImage.uri)
        }
    };

    const handleChangeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        });

        if (!result.canceled) {
        const newImage = { uri: result.assets[0].uri };
        setAvatar(newImage);
        // TODO: Gửi newImage.uri lên server tại đây
        // await uploadToServer('avatar', newImage.uri)
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
    const [editedName, setEditedName] = useState('Gia Bảo');
    const [editedSchool, setEditedSchool] = useState('Foreign Trade University HCMC');
    const [editedAddress, setEditedAddress] = useState('Binh Thanh District, Ho Chi Minh City');

    const [editingIntroTrainee, setEditingIntroTrainee] = useState(false);
    const [introTrainee, setIntroTrainee] = useState("Tôi đang có nhu cầu tìm một huấn luyện viên cầu lông chuyên nghiệp. Mục tiêu của tôi là rèn luyện đúng kỹ thuật cơ bản, có thêm khả năng di chuyển, phản xạ...");

    const [editingBudget, setEditingBudget] = useState(false);
    const [experienceText, setExperienceText] = useState("Có kinh nghiệm huấn luyện");
    const [teachingMethodText, setTeachingMethodText] = useState("Dễ hiểu, chi tiết");

    const [isEditingNeeds, setIsEditingNeeds] = useState(false);
    const [trainingFocusText, setTrainingFocusText] = useState("Tập trung vào kỹ thuật cơ bản");
    const [budget, setBudget] = useState("Mức học phí mong muốn theo buổi/tuần/tháng.\nHình thức thanh toán (theo buổi, theo gói...).");

    // Chế độ chỉnh sửa trainer
    const [editingIntroTrainer, setEditingIntroTrainer] = useState(false);
    const [introTrainer, setIntroTrainer] = useState("Tôi là một huấn luyện viên cầu lông với nhiều năm kinh nghiệm thi đấu. Trong suốt quá trình gắn bó với ...");

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
    "Kỹ năng cầm vợt; Tư thế chuẩn bị & di chuyển; Kỹ thuật đánh cầu cơ bản;..."
    );
    const [advancedSkillText, setAdvancedSkillText] = useState(
    "Chiến thuật cơ bản trong thi đấu; Tâm lý thi đấu & dinh dưỡng thể thao;..."
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
                    source={banner}
                    className="w-full h-40"
                    resizeMode="cover"
                />
                <TouchableOpacity className="absolute bottom-2 right-2 bg-white/80 p-1 rounded-full" onPress={() => handleChangeBanner()}>
                    <Feather name="camera" size={18} color="#000" />
                </TouchableOpacity>

                {/* Avatar đè lên banner */}
                <View className="absolute -bottom-10 left-1/2 -ml-10 z-10">
                    <Image
                        source={avatar}
                        className="w-20 h-20 rounded-full border-4 border-white"
                    />
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-white/90 p-1 rounded-full" onPress={() => handleChangeAvatar()}>
                        <Feather name="camera" size={16} color="#000" />
                    </TouchableOpacity>
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


                <View className="flex-row justify-around mt-4 border-b border-gray-300 w-full">
                    <TouchableOpacity
                    onPress={() => setActiveTab('trainee')}
                    className={`pb-2 ${activeTab === 'trainee' ? 'border-b-2 border-primary' : ''}`}
                    >
                    <Text className={`text-base font-medium ${activeTab === 'trainee' ? 'text-primary' : 'text-gray-500'}`}>
                        Trainee
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => setActiveTab('trainer')}
                    className={`pb-2 ${activeTab === 'trainer' ? 'border-b-2 border-primary' : ''}`}
                    >
                    <Text className={`text-base font-medium ${activeTab === 'trainer' ? 'text-primary' : 'text-gray-500'}`}>
                        Trainer
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        {/* Nội dung tabs */}
        <ScrollView className="p-4">
            {activeTab === 'trainee' ? (
            <>
                <View className="p-4 border-b border-gray-200">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-bold text-lg text-gray-800">Giới thiệu</Text>
                        <TouchableOpacity onPress={() => setEditingIntroTrainee(!editingIntroTrainee)}>
                        {editingIntroTrainee ? (
                            <Feather name="check" size={20} color="green" />
                        ) : (
                            <Feather name="edit-2" size={20} color="gray" />
                        )}
                        </TouchableOpacity>
                    </View>
                    {editingIntroTrainee ? (
                        <TextInput
                        multiline
                        value={introTrainee}
                        onChangeText={setIntroTrainee}
                        className="text-gray-700 p-2 bg-white border border-gray-300 rounded"
                        />
                    ) : (
                        <Text className="text-gray-700 leading-5">{introTrainee}</Text>
                    )}
                </View>

                <View className="p-4 border-b border-gray-200">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-bold text-lg text-gray-800">Nhu cầu cụ thể đối với trainer</Text>
                        <TouchableOpacity onPress={() => setIsEditingNeeds(!isEditingNeeds)}>
                        <Feather
                            name={isEditingNeeds ? "check" : "edit-2"}
                            size={20}
                            color={isEditingNeeds ? "green" : "gray"}
                        />
                        </TouchableOpacity>
                    </View>

                    <View className="bg-gray-50 p-3 rounded-lg space-y-2">
                        {/* Yêu cầu kinh nghiệm */}
                        <Text className="text-gray-700 font-medium">Yêu cầu về kinh nghiệm:</Text>
                        <View className="flex-row items-start">
                        <Ionicons name="bookmark" size={13} className="mt-1" />
                        {isEditingNeeds ? (
                            <TextInput
                            value={experienceText}
                            onChangeText={setExperienceText}
                            className="text-gray-700 ps-2 flex-1 border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <Text className="text-gray-700 ps-2">{experienceText}</Text>
                        )}
                        </View>

                        {/* Phương pháp giảng dạy */}
                        <Text className="text-gray-700 font-medium">Phương pháp giảng dạy:</Text>
                        <View className="flex-row items-start">
                        <Ionicons name="bookmark" size={13} className="mt-1" />
                        {isEditingNeeds ? (
                            <TextInput
                            value={teachingMethodText}
                            onChangeText={setTeachingMethodText}
                            className="text-gray-700 ps-2 flex-1 border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <Text className="text-gray-700 ps-2">{teachingMethodText}</Text>
                        )}
                        </View>

                        {/* Phương pháp huấn luyện */}
                        <Text className="text-gray-700 font-medium">Phương pháp huấn luyện mong muốn:</Text>
                        <View className="flex-row items-start">
                        <Ionicons name="bookmark" size={13} className="mt-1" />
                        {isEditingNeeds ? (
                            <TextInput
                            value={trainingFocusText}
                            onChangeText={setTrainingFocusText}
                            className="text-gray-700 ps-2 flex-1 border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <Text className="text-gray-700 ps-2">{trainingFocusText}</Text>
                        )}
                        </View>
                    </View>
                </View>

                <View className="p-4 border-b border-gray-200">
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-bold text-lg text-gray-800">Ngân sách dự kiến</Text>
                        <TouchableOpacity onPress={() => setEditingBudget(!editingBudget)}>
                        {editingBudget ? (
                            <Feather name="check" size={20} color="green" />
                        ) : (
                            <Feather name="edit-2" size={20} color="gray" />
                        )}
                        </TouchableOpacity>
                    </View>
                    {editingBudget ? (
                        <TextInput
                        multiline
                        value={budget}
                        onChangeText={setBudget}
                        className="text-gray-700 p-2 bg-white border border-gray-300 rounded"
                        />
                    ) : (
                        <Text className="text-gray-700 leading-5">{budget}</Text>
                    )}
                </View>
            </>
            ) : (
            <>
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
            </>
            )}
        </ScrollView>
    </SafeAreaView>
  )
}
