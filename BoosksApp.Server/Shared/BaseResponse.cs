using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BoosksApp.Server.Shared
{
    public class BaseResponse : ActionResult
    {
        public string? Message { get; set; } = null!;
        public HttpStatusCode StatusCode { get; set; }
        public object? Details { get; set; } = null!;
        public override async Task ExecuteResultAsync(ActionContext context)
        {

            var response = new ObjectResult(new
            {
                Message = Message,
                StatusCode = StatusCode,
                Details = Details,
            })
            {
                StatusCode = (int)StatusCode
            };

            await response.ExecuteResultAsync(context);
        }
    }
}
