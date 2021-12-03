using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Equinor.TI.CommonLibrary.Client;
using Microsoft.Extensions.Logging;

namespace Api.Services
{
    public class CommonLibraryService
    {
        private readonly CommonLibraryClient _commonLibraryClient;
        private readonly ILogger<CommonLibraryService> _logger;

        /// <summary>
        /// Logger and ClientOptions are provided by the Dependency Injection manager <see cref="Microsoft.Extensions.DependencyInjection.IServiceCollection"/>
        /// in the  <see cref="Startup"/> class, as is standard in ASP.NET projects. 
        /// See <see href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0"/>
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="clientOptions"> The options for the Common Library Client.
        /// The only mandatory option parameter is the "TokenProviderConnectionString" </param>
        public CommonLibraryService(ILogger<CommonLibraryService> logger, CommonLibraryClientOptions clientOptions)
        {
            _commonLibraryClient = new CommonLibraryClient(clientOptions);
            _logger = logger;
        }

        public async Task<List<string>> GetAllCountries()
        {
            _logger.LogInformation("Attempting to retrieve country list from common library");

            List<string> countries;
            try
            {
                countries = await _commonLibraryClient.CodeNameListAsync("Country", isValid: true);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to get list of countries from Common Library");
                throw;
            }

            _logger.LogInformation("Successfully retrieved country list from common library");

            return countries;
        }

        /// <summary>
        /// Formats and returns the "TokenProviderConnectionString" used in the <see cref="CommonLibraryClientOptions"/>
        /// </summary>
        /// <param name="clientId"> The client ID of the app registration in AzureAD </param>
        /// <param name="tenantId"> The tenant ID of the app registration in AzureAD </param>
        /// <param name="clientSecret"> The client secret of the app registration in AzureAD </param>
        /// <returns>
        /// A "TokenProviderConnectionString" in the format "RunAs=App;AppId=<paramref name="clientId"/>;TenantId=<paramref name="tenantId"/>;AppKey=<paramref name="clientSecret"/>"
        /// </returns>
        public static string BuildTokenConnectionString(string clientId, string tenantId, string clientSecret)
        {
            return $"RunAs=App;AppId={clientId};TenantId={tenantId};AppKey={clientSecret}";
        }
    }
}
