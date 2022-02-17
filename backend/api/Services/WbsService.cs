﻿using System.Net.Http.Headers;
using System.Text.Json;
using System.Web;
using Api.Models;
using Microsoft.Identity.Web;

namespace Api.Services
{
    public class WbsService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<WbsService> _logger;
        private readonly ITokenAcquisition _tokenAcquisition;
        private readonly string _scope;
        public const string ClientName = "WbsApiClient";

        /// <summary>
        /// Logger is provided by the Dependency Injection manager <see cref="IServiceCollection"/>
        /// in the <see cref="Startup"/> class, as is standard in ASP.NET projects. 
        /// See <see href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0"/>
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="httpClientFactory"></param>
        /// <param name="tokenAcquisition">Token acquirer</param>
        /// <param name="configuration"></param>
        public WbsService(ILogger<WbsService> logger, IHttpClientFactory httpClientFactory, ITokenAcquisition tokenAcquisition, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _tokenAcquisition = tokenAcquisition;
            _scope = configuration["WbsApi:Scope"];
        }

        public async Task<List<WbsModel>> GetWbsListAsync(string? wbsCode)
        {
            var httpClient = _httpClientFactory.CreateClient(ClientName);

            HttpResponseMessage responseMessage;
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer", await _tokenAcquisition.GetAccessTokenForUserAsync(new[] { _scope }));
            string? urlEncodedWbsCode = HttpUtility.UrlEncode(wbsCode);
            _logger.LogInformation("Attempting to retrieve WBS list from APIM");
            try
            {
                responseMessage = await httpClient.GetAsync(new Uri($"?api-version=1.0&code={urlEncodedWbsCode}", UriKind.Relative));
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to get list of WBS from APIM");
                throw;
            }

            if (!responseMessage.IsSuccessStatusCode)
            {
                _logger.LogError("Non-success status code '{StatusCode}' retrieved when querying WBS API with code '{wbsCode}'", responseMessage.StatusCode, wbsCode);
                throw new AggregateException($"Non-success status code: {responseMessage.StatusCode} when querying WBS API");
            }
            string wbsJson = await responseMessage.Content.ReadAsStringAsync();
            _logger.LogInformation("Successfully retrieved WBS list from APIM");
            try
            {
                var wbsList = JsonSerializer.Deserialize<List<WbsResponseModel>>(wbsJson);
                return wbsList != null ? wbsList.Select(apiResponse => new WbsModel
                {
                    Code = apiResponse.Code,
                    Description = apiResponse.Description,
                    ActiveStatusIds = apiResponse.ActiveStatusIds,
                }).ToList() : new List<WbsModel>();
            }
            catch (Exception e)
            {
                if (e is JsonException)
                {
                    _logger.LogError(e, "Received response from WBS API, but JSON did not match the WbsModel properly");
                }
                else
                {
                    _logger.LogError(e, "Received response from WBS API, but failed to parse it");
                }
                throw;
            };
        }
    }
}
