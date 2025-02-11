import React from 'react';
import { Button, Typography, Card, CardContent, CardActions } from '@mui/material';
import { BookDto } from '../Interfaces/Books';

interface BookProps {
    book: BookDto;
    isOpen: boolean;
    toggleOpen: (bookId: string) => void;
    handleUpdate: (bookId: string) => void; // Función para actualizar
    handleDelete: (bookId: string) => void; // Función para eliminar
}

export const BookCard: React.FC<BookProps> = ({ book, isOpen, toggleOpen, handleUpdate, handleDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                width: '20rem',
                height: isOpen ? '75vh' : '48vh', 
                textAlign: 'center',
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                transition: 'height 0.3s ease-out',
                position: "relative"
            }}
        >
           
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {book.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Páginas: {book.PageCount}
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        overflow: 'auto',
                        maxHeight: isOpen ? '55vh' : '30vh',
                        transition: 'max-height 0.3s ease-out'
                    }}
                >
                    {isOpen ? book.Excerpt : book.Description}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                    sx={{
                        position: "absolute",
                        bottom: "4.5rem"
                    }}
                    size="small"
                    variant="contained"
                    onClick={() => toggleOpen(book.Title!)} // Cambia el estado global
                >
                    {isOpen ? 'Ver Menos' : 'Ver Más'}
                </Button>
            </CardActions>
            <CardActions sx={{ justifyContent: 'center', width: '100%', position: "absolute",
                        bottom: "0.5rem", left:"0%" }}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(book.Title!)} // Acción de actualizar
                >
                    Actualizar
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(book.Title!)} // Acción de eliminar
                >
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
};
