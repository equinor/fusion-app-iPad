using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [ApiController]
    [Route("/Countries")]
    public class CommonLibraryController : Controller
    {
        private readonly CommonLibraryService _commonLibraryService;
        private readonly ILogger<CommonLibraryController> _logger;

        public CommonLibraryController(ILogger<CommonLibraryController> logger, CommonLibraryService service)
        {
            _commonLibraryService = service;
            _logger = logger;
        }

        /// <summary>
        /// Gets a list of the names of all countries in common library.
        /// </summary>
        /// <remarks>
        /// Uses the common library api
        /// </remarks>
        /// <returns> List of countries </returns>
        /// <response code="200"> The list of countries was successfully returned </response>
        [HttpGet]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<string>>> GetCountryList()
        {
            List<string> result;
            try
            {
                result = await _commonLibraryService.GetAllCountries();
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Getting countries");
                throw;
            }

            _logger.LogInformation("Successful GET countries from Common Library");
            return new OkObjectResult(result);
        }
    }
}
