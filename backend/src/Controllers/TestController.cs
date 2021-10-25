namespace Api.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("/")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public string Index()
        {
            return "Hello World";
        }
    }
}
