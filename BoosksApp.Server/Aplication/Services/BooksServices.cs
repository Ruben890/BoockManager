using BoosksApp.Server.Aplication.Interfaces;
using BoosksApp.Server.Aplication.Utils;
using BoosksApp.Server.Application.Utils;
using BoosksApp.Server.Shared;
using BoosksApp.Server.Shared.Dto;
using Newtonsoft.Json;
using System.Net;

namespace BoosksApp.Server.Application.Services
{
    public class BooksServices : IBooksServices
    {
        private readonly IConfiguration _config;
        private readonly ExternalApiRequest _apiRequest;
        private readonly string _baseUrl;
        private const string _endpoint = "Books";

        public BooksServices(IConfiguration configuration, ExternalApiRequest apiRequest)
        {
            _apiRequest = apiRequest ?? throw new ArgumentNullException(nameof(apiRequest));
            _config = configuration ?? throw new ArgumentNullException(nameof(configuration));
            _baseUrl = _config.GetValue<string>("BaseUrl")
                      ?? throw new ArgumentNullException("BaseUrl configuration is missing");
        }

        public async Task<BaseResponse> GetBooks(int? id = null)
        {
            try
            {
                string url = id.HasValue
                            ? $"{_baseUrl}/{_endpoint}/{id.Value}"
                            : $"{_baseUrl}/{_endpoint}";

                var response = await _apiRequest.RequestExternalApi(HttpMethod.Get, url);

                if (response != null && id.HasValue)
                    return ResponseMethods.HandleCustomResponse
                        (null, HttpStatusCode.OK, JsonConvert.DeserializeObject<BookDto>(response.ToString()!));

                if (response != null && !id.HasValue)
                    return ResponseMethods.HandleCustomResponse
                          (null, HttpStatusCode.OK, JsonConvert.DeserializeObject<List<BookDto>>(response.ToString()!));

                return ResponseMethods.HandleCustomResponse("No books found", HttpStatusCode.NotFound);

            }
            catch (Exception ex)
            {
                return ResponseMethods.HandleCustomResponse(ex.Message, HttpStatusCode.InternalServerError);
            }
        }

        public async Task<BaseResponse> InsertBook(BookDto bookDto)
        {
            try
            {
                if (bookDto == null)
                {
                    return ResponseMethods.HandleCustomResponse("Book data is required", HttpStatusCode.BadRequest);
                }

                var response = await _apiRequest.RequestExternalApi(HttpMethod.Post, $"{_baseUrl}/{_endpoint}", bookDto);

                if (response != null)
                {
                    return ResponseMethods.HandleCustomResponse("Book inserted successfully", HttpStatusCode.OK);
                }

                return ResponseMethods.HandleCustomResponse("Failed to insert book", HttpStatusCode.InternalServerError);
            }
            catch (Exception ex)
            {
                return ResponseMethods.HandleCustomResponse($"An error occurred: {ex.Message}", HttpStatusCode.InternalServerError);
            }
        }

        public async Task<BaseResponse> UpdateBook(int id, BookDto bookDto)
        {
            try
            {
                if (bookDto == null)
                {
                    return ResponseMethods.HandleCustomResponse("Book data is required", HttpStatusCode.BadRequest);
                }

                var response = await _apiRequest.RequestExternalApi(HttpMethod.Put, $"{_baseUrl}/{_endpoint}/{id}", bookDto);

                if (response != null)
                {
                    return ResponseMethods.HandleCustomResponse("Book updated successfully", HttpStatusCode.OK);
                }

                return ResponseMethods.HandleCustomResponse("Failed to update book", HttpStatusCode.InternalServerError);
            }
            catch (Exception ex)
            {
                return ResponseMethods.HandleCustomResponse($"An error occurred: {ex.Message}", HttpStatusCode.InternalServerError);
            }
        }

        public async Task<BaseResponse> DeleteBook(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return ResponseMethods.HandleCustomResponse("Invalid book ID", HttpStatusCode.BadRequest);
                }

                var response = await _apiRequest.RequestExternalApi(HttpMethod.Delete, $"{_baseUrl}/{_endpoint}/{id}");

                return ResponseMethods.HandleCustomResponse("Book deleted successfully", HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return ResponseMethods.HandleCustomResponse($"An error occurred: {ex.Message}", HttpStatusCode.InternalServerError);
            }
        }

    }
}
