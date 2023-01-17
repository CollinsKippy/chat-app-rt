import './App.css';
import ChatList from './components/ChatList';
import Navbar from './components/Navbar';
import { ChatContextProvider } from './contexts/ChatContext';

function App() {
  return (
    <ChatContextProvider>
      <Navbar />
      <ChatList />
    </ChatContextProvider>
  );
}

export default App;
