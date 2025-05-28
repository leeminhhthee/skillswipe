import axios from 'axios';

export const uploadToCloudinary = async (uri: string, type: 'image' | 'video') => {
  const formData = new FormData();

  formData.append('file', {
    uri,
    type: type === 'image' ? 'image/jpeg' : 'video/mp4',
    name: `upload.${type === 'image' ? 'jpg' : 'mp4'}`,
  } as any);

  formData.append('upload_preset', 'swipskill');

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dikzmjuff/${type}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error.response?.data || error.message);
    throw error;
  }
};
