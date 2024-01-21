import { useContext, useEffect, createContext, useState, PropsWithChildren } from 'react';
import { GetUserResponse, postLogin, getUser } from './api/auth';
import { useStorageState } from './hooks/useStorageState';
import * as Device from 'expo-device';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  refreshUser: () => void;
  session?: string | null;
  isLoading: boolean;
  user: GetUserResponse | null;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  refreshUser: () => null,
  session: null,
  isLoading: false,
  user: null
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState(null);
  const refreshUser = async () => {
    const user = await getUser(session);

    setUser(user);
  };

  useEffect(() => {
    if (session) {
      refreshUser();
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email, password) => {
          const token = await postLogin({
            email: email,
            password: password,
            device_name: Device.deviceName
          });

          setSession(token);
        },
        refreshUser,
        signOut: () => {
          setSession(null);
          setUser(null);
        },
        user,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
