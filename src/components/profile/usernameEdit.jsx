import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";
import * as Yup from "yup";
import Axios from "axios";
import { Formik, ErrorMessage, Field, Form } from "formik";

export const UsernameEdit = () => {
    const token = localStorage.getItem("token");
    const validationSchema = Yup.object().shape({
        currentUsername: Yup
            .string()
            .required("Current Username is required!"),
        newUsername: Yup
            .string()
            .required("New Username is required!")
    })
    const handleSubmit = async (data) => {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/auth/changeUsername`,
                data, { headers });
            console.log(response.value.username);
        } catch (error) {
            console.log(error);
        }
    }
    const initialValues = {
        currentUsername: "",
        newUsername: ""
    }

    return (
        <Formik onSubmit={(value) => {
            handleSubmit(value);
        }}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Box as={Form} >
                <Flex mt={"15px"} justifyContent={"center"}>
                    <Heading fontFamily={"monospace"}>
                        Edit Username
                    </Heading>
                </Flex>
                <Flex mt={"25px"} justifyContent={"center"}>
                    <Field as={Input} name="currentUsername"
                        color={"black"}
                        borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"300px"} placeholder="Current Username" size={"md"} />
                </Flex>
                <Flex justifyContent={"center"}>
                    <ErrorMessage
                        component="div"
                        name="currentUsername"
                        style={{ color: "red", marginBottom: "-18px", marginTop: "-1px" }} />
                </Flex>
                <Flex mt={"20px"} justifyContent={"center"}>
                    <Field as={Input} name="newUsername"
                        color={"black"}
                        borderRadius={"20px"} border={"2px solid"}
                        justifyContent={"center"} borderColor={"#408E91"}
                        w={"300px"} placeholder="New Username" size={"md"} />
                </Flex>
                <Flex justifyContent={"center"}>
                    <ErrorMessage
                        component="div"
                        name="newUsername"
                        style={{ color: "red", marginBottom: "-18px", marginTop: "-1px" }} />
                </Flex>
                <Flex mt={"30px"} justifyContent={"center"}>
                    <Button type="submit" fontFamily={"monospace"} boxShadow='0px 0px 4px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                        Change
                    </Button>
                </Flex>
            </Box>
        </Formik>
    );
}