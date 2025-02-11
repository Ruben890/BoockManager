using BoosksApp.Server.Aplication.Interfaces;
using BoosksApp.Server.Application.Services;
using BoosksApp.Server.Application.Utils;
using Microsoft.AspNetCore.HttpOverrides;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddHttpClient<ExternalApiRequest>();
builder.Services.AddScoped<ExternalApiRequest>();
builder.Services.AddScoped<IBooksServices, BooksServices>();

builder.Services.AddControllers(config =>
{
    config.RespectBrowserAcceptHeader = true;
    config.ReturnHttpNotAcceptable = true;
})
.AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
});

// Leer la lista de orígenes permitidos desde la configuración
var allowedOrigins = builder.Configuration.GetValue<string[]>("AllowedOrigins");

if (allowedOrigins is null || allowedOrigins.Length == 0)
{
    throw new InvalidOperationException("No allowed origins have been defined in the settings. Make sure to add the 'AllowedOrigins' section in appsettings.");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.WithOrigins(allowedOrigins)
               .AllowAnyHeader() // Permitir todos los encabezados
               .AllowAnyMethod() // Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
               .AllowCredentials() // Habilitar credenciales
               .WithExposedHeaders("X-Custom-Header") // Exponer solo los encabezados necesarios
               .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});

var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
});

app.UseCors("CorsPolicy");
app.UseRouting();
app.MapStaticAssets();
app.MapControllers();
app.Run();
