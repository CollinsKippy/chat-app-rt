import './App.css';
import ChatForm from './components/ChatForm';
import ChatList from './components/ChatList';
import Navbar from './components/Navbar';
import { ChatContextProvider } from './contexts/ChatContext';

function App() {
  return (
    <ChatContextProvider>
      <Navbar />
      <ChatList />
      <ChatForm />
    </ChatContextProvider>
  );
}

export default App;
