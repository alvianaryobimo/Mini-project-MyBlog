import * as Yup from "yup";
import { Box, Text, Flex, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ForgotPass = () => {
    const forgotPass = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Email is required"),
    });
    console.log(forgotPass);
    return (
        <Box display={"flex"} justifyContent={"center"} pt={"120px"} bgGradient="linear(#408E91, #71B280)" h={"648"}>
            <Box rounded='md'
                boxShadow='0px 0px 10px black'
                bg={"white"} pt={"35px"} w={"500px"} h={"380px"}>
                <Text display={"flex"} justifyContent={"center"}
                    pt={"50px"} fontSize={"35px"} color={"#245953"}
                    fontWeight={"extrabold"} fontFamily={"monospace"} >
                    Forgot Your Password?
                </Text>
                <Flex mt={"5px"} fontSize={"12px"} justifyContent={"center"} >
                    <Text display={"flex"}>
                        Write your Email to reset your Password!
                    </Text>
                </Flex>
                <Flex mt={"20px"} justifyContent={"center"}>
                    <Input color={"black"} borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"400px"} placeholder="Drop your Email" size={"md"} />
                </Flex>
                <Flex mt={"30px"} justifyContent={"center"}>
                    <Button fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
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