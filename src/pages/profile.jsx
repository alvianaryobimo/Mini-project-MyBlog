import { Box, Flex, Button, Text, Heading, Input } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UsernameEdit } from "../components/profile/usernameEdit";
import { Navbar } from "../components/navbar";
import { EmailEdit } from "../components/profile/emaiEdit";
import { PhoneEdit } from "../components/profile/phoneEdit";
import { PasswordEdit } from "../components/profile/passEdit";
import { AddIcon } from "@chakra-ui/icons";

export const Profile = () => {
    const data = useSelector((state) => state.user.value);
    const navigate = useNavigate();
    const onLogout = () => {
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate("/");
        }, 1000);
    }
    return (
        <>
            <Box >
                <Navbar />
                <Flex justifyContent={"center"}>
                    <Flex mt={"135px"} borderRadius={"10px"}
                        boxShadow='0px 0px 6px black' bgGradient="linear(#408E91, #71B280)" w={"800px"} h={"450px"}>
                        <Box ml={"37px"} mt={"48px"} borderRadius={"10px"}
                            boxShadow='0px 0px 6px black' bg={"white"} w={"300px"} h={"350px"}>
                            <Flex justifyContent={"center"} >
                                <Box mt={"35px"} boxShadow={"0px 0px 4px black"} borderRadius={"50%"} bg={"grey"} w={"150px"} h={"150px"}>
                                </Box>
                            </Flex>
                            <Flex
                                mt={"-23px"}
                                ml={"75px"}
                                justifyContent={"center"}>
                                <label htmlFor="customFileInput">
                                    <Text
                                        fontSize={"10px"}
                                        as="span"
                                        bg="green.500"
                                        color="white"
                                        px={"7px"}
                                        pb={"5px"}
                                        pt={"4px"}
                                        borderRadius="md"
                                        cursor="pointer"
                                        _hover={{ bg: 'green.600' }}>
                                        <AddIcon />
                                    </Text>
                                </label>
                                <input
                                    type="file"
                                    id="customFileInput"
                                    style={{ display: 'none' }} />
                            </Flex>
                            <Flex mt={"15px"} justifyContent={"center"}>
                                <Heading fontSize={"25px"} fontWeight={"extrabold"} fontFamily={"monospace"}>
                                    {data.username}
                                </Heading>
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Text fontFamily={"monospace"}>
                                    {data.email}
                                </Text>
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Text fontFamily={"monospace"}>
                                    +62 {data.phone}
                                </Text>
                            </Flex>
                            <Flex justifyContent={"center"}>
                                <Button
                                    onClick={onLogout}
                                    w={"200px"}
                                    mt={"8px"}
                                    size={"sm"}
                                    bg={"#D8D8D8"}
                                    color={"white"}
                                    boxShadow={"0px 0px 2px black"}
                                    bgGradient="linear(#408E91, #71B280)"
                                    _hover={{ bgColor: "grey" }}>
                                    Log Out
                                </Button>
                            </Flex>
                        </Box>
                        <Box mt={"45px"} ml={"40px"} borderRadius={"6px"} bgColor={"white"} w={"380px"} h={"353px"}>
                            <Tabs align='center' isFitted variant='enclosed' colorScheme="green">
                                <TabList borderTop={"20px"} >
                                    <Tab >Username</Tab>
                                    <Tab>Email</Tab>
                                    <Tab>Password</Tab>
                                    <Tab>Phone</Tab>
                                </TabList>
                                <TabIndicator
                                    height="2px"
                                    bg="green"
                                    borderRadius="1px"
                                />
                                <TabPanels>
                                    <TabPanel>
                                        <UsernameEdit />
                                    </TabPanel>
                                    <TabPanel>
                                        <EmailEdit />
                                    </TabPanel>
                                    <TabPanel>
                                        <PasswordEdit />
                                    </TabPanel>
                                    <TabPanel>
                                        <PhoneEdit />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>

                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}