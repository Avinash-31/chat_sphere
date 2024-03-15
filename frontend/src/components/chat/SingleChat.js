import React from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { GetSender, GetSenderData } from '../../config/ChatLogic'; // Modified import statement
import InfoModal from './InfoModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        w='100%'
                    >

                        <Text
                            display='flex'
                            width='100%'
                            height='100%'
                            justifyContent='space-between'
                            bg='rgba(0, 0, 0,0.1)'
                            color='white'
                            borderRadius='lg'
                            fontSize='3xl'>
                            {!selectedChat.isGroupChat ? (
                                <>
                                    <IconButton
                                        display={{ base: 'flex', md: 'flex' }}
                                        height='100%'
                                        bg='rgba(0, 0, 0,0)'
                                        color='white'
                                        borderRadius='lg'
                                        _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
                                        icon={<ArrowBackIcon />}
                                        onClick={() => setSelectedChat("")}
                                    ></IconButton>
                                    {user && GetSender(user, selectedChat.users)}
                                    <Text
                                        bg='rgba(0, 0, 0,0.1)'
                                        boxShadow='0 4px 30px rgba(0, 0, 0, 1)'

                                    >
                                        <InfoModal user={GetSenderData(user, selectedChat.users)} />
                                    </Text>
                                </>
                            ) : <>
                                <IconButton
                                    display={{ base: 'flex', md: 'flex' }}
                                    height='100%'
                                    bg='rgba(0, 0, 0,0)'
                                    borderRadius='lg'
                                    icon={<ArrowBackIcon />}
                                    onClick={() => setSelectedChat("")}
                                ></IconButton>
                                {selectedChat.chatName}<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /></>}

                        </Text>


                    </Box>
                    <Box
                        display='flex'
                        flexDir='column'
                        justifyContent='flex-end'
                        padding='2rem'
                        bg='rgba(0, 0, 0,0.1)'
                        boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                        backdropFilter='blur(50px)'
                        border='1px solid rgba(0, 0, 0, 0.1)'
                        borderRadius='lg'
                        w='98%'
                        position='relative'
                        left='1%'
                        px={3}
                        h='100%'
                        overflowY='hidden'
                    >
                    </Box>

                </>
            ) :
                (
                    <Box
                        display='flex'
                        w='100%'
                        color='white'
                        justifyContent='center'
                        alignItems='center'
                        h='100%'
                    >
                        <Text
                            fontSize='3xl'
                            pb={3}
                        >
                            Click on a chat to start messaging
                        </Text>
                    </Box>
                )}
        </>
    );
}

export default SingleChat;
