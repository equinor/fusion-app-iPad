using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("/")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public string Index()
        {
            return JsonSerializer.Serialize("Hello World");
        }
    }
}
