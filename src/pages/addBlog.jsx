import { Box, Flex, Input, Select, Textarea, Button, Heading, VStack, useToast } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => {
    const toast = useToast();
    const [category, setCategory] = useState();
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const BlogSchema = Yup.object().shape(({
        title: Yup.string()
            .required("Write your title"),
        keywords: Yup.string()
            .required("Write your keywords"),
        CategoryId: Yup.string()
            .required("Choose your category"),
        content: Yup.string()
            .required("Write your content"),
        country: Yup.string()
            .required("Write your content"),
        file: Yup.string()
            .required("Add image"),
    }))

    const initialValues = {
        title: "",
        keywords: "",
        CategoryId: "",
        content: "",
        country: "",
        file: null
    }

    const getCategory = async (data) => {
        try {
            const response = await Axios.get("https://minpro-blog.purwadhikabootcamp.com/api/blog/allCategory", data);
            setCategory(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            const { title, keywords, country, CategoryId, url, content } = value;
            data.append("data", JSON.stringify({ title, keywords, country, CategoryId, url, content, file }));
            data.append("file", file);
            // console.log(data);
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/blog", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "New Article!",
                description: "Your article uploaded!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
              })
            navigate("/myBlog");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCategory();
    }, []);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={BlogSchema}
            onSubmit={(value, action) => {
                handleCreate(value);
            }} >
            {() => {
                return (
                    <Form>

                        <Flex>
                            <Navbar />
                        </Flex>
                        <Flex mt={"110px"} justifyContent={"center"}>
                            <Heading fontSize={"50px"} color={"#408E91"} fontFamily={"monospace"} >
                                Create your own blog
                            </Heading>
                        </Flex>
                        <Flex justifyContent={"center"}>
                            <Box boxShadow='0px 0px 6px black'
                                bgGradient="linear(#408E91, #71B280)"
                                borderRadius={"8px"} mt={"35px"}
                                w={"450px"} h={"330px"} >
                                <VStack mt={"25px"} justifyContent={"center"}>
                                    <Field as={Input} name="title" bg={"white"} color={"black"} borderRadius={"20px"}
                                        border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} placeholder="Title" size={"md"} />
                                    <ErrorMessage
                                        component="Box"
                                        name="title"
                                        style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                </VStack>
                                <VStack mt={"19px"} justifyContent={"center"}>
                                    <Field as={Input} name="keywords" bg={"white"} color={"black"} borderRadius={"20px"}
                                        border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} placeholder="Keywords" size={"md"} />
                                    <ErrorMessage
                                        component="Box"
                                        name="keywords"
                                        style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                </VStack>
                                <VStack mt={"19px"} justifyContent={"center"}>
                                    <Field as={Input} name="country" bg={"white"} color={"black"} borderRadius={"20px"}
                                        border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} placeholder="Country" size={"md"} />
                                    <ErrorMessage
                                        component="Box"
                                        name="country"
                                        style={{ color: "red", marginBottom: "-18px", marginLeft: "3px", marginTop: "-9px" }} />
                                </VStack>
                                <VStack mt={"19px"} justifyContent={"center"}>
                                    <Field as={Select} name="CategoryId" bg={"white"} type="file" color={"black"} borderRadius={"20px"}
                                        border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} placeholder="Categories" size={"md"}>
                                        {category?.map((value, index) => {
                                            return (
                                                <option key={index} value={value.id} >{value.name}</option>
                                            );
                                        })}
                                    </Field>
                                    <ErrorMessage
                                        component="Box"
                                        name="CategoryId"
                                        style={{ color: "red", marginBottom: "-18px", marginLeft: "3px", marginTop: "-9px" }} />
                                </VStack>
                                <VStack mt={"16px"} justifyContent={"center"}>
                                    <Field name="file">
                                        {({ field }) => (
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    setFile(e.target.files[0])
                                                }} bg={"white"} type="file" color={"black"}
                                                border={"2px solid"} borderRadius={"20px"}
                                                justifyContent={"center"} borderColor={"#408E91"}
                                                w={"400px"} placeholder="Country" size={"md"} />
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        component="Box"
                                        name="file"
                                        style={{ color: "red", marginBottom: "-18px", marginLeft: "3px", marginTop: "-9px" }} />
                                </VStack>
                            </Box>
                            <VStack justifyContent={"center"}>
                                <Field as={Textarea} name="content" ml={"15px"} placeholder="Content" border={"2px solid"} borderColor={"#408E91"} h={"331px"} w={"600px"} mt={"35px"}></Field> <br />
                                <ErrorMessage
                                    component="Box"
                                    name="content"
                                    style={{ color: "red", marginBottom: "5px", marginTop: "-36px" }} />
                            </VStack>
                        </Flex>
                        <Flex mt={"0px"} justifyContent={"center"}>
                            <Button type="submit" fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"1070px"}>
                                Create Blog
                            </Button>
                        </Flex>
                    </Form>
                );
            }}
        </Formik>
    );
}