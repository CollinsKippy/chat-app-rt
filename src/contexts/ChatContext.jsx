import { collection, getFirestore } from 'firebase/firestore';
import React, { createContext } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseApp } from '../config/firebase-config';

const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const fireStore = getFirestore(firebaseApp);
  const chatsRef = collection(fireStore, 'chats');

  const [chats, isChatsLoading, errorLoadingChats] =
    useCollectionData(chatsRef);

  return (
    <ChatContext.Provider
      value={{
        chats,
        isChatsLoading,
        errorLoadingChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
