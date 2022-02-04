using Microsoft.EntityFrameworkCore;
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

        public async Task<PagedList<IPad>> GetIpads(IPadParameters iPadParameters)
        {
            return await PagedList<IPad>.ToPagedList(_dbContext.IPads.Select(iPad => iPad), iPadParameters.PageNumber, iPadParameters.PageSize);
        }

        public async Task<IPad?> GetIpadById(int id)
        {
            return await _dbContext.IPads.FirstOrDefaultAsync(ipad => ipad.Id == id);
        }

        public async Task<int> AddIpad(IPad iPad)
        {
            var entry = _dbContext.IPads.Add(iPad);
            await _dbContext.SaveChangesAsync();
            return entry.Entity.Id;
        }

        public async Task<IPad> DeleteIpad(IPad iPad)
        {
            _dbContext.IPads.Remove(iPad);
            await _dbContext.SaveChangesAsync();
            return iPad;
        }

    }
}
