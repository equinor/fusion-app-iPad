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

        /// <summary>
        /// Gets an iPad by its database ID
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <returns> The iPad, if it exists </returns>
        /// <response code="200"> The iPad was successfully returned </response>
        /// <response code="404"> There was no iPad with the given ID in the database </response>
        [HttpGet]
        [Route("{id}")]
        [ProducesResponseType(typeof(List<IPad>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<List<IPad>>> GetIpadById([FromRoute] int id)
        {
            try
            {
                _logger.LogInformation($"Querying to get iPad by ID from database.");

                var iPad = await _database.GetIpadById(id);

                if(iPad is null)
                {
                    _logger.LogError("No iPad with id: {id} in database", id);
                    return NotFound();
                }

                _logger.LogInformation("Successful GET iPad with id: {id} from database.", id);

                return Ok(iPad);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Getting iPads from database");
                throw;
            }

        }

        /// <summary>
        /// Registers a new iPad in the database
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <returns> Id of new iPad </returns>
        /// <response code="201"> The iPad was succesfully posted to database </response>
        /// <response code="400"> The iPad data is invalid </response>
        [HttpPost]
        [ProducesResponseType(typeof(int), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> PostIpad([FromBody] IPad iPad)
        {
            _logger.LogInformation($"Posting new iPad to database");

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            try
            {
                int newId = await _database.AddIpad(iPad);

                _logger.LogInformation($"Successful POST of iPad to database");

                return CreatedAtAction(nameof(GetIpadById), new { id = newId }, iPad);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"POSTing iPad to database");
                throw;
            }
        }
    }
}
