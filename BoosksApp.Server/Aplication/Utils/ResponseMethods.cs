using BoosksApp.Server.Shared;
using System.Net;

namespace BoosksApp.Server.Aplication.Utils
{
    public class ResponseMethods
    {
        public static BaseResponse HandleCustomResponse(
         string? message, HttpStatusCode? statusCode = HttpStatusCode.BadRequest, object? details = null)
        {
            var response = new BaseResponse();
            response.Message = message;
            response.StatusCode = statusCode!.Value;
            response.Details = details;
            return response;
        }
    }
}
