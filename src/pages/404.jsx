import { Box, Flex, Text } from "@chakra-ui/react";

export const ErrorPage = () => {
    return (
        <Flex h={"100vh"} w={"full"} bgGradient="linear(#408E91, #71B280)">
            <Box margin={"auto"}>
                <Text fontWeight={"extrabold"} fontSize={"100px"} display={"flex"} justifyContent={"center"}>
                    Error 404
                </Text>
                <Text fontFamily={"mono"} display={"flex"} justifyContent={"center"}>
                    Oops! Looks like this page doesn't exist.
                </Text>
            </Box>
        </Flex>
    );
}