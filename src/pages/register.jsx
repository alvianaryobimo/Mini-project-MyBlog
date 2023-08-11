import Axios from "axios";
import * as Yup from "yup";
import { Field, ErrorMessage, Formik, Form } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Input, Text, VStack, useToast } from "@chakra-ui/react";

export const Signup = () => {
    const loginSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Email is required"),
        phone: Yup.string()
            .required("Number must be more than 11 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password min 6 ")
            .matches(/^(?=.*[A-Z])/, "Password Must Contain 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Contain 1 Symbol")
            .matches(/.*[0-9].*/, "Password Must Contain 1 number"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password is not same")
            .required("have to same"),
    })
    const { token } = useParams();
    const navigate = useNavigate();
    const toast = useToast();
    const handleSubmit = async (data) => {
        try {
            data.FE_URL = window.location.origin;
            await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/", data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            toast({
                title: "Register Success!",
                description: "Please Check your Email to verify you account!",
                status: 'success',
                duration: 2500,
                position: "top"
            });
            navigate("/loginbyUsername");
        } catch (err) {
            toast({
                title: "Register Failed!",
                description: err.response.data,
                status: 'error',
                duration: 2500,
                position: "top"
            });
        }
    }
    return (
        <Formik
            initialValues={{ email: "", username: "", password: "", confirmPassword: "", phone: "" }}
            validationSchema={loginSchema}
            onSubmit={(value, action) => {
                handleSubmit(value);
                action.resetForm();
            }}>
            {(props) => {
                return (
                    <Box as={Form} display={"flex"}
                        justifyContent={"center"} w={"full"} h={"100vh"}
                        bgGradient="linear(#408E91, #71B280)">
                        <Box rounded='md'
                            boxShadow='0px 0px 10px black'
                            bg={"white"} margin={"auto"} w={["250px", "280px", "300px", "400px", "450px", "500px"]} h={"500px"}>
                            <Text display={"flex"} justifyContent={"center"}
                                mt={"25px"} fontSize={"50px"} color={"#245953"}
                                fontWeight={"extrabold"} fontFamily={"monospace"} >
                                Sign Up
                            </Text>
                            <Flex mt={"5px"} fontSize={["10px", "12px"]} justifyContent={"center"} >
                                <Text display={"flex"}>
                                    Already have an account?
                                    <Link to="/login">
                                        <Text _hover={{ color: "#408E91" }} color={"#71B280"}>‎ Sign In.</Text>
                                    </Link>
                                </Text>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="email" borderRadius={"20px"}
                                        border={"2px solid"} borderColor={"#71B280"}
                                        w={["190px", "200px", "230px", "300px", "370px"]} placeholder="Email" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="email"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px", fontSize:"12px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"22px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="username" borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={["190px", "200px", "230px", "300px", "370px"]} placeholder="Username" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="username"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px", fontSize: "12px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="password" mr={"5px"} left={"0px"} borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#71B280"}
                                        w={["91px", "95px", "108px", "145px", "180px"]} placeholder="Password" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="password"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px", fontSize: "11px" }} />
                                </VStack>
                                <VStack>
                                    <Field as={Input} name="confirmPassword" ml={"5px"} left={"0px"} borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#71B280"}
                                        w={["91px", "96px", "108px", "145px", "180px"]} placeholder="Confirm Password" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="confirmPassword"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px", fontSize: "11px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="phone" type="number" placeholder='Phone Number'
                                        borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={["190px", "200px", "230px", "300px", "370px"]} size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="phone"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px", fontSize: "12px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"30px"} justifyContent={"center"}>
                                <Button type="submit" isDisabled={!props.dirty} fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                                    Register
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                );
            }}
        </Formik>
    );
}