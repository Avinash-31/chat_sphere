import React from 'react';
import { Container, Box, Text, Button, useTab, useMultiStyleConfig, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

const Home = () => {
    const CustomTabs = () => {
        const CustomTab = React.forwardRef((props, ref) => {
            // 1. Reuse the `useTab` hook
            const tabProps = useTab({ ...props, ref });
            const isSelected = !!tabProps['aria-selected'];

            // 2. Hook into the Tabs `size`, `variant`, props
            const styles = useMultiStyleConfig('Tabs', tabProps);

            return (
                <Button __css={styles.tab} {...tabProps}>
                    <Box as='span' mr='2'>
                        {isSelected ? '😎' : '😃'}
                    </Box>
                    {tabProps.children}
                </Button>
            );
        });

        // Additional logic for rendering tabs and handling state can be added here

        return (
            <Box>
                <Tabs align='center' isFitted variant='enclosed'>
                    <TabList>
                        <CustomTab className="authButton">Log-in</CustomTab>
                        <CustomTab className="authButton">Sign-Up</CustomTab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {/* login */}
                            <Login></Login>
                        </TabPanel>
                        <TabPanel>
                            {/* signup */}
                            <Signup></Signup>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        );
    };

    return (
        <Container maxW='xl' centerContent>
            <Box
                display="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="2rem" fontFamily="monoton">
                    Chat Sphere
                </Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" marginBottom='2rem'>
                {/* Render your custom tabs component */}
                <CustomTabs />
                {/* Add more content as needed */}
            </Box>
        </Container>
    );
};

export default Home;
