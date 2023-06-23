import { Avatar, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Text, Flex, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

export const TabsBox = () => {

    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const navigate = useNavigate();
    const getData = async (data) => {
        try {
            const response1 = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog", data);
            setData1(response1.data.result);
            const response2 = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/pagFav", data);
            setData2(response2.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    
    const handleClick = (id) => {
        navigate(`detailPage/${id}`);
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <Tabs isFitted w={"500px"} position="relative" variant="unstyled">
            <TabList
                borderBottom={"1px solid black"}
                borderTopRadius={"9px"}
                bgGradient="linear(#408E91, #71B280)"
                fontFamily={"monospace"}>
                <Tab>Popular</Tab>
                <Tab>Recently</Tab>
            </TabList>
            <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="black"
                borderRadius="10px"
            />
            <TabPanels cursor={"pointer"} maxH={"462px"} overflowY={"scroll"}>
                <TabPanel mt={"-18px"}>
                    {data2?.map((item) => {
                        return (
                            <>
                                <Flex borderBottom={"1px"} onClick={() => handleClick(item.id)} mt={"13px"} >
                                    <Avatar mt={'4px'} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                                    <Box>
                                        <Text
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                            maxWidth="200px"
                                            ml={"5px"} w={"full"} fontSize={"20px"} fontFamily={"monospace"}>{item.title}</Text>
                                        <Text  mb={"13px"} ml={"5px"}>{item.User.username}</Text>
                                    </Box>
                                </Flex>
                            </>
                        );
                    })}
                </TabPanel>
                <TabPanel mt={"-18px"}>
                    {data1?.map((item) => {
                        return (
                            <>
                                <Flex borderBottom={"1px"} onClick={() => handleClick(item.id)} mt={"13px"} >
                                    <Avatar mt={'4px'} src={`https://minpro-blog.purwadhikabootcamp.com/${item.imageURL}`} />
                                    <Box>
                                        <Text
                                            overflow="hidden"
                                            whiteSpace="nowrap"
                                            textOverflow="ellipsis"
                                            maxWidth="200px"
                                            cursor={"pointer"} ml={"5px"} w={"full"} fontSize={"20px"} fontFamily={"monospace"}>{item.title}</Text>
                                        <Text mb={"13px"} ml={"5px"}>{item.User.username}</Text>
                                    </Box>
                                </Flex>
                            </>
                        );
                    })}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}