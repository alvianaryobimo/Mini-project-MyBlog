import Axios from "axios";
import * as Yup from "yup";
import { setValue } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, ErrorMessage, Formik, Form } from "formik";
import { Box, Button, Flex, Input, Text, VStack, useToast } from "@chakra-ui/react";

export const LoginbyUsername = () => {
    const toast = useToast();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [success, setSuccess] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Paasowrd min 6 ")
            .matches(/^(?=.*[A-Z])/, "Password Must Contain 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Contain 1 Symbol")
            .matches(/.*[0-9].*/, "Password Must Contain 1 number")
    });

    const handleSubmit = async (data) => {
        try {
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", data);
            console.log(response.data.isAccountExist);
            dispatch(setValue(response.data.isAccountExist));
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
            toast({
                title: "Welcome!",
                description: "Login Succses!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            });
            setTimeout(() => {
                navigate("/");
            }, 1000)
            console.log(data);

        } catch (err) {
            console.log(err.response.data);
            setSuccess(false);
            alert(err.response.data);
        }
    }
    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(value, action) => {
                handleSubmit(value);
                if (success) {
                    action.resetForm();
                }
            }}>
            {(props) => {
                return (
                    <Box as={Form}>
                        <Flex justifyContent={"center"}>
                            <VStack>
                                <Field as={Input} name="username" color={"black"} borderRadius={"20px"} border={"2px solid"}
                                    justifyContent={"center"} borderColor={"#408E91"}
                                    w={["190px","200px", "230px", "300px", "400px"]} placeholder="Username" size={"md"} />
                                <ErrorMessage
                                    component="box"
                                    name="username"
                                    style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                            </VStack>
                        </Flex>
                        <Flex mt={"20px"} justifyContent={"center"}>
                            <VStack display={"flex"} justifyContent={"center"}>
                                <Field as={Input} name="password" left={"15px"} borderRadius={"20px"} border={"2px solid"}
                                    justifyContent={"center"} borderColor={"#71B280"}
                                    w={["190px","200px", "230px", "300px", "400px"]} placeholder="Password" size={"md"} type={show ? 'text' : 'password'} />
                                <ErrorMessage
                                    component="box"
                                    name="password"
                                    style={{ color: "red", marginLeft: "30px", marginBottom: "-18px", marginTop: "-8px" }} />
                            </VStack>
                            <Button onClick={handleClick} right={"25px"} variant={"unstyled"} mt={"3px"} size='sm'>
                                {show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </Flex>
                        <Link to="/forgotPassword">
                            <Text mt={"5px"}
                                color={"blue.400"} _hover={{ color: "blue.600" }} fontSize={"10px"} fontStyle={"inherit"}> Forgot Password?</Text>
                        </Link>
                        <Flex mt={"30px"} justifyContent={"center"}>
                            <Button isDisabled={!props.dirty} type="submit" fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                                Login
                            </Button>
                        </Flex>
                    </Box>
                );
            }}
        </Formik>
    );
}