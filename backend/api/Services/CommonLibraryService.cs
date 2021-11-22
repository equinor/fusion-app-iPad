using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Equinor.TI.CommonLibrary.Client;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;

namespace api.Services
{
    public class CommonLibraryService
    {
        private readonly CommonLibraryClient _commonLibraryClient;
        private readonly ILogger<CommonLibraryService> _logger;

        /// <summary>
        /// Configures client and logger.
        /// </summary>
        /// <param name="logger"></param>
        /// <param name="clientOptions"></param>
        public CommonLibraryService(ILogger<CommonLibraryService> logger, CommonLibraryClientOptions clientOptions)
        {
            _commonLibraryClient = new CommonLibraryClient(clientOptions);
            _logger = logger;
        }

        public async Task<List<string>> GetAllCountries()
        {
            _logger.LogInformation("Attempting to retrieve country list from common library");

            List<string> countries = await _commonLibraryClient.CodeNameListAsync("Country", isValid:true);

            _logger.LogInformation("Successfully retrieved country list from common library");

            return countries;
        }
    }
}
