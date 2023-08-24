import Axios from "axios";
import Carousel from "./carousel";
import { Avatar, Box, Flex, Image, Text, Button } from "@chakra-ui/react";
import { TabsBox } from "./tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"

export const Home = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();
    const getPagination = async (pageNum) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${pageNum}&size=8`, data);
            setData(response.data.result);
            setPage(response.data.blogPage);
            setTotalPage(response.data.page);
        } catch (err) {
            console.log(err);
        }
    }
    const goToPrevPage = () => {
        if (page > 1) getPagination(page - 1);
    }
    const goToNextPage = () => {
        if (page < totalPage) getPagination(page + 1);
    }
    const handleClick = (id) => {
        navigate(`detailPage/${id}`);
    }
    useEffect(() => {
        getPagination(page);
    }, []);
    return (
        <>
            <Box bg={"white"} pt={"95px"}>
                <Flex justifyContent={"center"} direction={["column", "column", "row"]} >
                    <Flex
                        justifyContent={"center"}
                        bg={"gray"}
                        border={"1px solid black"}
                        borderRadius={"10px"}
                        w={["full", "full", "500px", "850px"]} h={["250px", "504px"]}> <Carousel /></Flex>
                    <Flex justifyContent={"center"}>
                        <Flex justifyContent={"center"}
                            bg={"white"} mt={["20px", "0px"]}
                            border={"1px solid gray"} ml={["0p", "20px"]}
                            borderRadius={"10px"}
                            w={["full", "300px", "300px", "300px"]} h={"504px"}><TabsBox /></Flex>
                    </Flex>
                </Flex>
            </Box>
            <Flex bg={"white"} justifyContent={"center"} mb={"30px"}>
                <Box
                    border={"1px solid gray"}
                    borderRadius={"10px"}
                    w={["full", "1170px"]} bg={"gray.200"}
                    pt={"10px"} mt={"22px"}>
                    <Flex flexWrap={"wrap"} pb={"10px"}
                        justifyContent={"center"}>
                        {data?.map((item, index) => {
                            return (
                                <>
                                    <Box key={index} onClick={() => handleClick(item.id)}
                                        _hover={{ transform: "scale(1.1)" }}
                                        bg={"white"}
                                        w={["150px", "170px", "250px"]} h={["200px", "220px"]}
                                        my={"10px"} mx={"10px"}
                                        border={"3px solid #408E91"}
                                        borderRadius={"5px"}
                                        boxShadow='0px 0px1 px'>
                                        <Flex justifyContent={"center"}>
                                            <Flex justifyContent={"center"} bg={"white"}
                                                border={"3px solid #408E91"}
                                                borderRadius={"10px"} mt={"16px"} mx={["auto"]}
                                                w={["120px", "150px", "200px"]} h={["80px", "100px"]} >
                                                <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} ></Image>
                                            </Flex>
                                        </Flex>
                                        <Text mt={"3px"}
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                            maxWidth={["130px", "195px"]}
                                            ml={["12px", "15px", "28px"]} fontSize={"20px"} fontFamily={"monospace"} color={"black"}>
                                            {item.title}
                                        </Text>
                                        <Flex mt={["12px", "6px"]} ml={["10px", "10px", "20px"]} >
                                            <Avatar src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`} size={["sm", "md"]} mt={["8px", '0px']} />
                                            <Box mt={"3px"}>
                                                <Text
                                                    overflow="hidden"
                                                    whiteSpace="nowrap"
                                                    textOverflow="ellipsis"
                                                    maxWidth={["80px", "100px", "165px"]}
                                                    ml={"10px"} fontSize={"14px"} fontFamily={"monospace"} color={"black"}
                                                >
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
                    <Flex justifyContent={"center"} my="10px">
                        <Button bgColor="#408E91" color="white" onClick={goToPrevPage} disabled={page === 1}><ArrowBackIcon /></Button>
                        <Button mx="5px" disabled bgColor="#408E91" color="white">{page}</Button>
                        <Button onClick={goToNextPage} disabled={page === totalPage} bgColor="#408E91" color="white"><ArrowForwardIcon /></Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}