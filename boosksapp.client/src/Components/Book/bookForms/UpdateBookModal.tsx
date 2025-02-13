import React, { useEffect, useState } from "react";
import { BookDto } from "../../../Interfaces/Books";
import { ModelsComponent } from "../../ModalComponets";
import { Box, Button, Typography } from "@mui/material";
import { BooksForm } from "./BooksForm";
import { UpdateBook } from "../../../Api/Books.api";

interface UpdateBookModalProps {
    book: BookDto;
    showModal: boolean;
    onClose: () => void;
}

export const UpdateBookModal: React.FC<UpdateBookModalProps> = ({ book, showModal, onClose }) => {
    const [localData, setLocalData] = useState<BookDto>(book || {} as BookDto);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        setLocalData(book);
    }, [book]);

    const handleSubmit = async () => {
        try {
            const response = await UpdateBook(localData.Id, localData);
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

    const handleBookChange = (updatedBook: BookDto) => {
        setLocalData(updatedBook);
    };

    return (
        <ModelsComponent onClose={onClose} open={showModal}>
            <Box>
                <Typography variant="h6" gutterBottom textAlign={"center"}>
                    Editar Libro
                </Typography>
                <BooksForm book={book} onBookChange={handleBookChange} />
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
                    Actulizar Libro
                </Button>
                {message && <p>{message}</p>}
            </Box>
        </ModelsComponent>
    );
};
