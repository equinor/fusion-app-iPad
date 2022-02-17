using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    // Exclude from swagger documentation
    [ApiExplorerSettings(IgnoreApi = true)]
    [ApiController]
    [Route("/wbs")]
    public class WbsController : Controller
    {
        private readonly WbsService _wbsService;
        private readonly ILogger<WbsController> _logger;

        public WbsController(ILogger<WbsController> logger, WbsService service)
        {
            _wbsService = service;
            _logger = logger;
        }

        /// <summary>
        /// Gets a list of WBS's containg a given WBS code.
        /// </summary>
        /// <param name="wbsCode"></param>
        /// <remarks>
        /// Uses APIM
        /// </remarks>
        /// <returns> List of WBS </returns>
        /// <response code="200"> The list of WBS was successfully returned </response>
        [HttpGet]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<WbsModel>>> GetWbsListAsync(string? wbsCode)
        {
            List<WbsModel> result;
            try
            {
                result = await _wbsService.GetWbsListAsync(wbsCode);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Getting WBS");
                throw;
            }

            return new OkObjectResult(result);
        }
    }
}
