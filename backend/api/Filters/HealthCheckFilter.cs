using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Api.Filters
{
    public class HealthCheckFilter : IDocumentFilter
    {
        public static readonly string HealthCheckEndpoint = "/health";

        public void Apply(OpenApiDocument openApiDocument, DocumentFilterContext context)
        {
            var pathItem = new OpenApiPathItem
            {
                Summary = "Provides the health status for the public API"
            };

            var properties = new Dictionary<string, OpenApiSchema>
            {
                { "status", new OpenApiSchema() { Type = "string" } },
                { "errors", new OpenApiSchema() { Type = "array" } }
            };

            var responseDefinition = new OpenApiMediaType
            {
                Schema = new OpenApiSchema
                {
                    Type = "object",
                    AdditionalPropertiesAllowed = true,
                    Properties = properties,
                }
            };

            var responseOk = new OpenApiResponse();
            responseOk.Content.Add("application/json", responseDefinition);
            responseOk.Description = "The API is healthy and responsive";

            var responseBad = new OpenApiResponse();
            responseBad.Content.Add("application/json", responseDefinition);
            responseBad.Description = "The API is unhealthy";

            var operation = new OpenApiOperation
            {
                Summary = "Get the health status for the API",
            };
            operation.Tags.Add(new OpenApiTag { Name = "Health" });
            operation.Responses.Add("200", responseOk);
            operation.Responses.Add("401", new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.Add("503", responseBad);

            pathItem.AddOperation(OperationType.Get, operation);
            openApiDocument?.Paths.Add(HealthCheckEndpoint, pathItem);
        }
    }
}
