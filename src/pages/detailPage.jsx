import Axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/homePage/footer";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteButton } from "../components/deleteItem";
import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const DetailPage = () => {
    const params = useParams();
    const username = useSelector((state) => state.user.value.username);
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const navigate = useNavigate();
    const getPagination = async (pageNum) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${pageNum}&size=8`, data);
            setData2(response.data.result);
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
    const getarticel = async (data) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`, data);
            setData(response.data[0]);
            setUser(response.data[0].User.username)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPagination()
        getarticel();
    }, []);
    return (
        <>
            <Navbar />
            <Flex justifyContent={"center"}>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Flex textAlign={"center"} justifyContent={"center"} mt={"100px"} rounded='md'
                            boxShadow='0px 0px 5px black' h={["70px", "100px", "100px", "100px", "100px", "100px"]}
                            bgGradient="linear(#408E91, #71B280)" w={["250px", "350px", "400px", "500px", "600px", "800px"]} >
                            <Heading display={"flex"} justifyContent={"center"} fontFamily={"monospace"} fontSize={["22px", "30px", "35px", "35px", "35px"]} color={"white"} lineHeight={["70px", "100px", "100px", "100px", "100px", "100px"]}>MyBlog | {data?.Category.name}</Heading> <br />
                        </Flex>
                    </Flex>

                    <Flex justifyContent={"center"} >
                        <Flex justifyContent={"center"} mt={"20px"} h={["120px", "500px"]} w={["200px", "500px", "800px"]} bg={"white"}>
                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`} >
                            </Image></Flex>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Flex w={["200px", "500px", "800px"]} textAlign={"center"} fontSize={["30px", "45px"]} fontWeight={"bold"} fontFamily={"monospace"} mt={"13px"} justifyContent={"center"}>
                            <Text>{data?.title}</Text>
                        </Flex>
                    </Flex>
                    <Flex fontSize={"15px"} fontFamily={"monospace"} mt={"0px"} justifyContent={"center"}>
                        <Text>by {data?.User.username} ‎</Text>
                        <Text>|</Text>
                        <Text color="black"> ‎ {new Date(`${data?.createdAt}`).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}.
                        </Text>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Box justifyContent={"center"}
                            px={"10px"} mt={"20px"}
                            rounded='md'
                            boxShadow='0px 0px 5px black'
                            bg={"white"}  >
                            <Flex mb={"10px"} mt={"10px"} maxW={["230px", "467px", "737px", "795px", "1200px"]} >
                                <p lineHeight={"100px"}>
                                    {data?.content}  </p>
                            </Flex>

                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Flex justifyContent={"center"} mb={"20px"} mt={"20px"}>
                {user === username ? <DeleteButton color="#FF4C29" /> : null}
                <Button _hover={{ transform: "scale(1.1)" }} color={"white"} bg={"teal"} mt={"11px"} size={"xs"}>
                    <CheckCircleIcon /> ‎ Like this article
                </Button>
            </Flex>
            <Flex>
                <Box
                    border={"1px solid gray"}
                    w={["full", "full"]} bg={"gray.200"}
                    pt={"10px"} mt={"22px"}>
                    <Flex justifyContent={"center"}>
                        <Heading fontSize={["20px", "30px"]} fontFamily={"mono"} color={"#71B280"}>Suggestion For You</Heading>
                    </Flex>
                    <Flex flexWrap={"wrap"} pb={"10px"}
                        justifyContent={"center"}>
                        {data2?.map((item, index) => {
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
            <Flex mb={"0px"} mt={"0px"}>
                <Footer />
            </Flex>
        </>
    );
}