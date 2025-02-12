import { Box, CircularProgress, Container, Grid, Select, MenuItem, FormControl, InputLabel, Alert, Button } from "@mui/material";
import { BookCard } from "./Components/Book/BookCard";
import { GetBooks } from "./Api/Books.api";
import { BookDto } from "./Interfaces/Books";
import { useEffect, useState } from "react";
import { AddBookModal } from "./Components/Book/bookForms/AddBookModal";
import { DeleteBookModal } from "./Components/Book/bookForms/DeleteBookModal";
import { UpdateBookModal } from "./Components/Book/bookForms/UpdateBookModal";


function App() {
    const [books, setBooks] = useState<BookDto[]>([]);
    const [openBook, setOpenBook] = useState<number | null>(null);
    const [listId, setListId] = useState<{ id: number, title: string }[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [modalType, setModalType] = useState<'delete' | 'edit' | "insert" | null>(null);
    const [selectedBoock, setSelectedBoock] = useState<BookDto | null>(null);

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
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <AddBookModal showModal={modalType == 'insert'} onClose={() => setModalType(null)} />

            {selectedBoock && (
                <UpdateBookModal
                    book={selectedBoock}
                    showModal={modalType === 'edit'}
                    onClose={() => {
                        setModalType(null); // Cierra el modal
                        setSelectedBoock(null); // Reinicia el estado de selectedBoock
                    }}
                />
            )}

            {selectedBoock && (
                <DeleteBookModal
                    book={selectedBoock}
                    showModal={modalType === 'delete'}
                    onClose={() => {
                        setModalType(null); // Cierra el modal
                        setSelectedBoock(null); // Reinicia el estado de selectedBoock
                    }}
                />
            )}

            {/* Select para elegir el ID del libro */}
            <Box
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                gap={2}
                padding={2}
                position="fixed"
                top={0}
                zIndex={2}
                width="100%"
                sx={{
                    background: "#f5f5f5",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.22)", // Sombra sutil
                    borderBottom: "2px solid #ccc", // Línea separadora en la parte inferior
                    borderRadius: "8px", // Bordes redondeados para el contenedor
                }}
            >
                <FormControl sx={{ minWidth: 200, width: "60vh" }}>
                    <InputLabel>Buscar por ID (Selecciona el ID del libro que deseas)</InputLabel>
                    <Select
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value as number | null)}
                        sx={{
                            "& .MuiInputBase-root": {
                                backgroundColor: "#fff", // Fondo blanco para el campo
                            },
                            "& .MuiInputLabel-root": {
                                color: "#2c3e50", // Color de la etiqueta
                            },
                        }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {listId.map(({ id, title }) => (
                            <MenuItem key={id} value={id}>{id} - {title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    sx={{
                        height: "56px",
                        backgroundColor: "#3498db",
                        "&:hover": {
                            backgroundColor: "#2980b9",
                        },
                        borderRadius: "4px", // Bordes redondeados para el botón
                    }}
                    size="small"
                    variant="contained"
                    onClick={() => setModalType('insert')}
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
                <Container maxWidth="lg" sx={{ marginTop: "10rem" }}>
                    <Grid container spacing={10} justifyContent="center">
                        {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book.Id}>
                                <BookCard
                                    book={book}
                                    isOpen={openBook === book.Id}
                                    handleUpdate={() => {
                                        setSelectedBoock(book);
                                        setModalType('edit');
                                    }}
                                    handleDelete={() => {
                                        setSelectedBoock(book);
                                        setModalType('delete');
                                    }}
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
