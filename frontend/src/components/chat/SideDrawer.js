import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'
import {ChatState} from '../../context/ChatProvider';
import ProfileModel from './ProfileModel';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const {user} = ChatState();
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
                <Button variant="ghost">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <Text d={{base:"none", md:"flex"}} px={4} fontSize='1.5xl'>Search User</Text> {/* in small screens Search will not be visible */}
                </Button>
            </Tooltip>
            
            <Text fontSize='2xl' fontFamily='monoton'>
                Chat Sphere
            </Text>
            <div>
                <Menu>
                    <MenuButton p = {2}>
                        <BellIcon fontSize = '2xl' m={2}/>
                    </MenuButton>
                {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                        <Avatar size='sm' name={user.name} src={user.pic}/>
                    </MenuButton>
                    <MenuList>
                        
                        <enuItem>
                            <ProfileModel user={user}/>
                        </enuItem>
                        
                        <MenuDivider/>
                        <MenuItem width='100%' fontWeight='500' justifyContent='center'>LogOut</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box>
    </>
}

export default SideDrawer
