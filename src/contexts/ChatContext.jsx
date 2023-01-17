import React, { createContext, useState } from 'react';

const ChatContext = createContext();

export function ChatContextProvider({ children }) {
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        chats: chats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContext;
