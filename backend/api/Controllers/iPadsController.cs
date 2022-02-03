using Api.Database;
using Api.Database.Entities;
using Api.Database.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class iPadsController : ControllerBase
    {
        private readonly IPadDatabaseAccess _database;
        private readonly ILogger<iPadsController> _logger;

        public iPadsController(IPadDatabaseAccess database, ILogger<iPadsController> logger)
        {
            _database = database;
            _logger = logger;
        }

        /// <summary>
        /// Gets a list of the iPads in the database.
        /// </summary>
        /// <remarks>
        /// Responses are paginated and can be set by query parameters "pageNumber" and "pageSize"
        /// Default values are pageSize=10 and pageNumber=1
        /// Max value for pageSize is set to 100
        /// </remarks>
        /// <returns> List of iPads </returns>
        /// <response code="200"> The list of iPads was successfully returned </response>
        [HttpGet]
        [ProducesResponseType(typeof(List<IPad>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<IPad>>> GetIpads([FromQuery] IPadParameters iPadParameters)
        {
            try
            {
                _logger.LogInformation($"Querying to get list of iPads from database.");

                var iPads = await _database.GetIpads(iPadParameters);

                var metadata = new
                {
                    iPads.TotalCount,
                    iPads.PageSize,
                    iPads.CurrentPage,
                    iPads.TotalPages,
                    iPads.HasNext,
                    iPads.HasPrevious
                };

                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

                _logger.LogInformation($"Successful GET list of iPads from database.");

                return Ok(iPads);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Getting iPads from database");
                throw;
            }

        }
    }
}
