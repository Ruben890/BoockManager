import React, { useState } from "react";
import { BookDto } from "../../../Interfaces/Books";
import { ModelsComponent } from "../../ModalComponets";
import { Box, Button, Typography } from "@mui/material";
import { DeleteBook } from "../../../Api/Books.api";

interface UpdateBookModalProps {
    book: BookDto;
    showModal: boolean;
    onClose: () => void;
}

export const DeleteBookModal: React.FC<UpdateBookModalProps> = ({ book, showModal, onClose }) => {

    const [message, setMessage] = useState<string | null>(null);
    const handleSubmit = async () => {
        try {
            const response = await DeleteBook(book.Id);
            if (response.StatusCode === 200) {
                setMessage(response.Message ?? "Book added successfully!");
            } else {
                setMessage("Failed to add the book.");
            }
            onClose();
        } catch (err) {
            setMessage("Error adding the book." + err);
        }
    };


    return (
        <ModelsComponent onClose={onClose} open={showModal}>
            <Box>
                <Typography variant="h6" gutterBottom textAlign={"center"}>
                    Estas Seguros de querer eliminar este libro
                </Typography>
                <Box display='flex' justifyContent='space-between' width='100%' gap={4} marginTop='1rem'>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            padding: '5px'
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            display: 'flex',
                            width: '100%',
                            padding: '5px'
                        }}>
                        Eliminar libor
                    </Button>
                </Box>
                {message && <p>{message}</p>}
            </Box>
        </ModelsComponent>
    );
};
