import React, { useState, useEffect } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './chat/ChatLoading';
import GetSender from '../config/ChatLogic';
import GroupChatModal from './chat/GroupChatModal';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, chats, setChats, user, setSelectedChat } = ChatState();
  const toast = useToast();
  // const GetSender = (loggedUser, users) => {
  //   return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  // }
  const getChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error in getting the users",
        description: error,
        status: "errror",
        isClosable: true,
        position: "top",
        duration: 5000,
      })
    }

  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getChats();
  }, [])

  return <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg='white'
    justifyContent='space-between'
    w={{ base: "100%", md: "25%" }}
    borderRadius='lg'
    borderWidth='1px'
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "1rem", md: "1.5rem" }}
      display='flex'
      w='100%'
      justifyContent='space-between'
      alignItems='center'
    >
      My Chats
      <GroupChatModal>

        <Button
          display='flex'
          fontSize={{ base: "17px", md: "10px", lg: '17px' }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </GroupChatModal>
    </Box>
    <Box
      display='flex'
      flexDir='column'
      p={3}
      width='100%'
      h='100%'
      borderRadius='lg'
      overflowY='hidden'
    >
      {chats ? (
        <Stack overflowY='scroll'>
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor='pointer'
              w='100%'
              bg={selectedChat === chat ? 'grey' : '#00000029'}
              color={selectedChat === chat ? 'white' : 'black'}
              px={3}
              py={2}
              display='flex'
              justifyContent='center'
              key={chat._id}
              borderRadius='1rem'
              _hover={{ bg: 'grey', color: 'white' }} // Add this line to change background on hover
            >
              <Text>
                {!chat.isGroupChat ? user && GetSender(loggedUser, chat.users) : chat.chatName}
              </Text>
            </Box>
          ))}
        </Stack>
      ) : (<ChatLoading />)}

    </Box>
  </Box>
}

export default MyChats
