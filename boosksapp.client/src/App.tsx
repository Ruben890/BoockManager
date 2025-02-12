import { Box, CircularProgress, Container, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { BookCard } from "./Components/BookCard";
import { GetBooks } from "./Api/Books.api";
import { BookDto } from "./Interfaces/Books";
import { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState<BookDto[]>([]);
    const [openBook, setOpenBook] = useState<string | null>(null);
    const [listId, setListId] = useState<number[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        GetBooks(selectedId).then((res) => {
            const response = res as BookDto;
            const booksArray = Array.isArray(response.Details) ? response.Details : response.Details ? [response.Details] : [];
            setBooks(booksArray);
            setListId(booksArray.map(book => book.Id));
        });
    }, [selectedId]);

    const toggleOpen = (bookId: string) => {
        setOpenBook(prev => (prev === bookId ? null : bookId));
    };

    if (!books.length) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size="5rem" />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" padding={3}>
            {/* Select para elegir el ID del libro */}
            <FormControl sx={{ minWidth: 200, marginBottom: 3, width: "60vh"}}>
                <InputLabel>Buscar por ID (selecion el ID del libros que deas)</InputLabel>
                <Select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value as number | null)}
                >
                    <MenuItem value="">Todos</MenuItem>
                    {listId.map(id => (
                        <MenuItem key={id} value={id}>{id}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Contenedor de libros */}
            <Container maxWidth="lg">
                <Grid container spacing={10} justifyContent="center">
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.Id}>
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