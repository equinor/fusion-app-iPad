using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using api.Services;
using Microsoft.Extensions.Logging;

namespace api.Controllers
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

        [HttpGet]
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
                return new StatusCodeResult(500);
            }

            _logger.LogInformation("Successful GET countries from Common Library");
            return new OkObjectResult(result);
        }
    }
}
