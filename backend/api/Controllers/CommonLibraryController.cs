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
        private readonly ILogger<CommonLibraryService> _logger;

        public CommonLibraryController(ILogger<CommonLibraryService> logger, CommonLibraryService service)
        {
            _commonLibraryService = service;
        }

        [HttpGet]
        public ActionResult<List<string>> GetCountryList()
        {
            List<string> result;
            try
            {
                result = _commonLibraryService.GetAllCountries().Result;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Getting countries");
                return new StatusCodeResult(500);
            }

            return new OkObjectResult(result);
        }
    }
}
