using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace api.Controllers
{
    [ApiController]
    [Route("/OrderForm")]
    public class ServiceNowController : Controller
    {
        private readonly ServiceNowService _sNowService;
        private readonly ILogger<ServiceNowController> _logger;

        public ServiceNowController(ILogger<ServiceNowController> logger, ServiceNowService service)
        {
            _sNowService = service;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostIpadOrderForm(string orderFormJson)
        {
            string ritm;
            try
            {
                ritm = await _sNowService.SubmitIpadOrderForm(orderFormJson);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Submitting form");

                // Select appropriate status code (400 - Bad request if argument exception, 500 if something else)
                int statusCode = e switch
                {
                    ArgumentException => StatusCodes.Status400BadRequest,
                    _ => StatusCodes.Status500InternalServerError
                };

                return new StatusCodeResult(statusCode);
            }

            _logger.LogInformation("Successful POST iPad order form to Service Now");
            return new OkObjectResult(JsonSerializer.Serialize(ritm));
        }
    }
}
