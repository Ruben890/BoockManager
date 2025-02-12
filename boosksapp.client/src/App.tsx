import { Box, Container, Grid } from "@mui/material";
import { BookCard } from "./Components/BookCard";
import { GetBooks } from "./Api/Books.api";
import { BookDto } from "./Interfaces/Books";
import { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState<BookDto | null>(null);
    const [openBook, setOpenBook] = useState<string | null>(null); // Estado global del libro abierto (por defecto ninguno)

    useEffect(() => {
        GetBooks().then(res => {
            setBooks(res as BookDto); // Cargar los libros desde la API
        });
    }, []);

    const toggleOpen = (bookId: string) => {
        setOpenBook(prev => (prev === bookId ? null : bookId));
    };

    if (!books) {
        return <div>Loading...</div>; 
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" padding={3}>
            <Container maxWidth="lg">
                <Grid container spacing={10} justifyContent="center">
                    {Array.isArray(books.Details) && books.Details.map((book, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <BookCard 
                                book={book} 
                                isOpen={openBook === book.Title} 
                                toggleOpen={toggleOpen}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}


export default App;
