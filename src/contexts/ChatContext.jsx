import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firebaseApp } from '../config/firebase-config';

const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const fireStore = getFirestore(firebaseApp);
  const chatsRef = collection(fireStore, 'chats');

  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();

  const [value, isChatsLoading, errorLoadingChats] = useCollection(chatsRef);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let messages = [];

    value?.docs?.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
      setChats(messages);
    });

    return () => {};
  }, [value]);

  const handleChatSubmit = async (chatMessage) => {
    await addDoc(chatsRef, {
      message: chatMessage,
      createdAt: serverTimestamp(),
      displayName: user?.displayName,
      userId: user?.uid,
    });
  };

  const handleLogin = async () => {
    try {
      const signInResult = await signInWithPopup(auth, provider);
      const user = signInResult.user;
      console.log({ user });
      setUser(user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      console.log({ errorCode, errorMessage, email });
    }
  };
  const handleLogout = async () => {
    signOut(auth);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        isChatsLoading,
        errorLoadingChats,
        handleChatSubmit,

        user,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
