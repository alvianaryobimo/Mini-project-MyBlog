import { Box, Text, Flex, Button } from "@chakra-ui/react";
import Axios from "axios";
import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export const Verify = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const header = {
        Authorization: `Bearer ${token}`
    }
    console.log(token);
    const getVerified = async () => {
        try {

            const response = await Axios.patch("https://minpro-blog.purwadhikabootcamp.com/api/auth/verify", {
            }, { headers: header });
            navigate("/loginbyUsername");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Formik>
            <Box display={"flex"}
                justifyContent={"center"} h={"648"}
                bgGradient="linear(#408E91, #71B280)">
                <Box rounded='md'
                    boxShadow='0px 0px 10px black'
                    bg={"white"} mt={"130px"} w={"500px"} h={"380px"}>
                    <Text mt={"120px"} display={"flex"} justifyContent={"center"}
                        fontSize={"40px"} color={"#245953"}
                        fontWeight={"extrabold"} fontFamily={"monospace"} >
                        Verify your Account
                    </Text>
                    <Flex mt={"20px"} justifyContent={"center"}>
                        <Button onClick={getVerified} type="button" fontFamily={"monospace"}
                            boxShadow='0px 0px 6px black' color={"white"}
                            bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                            Submit
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Formik>
    );
}