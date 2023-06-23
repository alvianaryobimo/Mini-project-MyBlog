import { Box, Text } from "@chakra-ui/react";

export const ErrorPage = () => {
    return (
        <Box h={"648"} bgGradient="linear(#408E91, #71B280)">
            <Text pt={"200px"} fontWeight={"extrabold"} fontSize={"100px"} display={"flex"} justifyContent={"center"}>
                Error 404
            </Text>
            <Text fontFamily={"mono"} display={"flex"} justifyContent={"center"}>
                Oops! Looks like this page doesn't exist.
            </Text>
        </Box>
    );
}