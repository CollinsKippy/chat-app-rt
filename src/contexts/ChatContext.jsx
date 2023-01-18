import { collection, getFirestore } from 'firebase/firestore';
import React, { createContext, useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firebaseApp } from '../config/firebase-config';

const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const fireStore = getFirestore(firebaseApp);
  const chatsRef = collection(fireStore, 'chats');

  const [value, isChatsLoading, errorLoadingChats] = useCollection(chatsRef);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    let messages = [];

    value?.docs?.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
      setChats(messages);
    });

    return () => {};
  }, [value]);

  return (
    <ChatContext.Provider
      value={{
        chats: chats,
        isChatsLoading,
        errorLoadingChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
