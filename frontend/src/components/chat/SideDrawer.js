import { Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Toast, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ChatLoading from '../chat/ChatLoading';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const history = useHistory();
    const toast = useToast();

    // logout
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    // search Handler
    const searchHandler = async () => {
        setLoading(true);
        // search user
        if (!search) {
            toast({
                title: "Please enter a name or email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            };

            const { data } = await axios.get(`/api/user/?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
        }
        setLoading(false);
    }

    // access chat function
    const accessChat = async (userId) => {
    };

    const { user } = ChatState();
    return <>
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            bg='white'
            w='100%'
            p='5px 10px'
            borderWidth='0.5rem'
        >
            <Tooltip label="Search users to chat" hasArrow placement='bottom'>
                <Button ref={btnRef} colorScheme='teal' onClick={onOpen} variant="ghost">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <Text d={{ base: "none", md: "flex" }} px={4} fontSize='1.5xl'>Search User</Text> {/* in small screens Search will not be visible */}
                </Button>
            </Tooltip>

            <Text fontSize='2xl' fontFamily='monoton'>
                Chat Sphere
            </Text>
            <div>
                <Menu>
                    <MenuButton p={2}>
                        <BellIcon fontSize='2xl' m={2} />
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size='sm' name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList>


                        <ProfileModal user={user} />


                        <MenuDivider />
                        <MenuItem width='100%' fontWeight='500' justifyContent='center' onClick={logoutHandler}>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Search users</DrawerHeader>

                <DrawerBody>
                    <Box display='flex' pb={2}>
                        <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button onClick={searchHandler}>Search</Button>
                    </Box>

                    { loading ? <ChatLoading /> :(
                            searchResult?.map(user => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )
                    }
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}

export default SideDrawer
