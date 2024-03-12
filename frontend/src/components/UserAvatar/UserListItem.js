import React from 'react'
import { ChatState } from '../../context/ChatProvider';
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({ user,handleFunction }) => {
    if(!user) return (
        <div>
            <Text>No user found</Text>
        </div>
    );
    return (
        <div>
            <Box
                onClick={handleFunction}
                cursor="pointer"
                bg="white"
                _hover={{
                    background: "grey",
                    color: "white"
                }}
                w="100%"
                display="flex"
                px={3}
                py={2}
                mb={2}
                borderRadius="lg"
            >
                <Avatar
                    mr={2}
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                />
                <Box>
                    <Text>{user.name}</Text>
                    <Text fontSize="xs">
                        {user.email}
                    </Text>
                </Box>
            </Box>
        </div>
    )
}

export default UserListItem
