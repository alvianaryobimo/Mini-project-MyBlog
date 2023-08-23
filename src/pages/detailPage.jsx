import Axios from "axios";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/homePage/footer";
import { useParams } from "react-router-dom";
import { DeleteButton } from "../components/deleteItem";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const DetailPage = () => {
    const params = useParams();
    const username = useSelector((state) => state.user.value.username)
    const [data, setData] = useState();
    const [user, setUser] = useState()
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
            <Flex mb={"0px"} mt={"10px"}>
                <Footer />
            </Flex>
        </>
    );
}