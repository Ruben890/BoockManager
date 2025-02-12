import React, { useState } from "react";
import { BookDto } from "../../../Interfaces/Books";
import { ModelsComponent } from "../../ModalComponets";
import { Box, Button, Typography } from "@mui/material";

import { CreateBook } from "../../../Api/Books.api";
import { BooksForm } from "./BooksForm";

interface AddBookModalProps {
    showModal: boolean;
    onClose: () => void;
}

export const AddBookModal: React.FC<AddBookModalProps> = ({ showModal, onClose }) => {
    const [book, setBook] = useState<BookDto>({} as BookDto);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const response = await CreateBook(book);
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
        setBook(updatedBook);
    };

    return (
        <ModelsComponent onClose={onClose} open={showModal}>
            <Box>
                <Typography variant="h6" gutterBottom textAlign={"center"}>
                    Agregar nuveo libro
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
                    Agregar Libro
                </Button>
                {message && <p>{message}</p>}
            </Box>
        </ModelsComponent>
    );
};
