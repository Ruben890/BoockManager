using BoosksApp.Server.Aplication.Interfaces;
using BoosksApp.Server.Shared.Dto;
using Microsoft.AspNetCore.Mvc;

namespace BooksApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly IBooksServices _booksService;

        public BooksController(IBooksServices booksService)
        {
            _booksService = booksService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks() =>
            await _booksService.GetBooks();

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookById(int id) =>
            await _booksService.GetBooks(id);


        [HttpPost]
        public async Task<IActionResult> InsertBook([FromBody] BookDto bookDto) =>
            await _booksService.InsertBook(bookDto);

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto) =>
            await _booksService.UpdateBook(id, bookDto);


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id) =>
            await _booksService.DeleteBook(id);
    }
}
