using Api.Database.Entities;
using Api.Database.Models;
using Api.Utilities;
using Microsoft.EntityFrameworkCore;

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
            // construct filter
            var filter = IPadQueries.ConstructFilter(iPadParameters);

            var ipads = _dbContext.IPads.Where(filter).AsNoTracking();

            // Apply searches
            IPadQueries.SearchByOwner(ref ipads, iPadParameters.Owner);
            IPadQueries.SearchByTag(ref ipads, iPadParameters.Tag);
            IPadQueries.SearchByRitm(ref ipads, iPadParameters.Ritm);

            // Query database and return paged result
            return await PagedList<IPad>.ToPagedList(ipads.OrderBy(i => i.Id), iPadParameters.PageNumber, iPadParameters.PageSize);
        }

        public async Task<IPad?> GetIpadById(int id)
        {
            return await _dbContext.IPads.FirstOrDefaultAsync(ipad => ipad.Id == id);
        }

        public async Task<IPad> AddIpad(IPad iPad)
        {
            var entry = _dbContext.IPads.Add(iPad);
            await _dbContext.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<IPad> UpdateIpad(IPad iPad)
        {
            var entry = _dbContext.IPads.Update(iPad);
            await _dbContext.SaveChangesAsync();
            return entry.Entity;
        }

        public async Task<IPad> DeleteIpad(IPad iPad)
        {
            var entry = _dbContext.IPads.Remove(iPad);
            await _dbContext.SaveChangesAsync();
            return entry.Entity;
        }
    }
}
