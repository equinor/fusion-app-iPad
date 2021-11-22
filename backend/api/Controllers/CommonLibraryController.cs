using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;
using api.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("/Countries")]
    public class CommonLibraryController : Controller
    {
        private readonly CommonLibraryService _commonLibraryService;

        public CommonLibraryController(CommonLibraryService service)
        {
            _commonLibraryService = service;
        }

        [HttpGet]
        public List<string> GetCountryList()
        {
            return _commonLibraryService.GetAllCountries().Result;
        }
    }
}
