import Axios from "axios"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/homePage/footer"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Image, Input, Menu, MenuButton, MenuItem, MenuList, Select, Text } from "@chakra-ui/react"

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sorting, setSorting] = useState("DESC");
    const [totalPage, setTotalPage] = useState(null);
    const [page, setPage] = useState(null);
    const [reload, setReload] = useState(true)
    const navigate = useNavigate()
    const fetchCategories = async () => {
        try {
            const response = await Axios.get('https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory');
            setCategories(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleSearch = async (page) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog?id_cat=${selectedCategory}&sort=${sorting}&size=12&page=${page}`, {
                params: {
                    search: searchTerm,
                },
            });
            setSearchResults(response.data.result);
            setPage(response.data.blogPage)
            setTotalPage(response.data.page)
        } catch (err) {
            console.log(err);
        }
    };
    // const handleLatest = () => {
    //     setSorting("DESC")
    // }
    // const handleEarliest = () => {
    //     setSorting("ASC")
    // }
    const goToPrevPage = () => {
        if (page > 1) {
            handleSearch(page - 1);
            setReload(!reload);
        }
    }
    const goToNextPage = () => {
        if (page < totalPage) {
            handleSearch(page + 1);
            setReload(!reload);
        }
    }
    // const handleInputChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };
    // const handleCategoryChange = (event) => {
    //     setSelectedCategory(event.target.value);
    // };
    const onClick = (id) => {
        navigate(`/detailPage/${id}`)
    }
    useEffect(() => {
        handleSearch();
        fetchCategories();
    }, [reload, sorting, searchTerm]);
    return (
        <>
            <Flex mt={"0px"}>
                <Navbar />
            </Flex>
            <Flex justifyContent="center" bgColor="whiite">
                <Box>
                    <Box mt={"90px"} className="search-section" bgGradient="linear(#408E91, #71B280)" w="570px" p="15px" borderRadius="10px" boxShadow={"0px 0px 7px black"}>
                        <FormControl>
                            <FormLabel color="white">Search</FormLabel>
                            <Input color="white" type="search" value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                borderColor="white" placeholder="Search..." _placeholder={{ color: "white" }} />
                            <Select color="white" value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                mt="10px" borderColor="white" focusBorderColor="white" placeholder="Category" _placeholder={{ bgColor: "#334756" }}>
                                <option style={{ backgroundColor: "#408E91" }} value="">All</option>
                                {categories?.map((category) => (
                                    <option style={{ backgroundColor: "#408E91" }} key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                            {/* <Button mt={5} onClick={handleSearch} bgColor="#408E91" color="white" _hover={{ transform: "scale(1.1)" }}>
                                Search
                            </Button> */}
                        </FormControl>
                    </Box>
                    <Box mb={"20px"} className="search-content" bgGradient="linear(#71B280, #408E91)"
                        w="1115px" mt="20px" p="10px 20px" borderRadius="10px" boxShadow={"0px 0px 7px black"}>
                        <Flex justifyContent="space-between">
                            <Heading mt={"10px"} ml={"10px"} color="white" fontSize="18px">Here are your search results</Heading>
                            <Menu>
                                <MenuButton >
                                    <Button bgColor="#408E91" color="white" h="20px" mt={"10px"} mr={"10px"}>Sort</Button>
                                </MenuButton>
                                <MenuList bgColor="#408E91">
                                    <MenuItem _hover={{ bgColor: "#71B280" }} bgColor="#408E91" color="white" cursor="pointer"
                                    // onClick={handleEarliest}
                                    >Earliest</MenuItem>
                                    <Divider color="gray.900" />
                                    <MenuItem _hover={{ bgColor: "#71B280" }} bgColor="#408E91" color="white" cursor="pointer"
                                    // onClick={handleLatest}
                                    >Latest</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                        <Flex mt={"10px"} justifyContent={"center"} flexWrap={"wrap"}>
                            {searchResults?.map((item, index) => {
                                return (
                                    <>
                                        <Box key={index} onClick={() => onClick(item.id)}
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
                                                <Avatar src={`https://minpro-blog.purwadhikabootcamp.com/${item.User.imgProfile}`} size={"md"} mt={'0px'} />
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
                            }
                            )}
                        </Flex>
                        {page === null ? null : (
                            <Flex mt="20px" justifyContent="center">
                                <Button bgColor="#71B280" color="white" onClick={goToPrevPage} disabled={page === 1}><ArrowBackIcon /></Button>
                                <Button mx="5px" disabled bgColor="#71B280" color="white">{page}</Button>
                                <Button onClick={goToNextPage} disabled={page === totalPage} bgColor="#71B280" color="white" ><ArrowForwardIcon /></Button>
                            </Flex>
                        )}
                    </Box>
                </Box>
            </Flex>
            <Footer />
        </>
    )
}