import Axios from "axios";
import * as Yup from "yup";
import { Box, Text, Flex, Input, Button, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const ForgotPass = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [email, setEmail] = useState();
    const forgotPassword = async () => {
        try {
            await Axios.put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", { email: email });
            toast({
                title: "Check your Email to Reset your Password!",
                description: "Sent to your Email!",
                status: 'success',
                duration: 3500,
                isClosable: true,
                position: "top"
            });
            navigate("/login");
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data,
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: "top"
            });
        }
    }
    return (
        <Box display={"flex"} justifyContent={"center"} bgGradient="linear(#408E91, #71B280)" w={"full"} h={"100vh"}>
            <Box rounded='md' margin={"auto"}
                boxShadow='0px 0px 10px black'
                bg={"white"} pt={"30px"} w={["250px", "350px", "400px", "450px", "500px"]} h={"380px"}>
                <Text display={"flex"} justifyContent={"center"}
                    pt={"50px"} fontSize={["17px", "20px", "25px", "30px", "35px"]} color={"#245953"}
                    fontWeight={"extrabold"} fontFamily={"monospace"} >
                    Forgot Your Password?
                </Text>
                <Flex mt={"5px"} fontSize={["10px", "12px"]} justifyContent={"center"} >
                    <Text display={"flex"}>
                        Write your Email to reset your Password!
                    </Text>
                </Flex>
                <Flex mt={"20px"} justifyContent={"center"}>
                    <Input
                        value={email}
                        onChange={(input) => setEmail(input.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") forgotPassword();
                        }}
                        color={"black"} borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={["190px", "230px", "300px", "360px", "400px"]} placeholder="Drop your Email" size={"md"} />
                </Flex>
                <Flex mt={"30px"} justifyContent={"center"}>
                    <Button onClick={forgotPassword} fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                        Submit
                    </Button>
                </Flex>
                <Flex mt={"10px"} fontSize={"12px"} justifyContent={"center"} >
                    <Text display={"flex"}>
                        Already have an account?
                        <Link to="/login">
                            <Text _hover={{ color: "#408E91" }} color={"#71B280"}>‎ Sign In.</Text>
                        </Link>
                    </Text>

                </Flex>
            </Box>
        </Box>
    );
}