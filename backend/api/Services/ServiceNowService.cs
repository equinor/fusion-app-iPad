using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Api.Services
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
        public Task<string> SubmitIpadOrderForm(string iPadFormJson)
        {
            _logger.LogInformation("Attempting to post order form to Service Now");

            if (!FormIsValid(iPadFormJson))
            {
                _logger.LogError("Invalid form");
                throw new ArgumentException("Invalid form");
            }

            // TODO: Add actual service now logic - Waiting for service now integration
            string ritm = "RITM1234567_test";

            _logger.LogInformation("Succesfully posted form to Service Now with RITM " + ritm);

            return Task.FromResult(ritm);
        }

        private static bool FormIsValid(string iPadFormJson)
        {
            //TODO: Add form validation - Waiting for service now integration
            if (iPadFormJson.Equals("ErrorForm", StringComparison.OrdinalIgnoreCase))
                return false;

            return true;
        }
    }
}
