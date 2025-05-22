import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, dbRealtime } from '@/FirebaseConfig';
import { ref, get } from 'firebase/database';

interface CustomUser {
  uid: string;
  email: string | null;
  photoURL?: string | null;
  displayName?: string | null;
  role?: string;
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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const roleSnapshot = await get(ref(dbRealtime, `users/${firebaseUser.uid}/role`));
          const role = roleSnapshot.exists() ? roleSnapshot.val() : null;

          const customUser: CustomUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            displayName: firebaseUser.displayName,
            role,
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
