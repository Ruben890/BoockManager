using Newtonsoft.Json;
using Polly;
using Polly.Retry;
using System.Text;

namespace BoosksApp.Server.Application.Utils
{
    public class ExternalApiRequest
    {
        private readonly AsyncRetryPolicy<HttpResponseMessage> _retryPolicy;
        private readonly IHttpClientFactory _httpClientFactory;

        public ExternalApiRequest(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory ?? throw new ArgumentNullException(nameof(httpClientFactory));

            _retryPolicy = Policy
                .HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode)
                .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
        }

        public async Task<object?> RequestExternalApi(HttpMethod method, string endpoint, object? body = null, object? queryParams = null)
        {
            try
            {

                using var client = _httpClientFactory.CreateClient();
                // Construir URL con parámetros de consulta
                if (queryParams != null)
                {
                    endpoint += "?" + CreateQueryString(queryParams);
                }

                var request = new HttpRequestMessage(method, endpoint);

                // Agregar cuerpo si es necesario
                if (body != null && (method == HttpMethod.Post || method == HttpMethod.Put))
                {
                    var jsonContent = JsonConvert.SerializeObject(body);
                    request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                }

                var response = await _retryPolicy.ExecuteAsync(() => client.SendAsync(request));
                response.EnsureSuccessStatusCode();

                var responseData = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<object>(responseData);
            }
            catch (Exception ex)
            {
                throw new HttpRequestException($"Error making request to {endpoint}", ex);
            }
        }

        private static string CreateQueryString(object queryParams)
        {
            var queryBuilder = new StringBuilder();
            foreach (var prop in queryParams.GetType().GetProperties())
            {
                var value = prop.GetValue(queryParams)?.ToString();
                if (!string.IsNullOrEmpty(value))
                {
                    queryBuilder.Append($"{prop.Name}={Uri.EscapeDataString(value)}&");
                }
            }
            return queryBuilder.ToString().TrimEnd('&');
        }
    }
}
