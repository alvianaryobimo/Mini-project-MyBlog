import Axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/homePage/footer";
import { useParams } from "react-router-dom";
import { DeleteButton } from "../components/deleteItem";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

export const DetailPage = () => {
    const params = useParams();
    const [data, setData] = useState();
    const getarticel = async (data) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`, data);
            setData(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
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
                            bgGradient="linear(#408E91, #71B280)" w={["230px", "300px", "400px", "500px", "600px", "800px"]} >
                            <Heading display={"flex"} justifyContent={"center"} fontFamily={"monospace"} fontSize={["22px", "30px", "35px", "35px", "35px"]} color={"white"} lineHeight={["70px", "100px", "100px", "100px", "100px", "100px"]}>MyBlog | {data?.Category.name}</Heading> <br />
                        </Flex>
                    </Flex>

                    <Flex justifyContent={"center"} >
                        <Flex justifyContent={"center"} mt={"20px"} h={"250px"} w={["200px", "500px", "800px"]} bg={"white"}>
                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`} >
                            </Image></Flex>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Flex w={["200px", "500px", "800px"]} textAlign={"center"} fontSize={"45px"} fontWeight={"bold"} fontFamily={"monospace"} mt={"13px"} justifyContent={"center"}>
                            <Text>{data?.title}</Text>
                        </Flex>
                    </Flex>
                    <Flex fontSize={"15px"} fontFamily={"monospace"} mt={"0px"} justifyContent={"center"}>

                        <Text>by {data?.User.username}</Text>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Box justifyContent={"center"}
                            pl={"10px"} mt={"20px"}
                            rounded='md'
                            boxShadow='0px 0px 5px black'
                            bg={"white"} w={["200px", "350px", "500px", "700px", "1000px", "1200px"]} >
                            <Flex mb={"10px"} mt={"10px"} w={["200px", "350px", "500px", "700px", "1000px", "1200px"]} >
                                <p lineHeight={"100px"}>
                                    {data?.content}  </p>
                            </Flex>

                        </Box>
                    </Flex>
                </Box>
            </Flex>
            <Flex mt={"30px"}>
                <DeleteButton />
                <Button _hover={{ transform: "scale(1.1)" }} color={"white"} bg={"teal"} mt={"12px"} mr={"10px"} size={"xs"}>
                    <CheckCircleIcon /> ‎ Like this article
                </Button>
            </Flex>
            <Box mt={"10px"}>
                <Footer />
            </Box>
        </>
    );
}