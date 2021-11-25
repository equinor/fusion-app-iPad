using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Equinor.TI.CommonLibrary.Client;
using Microsoft.Extensions.Logging;

namespace api.Services
{
    public class ServiceNowService
    {
        private readonly ILogger<CommonLibraryService> _logger;

        /// <summary>
        /// Logger is provided by the Dependency Injection manager <see cref="Microsoft.Extensions.DependencyInjection.IServiceCollection"/>
        /// in the  <see cref="Startup"/> class, as is standard in ASP.NET projects. 
        /// See <see href="https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection?view=aspnetcore-6.0"/>
        /// </summary>
        /// <param name="logger"></param>
        public ServiceNowService(ILogger<CommonLibraryService> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Submits order form for iPads.
        /// </summary>
        /// <param name="iPadFormJson"> The JSON representing the filled out form from frontend </param>
        /// <returns>
        /// The RITM generated for the request by service now
        /// </returns>
        /// <exception cref="ArgumentException"></exception>
        public async Task<string> SubmitIpadOrderForm(string iPadFormJson)
        {
            if (!FormIsValid(iPadFormJson))
            {
                _logger.LogError("Invalid iPad order form");
                throw new ArgumentException("invalid iPad ordering form");
            }

            // TODO: Add actual service now logic - Waiting for service now integration
            return "RITM1234567_test";
        }

        private bool FormIsValid(string iPadFormJson)
        {
            //TODO: Add form validation - Waiting for service now integration
            if (iPadFormJson.Equals("ErrorForm", StringComparison.OrdinalIgnoreCase))
                return false;

            return true;
        }
    }
}
