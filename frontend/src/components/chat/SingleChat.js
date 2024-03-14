import React from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon, SettingsIcon } from '@chakra-ui/icons';
import { GetSender, GetSenderData } from '../../config/ChatLogic'; // Modified import statement
import InfoModal from './InfoModal';

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
                        <IconButton
                            display={{ base: 'flex', md: 'flex' }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        ></IconButton>
                        <Text>
                            {!selectedChat.isGroupChat ? (
                                <>
                                    {user && GetSender(user, selectedChat.users)}
                                </>
                            ) : selectedChat.chatName}
                        </Text>
                        <Text>
                            <InfoModal user={GetSenderData(user, selectedChat.users)} />
                        </Text>

                    </Box>
                    <Box 
                    display='block'
                    >
                        wefd
                    </Box>

                </>
            ) :
                (
                    <Box
                        display='flex'
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
