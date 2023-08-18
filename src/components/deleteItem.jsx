import Axios from "axios"
import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"

export const DeleteButton = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const toast = useToast()
    const onDelete = async () => {
        try {
            const response = await Axios.patch(`https://minpro-blog.purwadhikabootcamp.com/api/blog/remove/${id}`)
            console.log(response);
            toast({
                title: "Success",
                description: "Delete blog success!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                navigate('/myBlog')
            }, 2000)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Box>
            <Button onClick={onDelete} variant={"unstyled"} ><DeleteIcon /></Button>
        </Box>
    )
}