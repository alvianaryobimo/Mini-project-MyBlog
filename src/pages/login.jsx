import { Box, Flex, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { LoginbyUsername } from "../components/loginInput/byUsername";
import { LoginbyEmail } from "../components/loginInput/byEmail";
import { EmailIcon, PhoneIcon, AttachmentIcon } from '@chakra-ui/icons'
import { LoginbyPhone } from "../components/loginInput/byPhone";

export const Login = () => {

    return (
        <Box display={"flex"}
            justifyContent={"center"} h={"100vh"} w={"full"}
            bgGradient="linear(#408E91, #71B280)">
            <Box rounded='md'
                boxShadow='0px 0px 10px black'
                bg={"white"} margin={"auto"} w={["250px", "280px", "300px", "400px", "450px", "500px"]} h={"420px"}>
                <Text display={"flex"} justifyContent={"center"}
                    mt={"25px"} fontSize={"50px"} color={"#245953"}
                    fontWeight={"extrabold"} fontFamily={"monospace"} >
                    Login
                </Text>
                <Flex mt={"5px"} fontSize={["10px", "12px"]} justifyContent={"center"} >
                    <Text display={"flex"}>
                        Don't have an account?
                        <Link to="/signup">
                            <Text _hover={{ color: "#408E91" }} color={"#71B280"}>‎ Register here.</Text>
                        </Link>
                    </Text>
                </Flex>
                <Tabs mt={"10px"} align={"center"} variant='unstyled'>
                    <TabList>
                        <Tab><AttachmentIcon mt={"2px"} boxSize={5} /></Tab>
                        <Tab><EmailIcon mt={"2px"} boxSize={6} /></Tab>
                        <Tab><PhoneIcon mt={"1px"} /></Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel >
                            <LoginbyUsername />
                        </TabPanel>
                        <TabPanel>
                            <LoginbyEmail />
                        </TabPanel>
                        <TabPanel>
                            <LoginbyPhone />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}