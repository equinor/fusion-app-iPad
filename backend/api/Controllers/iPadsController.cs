﻿using Api.ActionFilters;
using Api.Database;
using Api.Database.Entities;
using Api.Database.Models;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Api.Controllers
{
    // Database access is regulated by special roles for other applications in addition to the user roles
    [Authorize("DatabasePolicy")]
    [Route("/ipads")]
    [ApiController]
    public class IPadsController : ControllerBase
    {
        private readonly IPadDatabaseAccess _database;
        private readonly ILogger<IPadsController> _logger;
        private readonly IConfiguration _configuration;

        public IPadsController(IPadDatabaseAccess database, ILogger<IPadsController> logger, IConfiguration configuration)
        {
            _database = database;
            _logger = logger;
            _configuration = configuration;
        }

        /// <summary>
        /// Gets a list of the iPads in the database.
        /// </summary>
        /// <remarks>
        /// Responses are paginated.
        ///
        /// Example query:
        ///
        ///     /ipads?exClass=zone1&amp;userType=equinor&amp;owner=to&amp;tag=12&amp;ritm=ritm
        ///
        /// <para> This query gets all iPads with ExClass="Zone1", UserType="Equinor", whose Owner contains the substring "to"
        /// , whose YellowTag contains the substring "12", and whose LastKnownRITM contains the substring "ritm"</para>
        /// </remarks>
        /// <returns> List of iPads </returns>
        /// <response code="200"> The list of iPads was successfully returned </response>
        /// <response code="400"> The query is invalid </response>
        [HttpGet]
        [ProducesResponseType(typeof(List<IPad>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [RBAC(Role.DatabaseRead)]
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

                Response.Headers.Add(QueryStringParameters.PaginationHeader, JsonConvert.SerializeObject(metadata));

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
        [ProducesResponseType(typeof(IPad), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [RBAC(Role.DatabaseRead)]
        public async Task<ActionResult<IPad>> GetIpadById([FromRoute] int id)
        {
            try
            {
                _logger.LogInformation($"Querying to get iPad by ID from database.");

                var iPad = await _database.GetIpadById(id);

                if (iPad is null)
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
        [ProducesResponseType(typeof(IPad), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [RBAC(Role.DatabaseCreate)]
        public async Task<ActionResult<IPad>> PostIpad([FromBody] IPad iPad)
        {
            _logger.LogInformation($"Posting new iPad to database");

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            try
            {
                var newIpad = await _database.AddIpad(iPad);

                _logger.LogInformation($"Successful POST of iPad to database");

                return CreatedAtAction(nameof(GetIpadById), new { id = newIpad.Id }, newIpad);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"POSTing iPad to database");
                throw;
            }
        }

        /// <summary>
        /// Updates an iPad in the database
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <returns> Updated iPad </returns>
        /// <response code="200"> The iPad was succesfully updated </response>
        /// <response code="400"> The iPad data is invalid </response>
        /// <response code="404"> There was no iPad with the given ID in the database </response>
        [HttpPut]
        [Route("{id}")]
        [ProducesResponseType(typeof(IPad), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [RBAC(Role.DatabaseModify)]
        public async Task<ActionResult<IPad>> UpdateIpad([FromRoute] int id, [FromBody] IPad iPad)
        {
            _logger.LogInformation("Updating iPad with id: {id}", id);

            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            if (id != iPad.Id)
            {
                _logger.LogError("Id: {id} not corresponding to updated iPad", id);
                return BadRequest("Inconsistent Id");
            }

            try
            {
                var updatedIpad = await _database.UpdateIpad(iPad);

                _logger.LogInformation($"Successful PUT of iPad to database");

                return Ok(iPad);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"PUTing iPad to database");
                throw;
            }
        }

        /// <summary>
        /// Deletes an iPad from the database
        /// </summary>
        /// <remarks>
        /// </remarks>
        /// <returns> The iPad, if deleted </returns>
        /// <response code="200"> The iPad was succesfully deleted from the database </response>
        /// <response code="404"> There was no iPad with the given ID in the database </response>
        [HttpDelete]
        [Route("{id}")]
        [ProducesResponseType(typeof(IPad), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [RBAC(Role.DatabaseModify)]
        public async Task<ActionResult<IPad>> DeleteIpad([FromRoute] int id)
        {
            try
            {
                _logger.LogInformation($"Querying to get iPad by ID from database.");

                var iPad = await _database.GetIpadById(id);

                if (iPad is null)
                {
                    _logger.LogError("No iPad with id: {id} in database", id);
                    return NotFound();
                }

                _logger.LogInformation("Attempting to remove iPad with id: {id} from database.", id);

                var removedIpad = await _database.DeleteIpad(iPad);

                _logger.LogInformation("iPad with id: {id} successfully deleted from database.", id);

                return Ok(iPad);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Deleting iPad from database");
                throw;
            }
        }
    }
}
