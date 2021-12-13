using System;
using System.Text.Json;
using System.Threading.Tasks;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    [ApiController]
    [Route("/order-form")]
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
                _logger.LogError(e, "Posting form");

                // 400 - Bad request if argument exception
                if (e is ArgumentException)
                    return new StatusCodeResult(StatusCodes.Status400BadRequest);

                throw;
            }

            _logger.LogInformation("Successful POST iPad order form to Service Now");

            //TODO: Add location url
            return new CreatedResult("LocationURL", JsonSerializer.Serialize(ritm));
        }
    }
}
