import { Flex, Button, Heading, Box, Image, Text, Avatar } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";
// import { Footer } from "../components/homePage/footer";  

export const Myblog = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");

    const [blog, setBlog] = useState();
    const getMyBlog = async () => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setBlog(response.data.result)
            console.log(response.data.result);
        } catch (err) {
            console.log(err.response.data);
        }
    }
    const handleClick = (id) => {
        navigate(`/`)
        navigate(`detailPage/${id}`);
        window.location.reload()

    }
    useEffect(() => {
        getMyBlog();
    },);
    return (
        <>
            <Flex>
                <Navbar />
            </Flex>
            <Flex mt={"80px"} justifyContent={"center"}>
                <Heading color={"#408E91"} fontSize={"50px"} fontFamily={"monospace"} >
                    My Blog
                </Heading>
            </Flex>
            <Flex mb={"20px"} mt={"20px"} justifyContent={"center"}>
                <Link to="/addBlog">
                    <Button type="submit" fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"550px"}>
                        Create your own Blog
                    </Button>
                </Link>
            </Flex>
            <Flex flexWrap={"wrap"} justifyContent={"center"}>
                {blog?.map((item, index) => {
                    return (
                        <>
                            <Box mb={"20px"} onClick={() => handleClick(item.id)} key={index} bgGradient="linear(#71B280, #408E91)"
                                border={"2px solid"}
                                mt={"20px"}
                                ml={"20px"} mr={"20px"}
                                borderRadius={"5px"}
                                boxShadow='0px 0px 2px '
                                w={"350px"} h={"300px"}>
                                <Flex justifyContent={"center"} bg={"white"}
                                    border={"3px solid #408E91"}
                                    borderRadius={"10px"} mt={"20px"} ml={"9px"}
                                    w={"330px"} h={"150px"} >
                                    <Image src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} ></Image>
                                </Flex>
                                <Text ml={"20px"} fontSize={"25px"} fontFamily={"monospace"} color={"white"}>
                                    {item.title}
                                </Text>
                                <Flex mt={"8px"} ml={"12px"}>
                                    <Avatar size={"lg"} mt={'4px'} />
                                    <Box mt={"9px"}>
                                        <Text ml={"10px"} fontSize={"20px"} fontFamily={"monospace"} color={"white"}>
                                            by {item.User.username}
                                        </Text>
                                        <Text ml={"10px"} fontSize={"15px"} fontFamily={"monospace"} color={"white"}>
                                            {item.Category.name}
                                        </Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </>
                    );
                })}
            </Flex>
            {/* <Box mt={"40px"}>
                <Footer />
            </Box> */}
        </>
    );
}