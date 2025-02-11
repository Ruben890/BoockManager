using BoosksApp.Server.Aplication.Interfaces.IServices;
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


var app = builder.Build();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
});

app.UseRouting();
app.MapStaticAssets();
app.MapControllers();
app.Run();
