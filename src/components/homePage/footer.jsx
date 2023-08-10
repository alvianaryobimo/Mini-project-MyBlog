import { Flex, Text, Box, Input, Button } from "@chakra-ui/react";
import { FaFacebook } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';

export const Footer = () => {
    return (
        <Flex display={"flex"} justifyContent={"space-between"}
            pt={"20px"} w={"full"} h={"260px"}
            boxShadow={"0px 0px 10px black"}
            bgGradient="linear(#408E91, #71B280)">
            <Box>
                <Box ml={"20px"}>
                    <Text fontSize={"20px"} fontFamily={"monospace"} fontWeight={"extrabold"} >
                        News Letter
                    </Text>
                    <Text mt={"8px"}>
                        Lorem ipsum dolor sit amet <br />
                        consectetur adipisicing elit. Nulla <br />
                        praesentium exercitationem magni <br />
                        placeat reprehenderit, illo animi <br />
                    </Text>
                    <Input borderRadius={"20px"} border={"2px solid"}
                        borderColor={"white"} w={"300px"} mt={"15px"}
                        placeholder="Your Email Addres" size={"md"} /> <br />
                    <Button
                        ml={"1px"}
                        mt={"15px"}
                        size={"sm"}
                        bg={"transparent"}
                        color={"white"}
                        border={"1px solid white"}
                        borderRadius={"50px"}
                        _hover={{ bgColor: "grey" }}>
                        Submit
                    </Button>
                </Box>
            </Box>
            <Text mr={"20px"} fontSize={"20px"} fontFamily={"monospace"} fontWeight={"extrabold"} >
                Follow & Contact Us
                <Flex mt={"20px"} justifyContent={"center"}>
                    <Flex mr={"10px"}>
                        <a href="https://www.linkedin.com">
                            <SiLinkedin />
                        </a>
                    </Flex >
                    <Flex>
                        <a href="https://www.facebook.com/">
                            <FaFacebook />
                        </a>
                    </Flex>
                </Flex>
            </Text>

        </Flex>
    );
}