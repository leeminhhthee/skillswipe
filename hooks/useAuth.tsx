import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dbRealtime } from '@/FirebaseConfig';
import { ref, get } from 'firebase/database';

interface CustomUser {
  uid: string;
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  role?: string;
  sportTrainer?: string;
  age?: number;
  method?: string;
  fee?: number;
  skillLevel?: string;
  teachingFrequency?: string;
  likePerson?: any[];
  likeByPerson?: any[];
}

type AuthContextType = {
  user: CustomUser | null;
  setUser: (user: CustomUser | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userSnapshot = await get(ref(dbRealtime, `users/${firebaseUser.uid}`));
          let userDataFromDb = {};
          if (userSnapshot.exists()) {
            userDataFromDb = userSnapshot.val();
          }

          // Tạo đối tượng customUser tổng hợp dữ liệu FirebaseAuth và DB
          const customUser: CustomUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            displayName: firebaseUser.displayName,
            ...userDataFromDb, // merge dữ liệu từ DB, ưu tiên DB nếu có
          };

          setUser(customUser);
        } catch (error) {
          console.error('Lỗi khi lấy role:', error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
