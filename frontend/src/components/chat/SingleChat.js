import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { GetSender, GetSenderData } from '../../config/ChatLogic'; // Modified import statement
import InfoModal from './InfoModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessage] = useState([]);  // for stpring the fetched chats
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();

    const sendMessage = (e) => { };
    const typingHandler = (e) => { };
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
                                    color='white'
                                    _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
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
                        color='white'
                        overflowY='hidden'
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    size='xl'
                                    thickness='3px'
                                    speed='0.65s'
                                    emptyColor='rgba(0,0,0,0.5)'
                                    color='grey.200'
                                    backdropFilter='blur(25px)'
                                    alignSelf='center'
                                    margin='auto' />
                            </>
                        ) : (
                            <>
                                <Text></Text>

                            </>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired marginTop='1rem'>
                            <Input
                                variant='filled'
                                bg='rgba(0, 0, 0,0.1)'
                                boxShadow='0 4px 30px rgba(0, 0, 0, 1)'
                                backdropFilter='blur(25px)'
                                border='1px solid rgba(0, 0, 0, 0.1)'
                                position='relative'
                                top='1rem'
                                placeholder='Enter a message to send'
                                onChange={typingHandler}
                                value={newMessage}
                                _hover={{ bg: 'rgba(0, 0, 0,0.5)' }}
                                _focus={{ bg: 'rgba(0, 0, 0,1)' }}
                                _focusVisible={{
                                    outline: "none",
                                }}
                            ></Input>
                        </FormControl>
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
