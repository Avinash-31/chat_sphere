import { ModalOverlay, useDisclosure, ModalBody, Button, Modal, ModalContent, ModalHeader, ModalCloseButton, Text, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react';

const ProfileModel = ({user,children}) => {
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    return (
        <>
            <Button 
                width='100%'
                backgroundColor='white'
                onClick={() => {
                    setOverlay(<OverlayOne />)
                    onOpen()
                }}
            >
                Profile
            </Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Custom backdrop filters!</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default ProfileModel;
