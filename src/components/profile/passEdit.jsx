import { Box, Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import Axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { Link } from "react-router-dom";

export const PasswordEdit = () => {
    const token = localStorage.getItem("token");
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Current Username is required!"),
        password: Yup.string()
            .required("New Username is required!"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password is not same")
            .required("New Username is required!"),
    })
    const handleSubmit = async (data) => {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            data.FE_URL = window.location.origin;
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/changePass`,
                data, { headers });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        currentPassword: "",
        password: "",
        confirmPassword: "",
    }
    return (
        <Formik onSubmit={(value) => {
            handleSubmit(value);
        }}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Box as={Form} >
                <Flex mt={"5px"} justifyContent={"center"}>
                    <Heading fontFamily={"monospace"}>
                        Edit Password
                    </Heading>
                </Flex>
                <Link to="/forgotPassword">
                                <Text mt={"0px"} ml={"5px"}
                                    color={"blue.400"} _hover={{ color: "blue.600" }} fontSize={"10px"} fontStyle={"inherit"}> Forgot Password?</Text>
                            </Link>
                <Flex mt={"8px"} justifyContent={"center"}>
                    <Field as={Input} name="currentPassword"
                        color={"black"}
                        borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"300px"} placeholder="Current Password" size={"md"} />
                </Flex>
                <Flex justifyContent={"center"}>
                    <ErrorMessage
                        component="div"
                        name="currentPassword"
                        style={{ color: "red", marginBottom: "-18px", marginTop: "-1px" }} />
                </Flex>
                <Flex mt={"15px"} justifyContent={"center"}>
                    <Field as={Input} name="password"
                        color={"black"}
                        borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"300px"} placeholder="New Password" size={"md"} />
                </Flex>
                <Flex justifyContent={"center"}>
                    <ErrorMessage
                        component="div"
                        name="password"
                        style={{ color: "red", marginBottom: "-18px", marginTop: "-1px" }} />
                </Flex>
                <Flex mt={"15px"} justifyContent={"center"}>
                    <Field as={Input} name="confirmPassword"
                        color={"black"}
                        borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"300px"} placeholder="Confirm Password" size={"md"} />
                </Flex>
                <Flex justifyContent={"center"}>
                    <ErrorMessage
                        component="div"
                        name="confirmPassword"
                        style={{ color: "red", marginBottom: "-18px", marginTop: "-1px" }} />
                </Flex>
                <Flex mt={"15px"} justifyContent={"center"}>
                    <Button type="submit" fontFamily={"monospace"} boxShadow='0px 0px 4px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                        Change
                    </Button>
                </Flex>
                    
            </Box>
        </Formik>
    );
}