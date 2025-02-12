import { Box, CircularProgress, Container, Grid, Select, MenuItem, FormControl, InputLabel, Alert, CardActions, Button } from "@mui/material";
import { BookCard } from "./Components/Book/BookCard";
import { GetBooks } from "./Api/Books.api";
import { BookDto } from "./Interfaces/Books";
import { useEffect, useState } from "react";

function App() {
    const [books, setBooks] = useState<BookDto[]>([]);
    const [openBook, setOpenBook] = useState<number | null>(null);
    const [listId, setListId] = useState<{ id: number, title: string }[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        GetBooks(selectedId)
            .then((res) => {
                const response = res as BookDto;
                const booksArray = Array.isArray(response.Details) ? response.Details : response.Details ? [response.Details] : [];
                setBooks(booksArray);

                // Extraer ID y Título para el Select
                setListId(booksArray.map(book => ({ id: book.Id, title: book.Title || "Sin título" })));
                setErrorMessage(null); // Limpiar error en caso de éxito
            })
            .catch(() => {
                setErrorMessage("Hubo un problema al cargar los libros. Inténtalo nuevamente.");
            });
    }, [selectedId]);

    const toggleOpen = (bookId: number) => {
        setOpenBook(prev => (prev === bookId ? null : bookId));
    };


    return (
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" padding={3}>
            {errorMessage && (
                <Alert severity="warning" sx={{ marginBottom: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Select para elegir el ID del libro */}
            <Box display="flex" alignItems="center" gap={2} margin="2rem">
                <FormControl sx={{ minWidth: 200, width: "60vh" }}>
                    <InputLabel>Buscar por ID (Selecciona el ID del libro que deseas)</InputLabel>
                    <Select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value as number | null)}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {listId.map(({ id, title }) => (
                            <MenuItem key={id} value={id}>{id} - {title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    sx={{ height: "56px" }}
                    size="small"
                    variant="contained"
                >
                    Agregar Nuevo Libro
                </Button>
            </Box>


            {/* Mostrar loading si no hay libros */}
            {!books.length && !errorMessage && (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress size="5rem" />
                </Box>
            )}

            {/* Contenedor de libros */}
            {books.length > 0 && (
                <Container maxWidth="lg">
                    <Grid container spacing={10} justifyContent="center">
                        {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book.Id}>
                                <BookCard
                                    book={book}
                                    isOpen={openBook === book.Id}
                                    toggleOpen={toggleOpen}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}
        </Box>
    );
}

export default App;
