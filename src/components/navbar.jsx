import { Button, Flex, Heading, Text, Avatar } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

export const Navbar = () => {
    const token = localStorage.getItem("token");
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
                <Heading cursor={"pointer"} fontFamily={"monospace"} color={"white"} mt={"12px"} ml={"15px"}>
                    MyBlog
                </Heading>
                {/* <FontAwesomeIcon icon="fa-brands fa-instagram" /> */}
            </Link>
            <Flex mr={"10px"} fontFamily={"mono"} color={"white"}>

                <Text mr={"20px"} mt={"24px"}>
                    <Link to="/" >Home</Link>
                </Text>
                <Text mr={"20px"} mt={"24px"}>
                    <Link to="/"><SearchIcon></SearchIcon></Link>
                </Text>
                {token ?
                    (
                        <>
                            <Text mr={"20px"} mt={"24px"}>
                                <Link to="/myBlog">MyBlog</Link>
                            </Text>
                            <Link to="/profile">
                                <Avatar mr={"7px"} mt={"11px"} />
                                {/* <Text fontWeight={"extrabold"} ml={"7px"} mt={"15px"} color={"white"}> {data.username} </Text> */}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/loginbyEmail">
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

        </Flex>
    );
}