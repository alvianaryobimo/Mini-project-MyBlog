import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import Carousel from "./carousel";
import { TabsBox } from "./tabs";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [data, setData] = useState();
    const navigate = useNavigate();
    const getPagination = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog", data);
            setData(response.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = (id) => {
        navigate(`detailPage/${id}`);
    }

    useEffect(() => {
        getPagination();
    }, [])
    return (
        <Box bg={"white"} pt={"90px"}>
            <Flex ml={"48px"}>
                <Flex
                    bg={"gray"}
                    border={"1px solid gray"}
                    borderRadius={"10px"}
                    boxShadow='0px 0px 6px black'
                    w={"850px"} h={"504px"}> <Carousel /></Flex>
                <Flex
                    bg={"white"}
                    border={"1px solid gray"} ml={"20px"}
                    borderRadius={"10px"}
                    boxShadow='0px 0px 6px black'
                    w={"300px"} h={"504px"}><TabsBox /></Flex>
            </Flex>
            <Flex justifyContent={"center"} mb={"30px"}>
                <Flex flexWrap={"wrap"} pb={"10px"}
                    boxShadow='0px 0px 6px black'
                    borderRadius={"10px"}
                    w={"1170px"} bg={"gray.200"}
                    pt={"10px"} mt={"22px"} mr={"3px"}
                    justifyContent={"center"}>
                    {data?.map((item) => {
                        return (
                            <>
                                <Box onClick={() => handleClick(item.id)}
                                    mb={"10px"} bg={"white"} 
                                    mt={"8px"} border={"3px solid #408E91"}
                                    ml={"8px"} mr={"10px"}
                                    borderRadius={"5px"}
                                    boxShadow='0px 0px 2px '
                                    w={"250px"} h={"220px"}>
                                    <Flex justifyContent={"center"} bg={"white"}
                                        border={"3px solid #408E91"}
                                        borderRadius={"10px"} mt={"16px"} ml={"22px"}
                                        w={"200px"} h={"100px"} >
                                        <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} ></Image>
                                    </Flex>
                                    <Text mt={"3px"}
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                        maxWidth="190px"
                                        ml={"28px"} fontSize={"20px"} fontFamily={"monospace"} color={"black"}>
                                        {item.title}
                                    </Text>
                                    <Flex mt={"6px"} ml={"20px"}>
                                        <Avatar size={"md"} mt={'0px'} />
                                        <Box mt={"3px"}>
                                            <Text ml={"10px"} fontSize={"14px"} fontFamily={"monospace"} color={"black"}>
                                                by {item.User.username}
                                            </Text>
                                            <Text ml={"10px"} fontSize={"12px"} fontFamily={"monospace"} color={"black"}>
                                                {item.Category.name}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Box>
                            </>
                        );
                    })}
                </Flex>
            </Flex>
        </Box>
    );
}