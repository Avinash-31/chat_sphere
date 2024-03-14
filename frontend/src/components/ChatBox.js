import React from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/react';
import SingleChat from './chat/SingleChat';

const ChatBox = ({fetchAgain,setFetchAgain}) => {

  const {selectedChat} = ChatState();
  return <Box
    display={{base : selectedChat? "flex" : "none", md : "flex"}}
    justifyContent='center'
    flexDir='column'
    borderRadius='lg'
    h='100%'
    bg='#d8d8d854'
    boxShadow='0 4px 30px rgba(0, 0, 0, 0.1)'
    backdropBlur={5}
    border='1px solid #d8d8d854'
    w={{base:"100%",md : '74%'}}
    borderWidth='1px'
  >
    <SingleChat fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain} />
  </Box>
}

export default ChatBox
