import React, { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { GetSender, GetSenderData } from '../../config/ChatLogic'; // Modified import statement
import InfoModal from './InfoModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import '../../styles/messages.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = useState([]);  // for stpring the fetched chats
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnection, setSocketConnection] = useState(false);

    const toast = useToast();


   

    const fetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };
            setLoading(true);
            // console.log("Fetch MEssages");
            const { data } = await axios.get(
                `/api/message/${selectedChat._id}`,
                config
            );
            console.log(messages);
            setMessages(data);
            setLoading(false);
            socket.emit("joinChat", selectedChat._id);
        } catch (error) {
            toast({
                title: "Error in fetching the messages",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
        }
    };




    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            // Send the message
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    },
                };
                setNewMessage(""); // since it is an asynchrounous function so newMessage wont be changed
                const { data } = await axios.post('/api/message',
                    { content: newMessage, chatId: selectedChat }, config);
                console.log(data);
                socket.emit("newMessage", data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error in sending the message",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top"
                })
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnection(true));
    }, [])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    useEffect(() => {
        socket.on("messageReceived", (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // give notification
            }
            else {
                setMessages([...messages, newMessageRecieved]);
            }
        })
    })

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // Typing indicator
    };
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
                                {selectedChat.chatName}<UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages} /></>}

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
                                <div className='messages'>
                                    <ScrollableChat messages={messages}></ScrollableChat>
                                </div>
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
