using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Services;
using Microsoft.AspNetCore.Authorization;
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


        /// <summary>
        /// Submits an iPad order form and returns the RITM of the resulting service now request
        /// </summary>
        /// <remarks>
        /// Uses the Service Now API  
        ///   
        /// Sample request:  
        /// POST  
        /// {  
        ///     "FORM HERE - UPDATE WHEN KNOWN FORMAT"  
        /// }  
        /// </remarks>
        /// <param name="orderFormJson"> The form to submit in JSON format </param>
        /// <returns> RITM to Service now request </returns>
        /// <response code="201"> The form was submitted successfully </response>
        /// <response code="400"> The form was of an invalid format </response>
        [ProducesResponseType(typeof(string), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<ActionResult<string>> PostIpadOrderForm([FromBody] string orderFormJson)
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

            //TODO: Add location url
            return new CreatedResult("LocationURL", JsonSerializer.Serialize(ritm));
        }
    }
}
