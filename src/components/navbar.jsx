import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Text, Avatar, IconButton, useToast, Box, Divider } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, } from '@chakra-ui/react'
import { AiOutlineHome } from 'react-icons/ai';
import { useSelector } from "react-redux";

export const Navbar = () => {
    const data = useSelector((state) => state.user.value);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useToast();
    const onLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
        toast({
            title: "Logged Out!",
            description: "See you again!",
            status: 'error',
            duration: 2500,
            position: "top"
        });
    }
    return (
        <Flex
            zIndex={"999"}
            mt={"0px"}
            position={"fixed"}
            bgGradient="linear(#71B280, #408E91)"
            w={"full"}
            h={"70px"}
            justifyContent={"space-between"}
            boxShadow={"0px 0px 10px black"}>
            <Link to="/">
                <Heading fontSize={["25px", "32px"]} cursor={"pointer"} fontFamily={"monospace"} color={"white"} lineHeight={"70px"} ml={"15px"}>
                    MyBlog
                </Heading>
            </Link>
            <Flex mr={"10px"} fontFamily={"mono"} color={"white"}>

                <Text _hover={{ transform: "scale(1.2)" }} mr={["17px", "18px"]} my={"auto"}>
                    <Link to="/" ><AiOutlineHome size={19} /></Link>
                </Text>
                <Text _hover={{ transform: "scale(1.2)" }} mr={["18px", "20px"]} my={"auto"}>
                    <Link to="/search"><SearchIcon /></Link>
                </Text>
                {token ?
                    (
                        <>
                            <Avatar size={["sm", "md"]} mr={["2px", "7px", "7px"]} mt={["20px", "11px"]} />
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                    variant={"unstyled"}
                                    color="white"
                                    margin={"auto"}
                                    _hover={{ transform: "scale(1.2)" }}
                                />
                                <MenuList borderColor={"white"} bgColor="#71B280">
                                    <MenuItem bgColor="#71B280" color="white" cursor="pointer">
                                        <Box>
                                            <Text fontWeight={"bold"}>{data.username}</Text>
                                            <Text fontWeight={"bold"} fontSize={"10px"}>{data.email}</Text>
                                        </Box>
                                    </MenuItem>
                                    <Divider color="white" />
                                    <MenuItem as={Link} to={"/profile"} _hover={{ bgColor: "#408E91" }} bgColor="#71B280" color="white" cursor="pointer">Profile & Settings</MenuItem>
                                    <MenuItem as={Link} to={"/myblog"} _hover={{ bgColor: "#408E91" }} bgColor="#71B280" color="white" cursor="pointer">MyBlog</MenuItem>
                                    <MenuItem _hover={{ bgColor: "#408E91" }} bgColor="#71B280" color="white" cursor="pointer" >MyLiked</MenuItem>
                                    <MenuItem onClick={onLogout} _hover={{ bgColor: "#408E91" }} bgColor="#71B280" color="red" cursor="pointer" >Log Out</MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button
                                    mr={"10px"}
                                    mt={"18px"}
                                    size={"sm"}
                                    bg={"#D8D8D8"}
                                    color={"#245953"}
                                    boxShadow={"0px 0px 10px black"}
                                    _hover={{ bgColor: "grey" }}>
                                    Login
                                </Button>
                            </Link>
                        </>
                    )}
            </Flex>
        </Flex >
    );
}