import { storage } from '../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// file: local file (uri của ảnh hoặc video)
export const uploadFile = async (fileUri: string, fileName: string) => {
  try {
    // Convert file uri to blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const fileRef = ref(storage, `posts/${fileName}`);
    await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(fileRef);

    return url; // Đây là public URL
  } catch (error) {
    console.error('Upload failed', error);
    throw error;
  }
};
