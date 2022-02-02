using Api.Database.Entities;
using Api.Database.Models;
using Api.Utilities;

namespace Api.Database
{
    /// <summary>
    /// This represents our Data Access Layer
    /// </summary>
    public class IPadDatabaseAccess
    {
        private readonly DatabaseContext _dbContext;

        public IPadDatabaseAccess(DatabaseContext context)
        {
            _dbContext = context;
        }

        public async Task<PagedList<IPad>> GetIPads(IPadParameters iPadParameters)
        {
            return await PagedList<IPad>.ToPagedList(_dbContext.IPads.Select(iPad => iPad), iPadParameters.PageNumber, iPadParameters.PageSize);
        }
    }
}
