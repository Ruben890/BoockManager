import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { BookDto } from "../../../Interfaces/Books";

interface BooksFormProps {
    book?: BookDto;
    onBookChange: (book: BookDto) => void;
}

export const BooksForm: React.FC<BooksFormProps> = ({ book, onBookChange }) => {
    const [localData, setLocalData] = useState<BookDto>(book || {} as BookDto);

    useEffect(() => {
        // Si el prop `book` cambia, actualiza el estado local
        setLocalData(book || {} as BookDto);
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData(prev => {
            const updatedBook = { ...prev, [name]: value };
            // Notifica al componente padre sobre el cambio
            onBookChange(updatedBook);
            return updatedBook;
        });
    };

    return (
        <Box component="form" display="flex" flexDirection="column" gap={2} p={2}>
            <TextField
                label="Título"
                name="Title"
                value={localData.Title || ""}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Excerpt"
                name="Excerpt"
                value={localData.Excerpt || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 150 }}
            />
            <TextField
                label="Descripción"
                name="Description"
                value={localData.Description || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 500 }}
            />
            <TextField
                label="Número de páginas"
                name="PageCount"
                type="number"
                value={localData.PageCount || ""}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Fecha de publicación"
                name="PublishDate"
                type="date"
                value={localData.PublishDate ? new Date(localData.PublishDate).toISOString().split("T")[0] : ""}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
            />
        </Box>
    );
};
