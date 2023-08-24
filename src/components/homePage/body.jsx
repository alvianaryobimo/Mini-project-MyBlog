import Axios from "axios";
import Carousel from "./carousel";
import { TabsBox } from "./tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Flex, Image, Text, Button } from "@chakra-ui/react";
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
    const goToPrevPage = () => { if (page > 1) getPagination(page - 1); }
    const goToNextPage = () => { if (page < totalPage) getPagination(page + 1); }
    const handleClick = (id) => { navigate(`detailPage/${id}`); }
    useEffect(() => {
        getPagination(page);
    }, []);

    return (
        <>
            <Flex bg={"white"} pt={"95px"} direction={["column", "column", "row"]} justifyContent={"center"} >
                <Flex justifyContent={"center"} bg={"gray"} border={"1px solid black"} borderRadius={"10px"}
                    w={["full", "full", "500px", "600px", "850px"]} h={["250px", "504px"]}> <Carousel /></Flex>
                <Flex justifyContent={"center"}>
                    <Flex justifyContent={"center"}
                        bg={"white"} mt={["20px", "0px"]} ml={["0p", "20px"]}
                        border={"1px solid gray"} borderRadius={"10px"}
                        w={["full", "300px", "300px", "300px"]} h={"504px"}><TabsBox /></Flex>
                </Flex>
            </Flex>
            <Flex bg={"white"} mb={"30px"} justifyContent={"center"}>
                <Box border={"1px solid gray"} borderRadius={"10px"}
                    w={["full", "1170px"]} bg={"gray.200"}
                    pt={"10px"} mt={"22px"}>
                    <Flex flexWrap={"wrap"} pb={"10px"}
                        justifyContent={"center"}>
                        {data?.map((item, index) => {
                            return (
                                <>
                                    <Box key={index} onClick={() => handleClick(item.id)}
                                        w={["150px", "170px", "250px"]} h={["200px", "220px"]}
                                        bg={"white"} my={"10px"} mx={"10px"}
                                        border={"3px solid #408E91"} borderRadius={"5px"} boxShadow='0px 0px 1px'
                                        _hover={{ transform: "scale(1.1)" }} >
                                        <Flex justifyContent={"center"} bg={"white"}
                                            border={"3px solid #408E91"} borderRadius={"10px"}
                                            mt={"16px"} mx={["auto"]}
                                            w={["120px", "150px", "200px"]} h={["80px", "100px"]} >
                                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} ></Image>
                                        </Flex>
                                        <Text
                                            overflow="hidden" whiteSpace="nowrap"
                                            textOverflow="ellipsis" maxWidth={["130px", "195px"]}
                                            mt={"3px"} ml={["12px", "15px", "28px"]}
                                            fontSize={"20px"} fontFamily={"monospace"} color={"black"}>
                                            {item.title}
                                        </Text>
                                        <Flex mt={["12px", "6px"]} ml={["10px", "10px", "20px"]}>
                                            <Avatar mt={["8px", '0px']} size={["sm", "md"]} src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`} />
                                            <Box mt={"3px"}>
                                                <Text
                                                    overflow="hidden" whiteSpace="nowrap"
                                                    textOverflow="ellipsis" maxWidth={["80px", "100px", "165px"]}
                                                    ml={"10px"} fontSize={"14px"} fontFamily={"monospace"} color={"black"} >
                                                    by {item.User.username}   </Text>
                                                <Text ml={"10px"} fontSize={"12px"} fontFamily={"monospace"} color={"black"}>{item.Category.name}</Text>
                                            </Box>
                                        </Flex>
                                    </Box>
                                </>
                            );
                        })}
                    </Flex>
                    <Flex pb={"15px"} my="10px" justifyContent={"center"}>
                        <Button onClick={goToPrevPage} disabled={page === 1} bgColor="#408E91" color="white"><ArrowBackIcon /></Button>
                        <Button disabled mx="5px" bgColor="#408E91" color="white">{page}</Button>
                        <Button onClick={goToNextPage} disabled={page === totalPage} bgColor="#408E91" color="white"><ArrowForwardIcon /></Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}