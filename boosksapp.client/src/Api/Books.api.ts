import { Response } from "../Interfaces/Response";
import { BookDto } from "../Interfaces/Books";

const baseUrl: string = `${import.meta.env.VITE_BASE_URL_API}/Books`;

// Obtener libros (todos o por ID)
export const GetBooks = async (id?: number): Promise<Response<BookDto>> => {
    const url = id ? `${baseUrl}/${id}` : baseUrl;
    return fetchData<Response<BookDto>>(url, 'GET');
};

// Crear un nuevo libro
export const CreateBook = async (book: BookDto): Promise<Response> => {
    return fetchData<Response>(baseUrl, 'POST', book);
};

// Actualizar un libro existente
export const UpdateBook = async (id: number, book: BookDto): Promise<Response> => {
    return fetchData<Response>(`${baseUrl}/${id}`, 'PUT', book);
};

// Eliminar un libro por ID
export const DeleteBook = async (id: number): Promise<Response> => {
    return fetchData<Response<Response>>(`${baseUrl}/${id}`, 'DELETE');
};


const fetchData = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: unknown,
    headers: Record<string, string> = { 'Content-Type': 'application/json' }
): Promise<T> => {
    try {
        const options: RequestInit = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la solicitud');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido');
    }
};