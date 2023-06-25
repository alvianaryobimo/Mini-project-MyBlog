import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import Axios from "axios";

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
            .matches(/^(?=.[A-Z])/, "Password Must Contain 1 Capital")
            // .matches(/@^(?=.(\W|_))/, "Password Must Contain 1 Symbol")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Password is not same")
            .required("have to same"),
    })
    const navigate = useNavigate();
    const { token } = useParams();
    const handleSubmit = async (data) => {
        try {
            data.FE_URL = "https://sensational-daffodil-08643f.netlify.app/"
            await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/", data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            navigate("/login");
            console.log(data);
        } catch (err) {
            console.log(err);
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
                        justifyContent={"center"} h={"648px"}
                        bgGradient="linear(#408E91, #71B280)">
                        <Box rounded='md'
                            boxShadow='0px 0px 10px black'
                            bg={"white"} mt={"90px"} w={"500px"} h={"500px"}>
                            <Text display={"flex"} justifyContent={"center"}
                                mt={"25px"} fontSize={"50px"} color={"#245953"}
                                fontWeight={"extrabold"} fontFamily={"monospace"} >
                                Sign Up
                            </Text>
                            <Flex mt={"5px"} fontSize={"12px"} justifyContent={"center"} >
                                <Text display={"flex"}>
                                    Already have an account?
                                    <Link to="/loginbyEmail">
                                        <Text _hover={{ color: "#408E91" }} color={"#71B280"}>‎ Sign In.</Text>
                                    </Link>
                                </Text>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="email" borderRadius={"20px"}
                                        border={"2px solid"} borderColor={"#71B280"}
                                        w={"400px"} placeholder="Email" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="email"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"22px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="username" borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} placeholder="Username" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="username"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="password" mr={"5px"} left={"0px"} borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#71B280"}
                                        w={"195px"} placeholder="Password" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="password"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                </VStack>
                                <VStack>
                                    <Field as={Input} name="confirmPassword" ml={"5px"} left={"0px"} borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#71B280"}
                                        w={"195px"} placeholder="Confirm Password" size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="confirmPassword"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                </VStack>
                            </Flex>
                            <Flex mt={"20px"} justifyContent={"center"}>
                                <VStack>
                                    <Field as={Input} name="phone" type="number" placeholder='Phone Number'
                                        borderRadius={"20px"} border={"2px solid"}
                                        justifyContent={"center"} borderColor={"#408E91"}
                                        w={"400px"} size={"md"} />
                                    <ErrorMessage
                                        component="box"
                                        name="phone"
                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
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