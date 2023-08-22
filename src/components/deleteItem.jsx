import Axios from "axios"
import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"

export const DeleteButton = () => {
    const { id } = useParams()
    const toast = useToast()
    const navigate = useNavigate()
    const onDelete = async () => {
        try {
            await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`);
            toast({
                title: "Success",
                description: "Delete blog success!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => navigate('/myBlog'), 2000);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box>
            <Button _hover={{ transform: "scale(1.3)" }} onClick={onDelete} variant={"unstyled"} ><DeleteIcon /></Button>
        </Box>
    );
}