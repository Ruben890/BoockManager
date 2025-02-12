import React, { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { BookDto } from "../../Interfaces/Books";

interface BooksFormProps {
    book?: BookDto;
    onBookChange: (book: BookDto) => void;
    isEdit: boolean;
}

export const BooksForm: React.FC<BooksFormProps> = ({ book, onBookChange, isEdit }) => {
    const [localData, setLocalData] = useState<BookDto>(book || {} as BookDto);

    useEffect(() => {
        setLocalData(book || {} as BookDto);
    }, [book]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onBookChange(localData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2} p={2}>
            <TextField
                label="Título"
                name="Title"
                value={localData.Title || ""}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Descripción"
                name="Description"
                value={localData.Description || ""}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
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
            <Button type="submit" variant="contained" color="primary">
                {isEdit ? "Actualizar Libro" : "Agregar Libro"}
            </Button>
        </Box>
    );
};
