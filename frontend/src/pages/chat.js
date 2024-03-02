import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('/api/chat');
      setChats(response.data); // Use response.data to set the state with the array of chats
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat.chatId}>
          {chat.chatName}
        </div>
      ))}
    </div>
  );
};

export default Chat;
