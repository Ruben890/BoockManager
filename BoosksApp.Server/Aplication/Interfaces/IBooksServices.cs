using BoosksApp.Server.Shared;
using BoosksApp.Server.Shared.Dto;

namespace BoosksApp.Server.Aplication.Interfaces
{
    public interface IBooksServices
    {
        Task<BaseResponse> DeleteBook(int id);
        Task<BaseResponse> GetBooks(int? id = null);
        Task<BaseResponse> InsertBook(BookDto bookDto);
        Task<BaseResponse> UpdateBook(int id, BookDto bookDto);
    }
}
