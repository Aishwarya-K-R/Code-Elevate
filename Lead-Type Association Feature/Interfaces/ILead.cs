using LSQ.Models;

namespace LSQ.Interfaces
{
    public interface ILead
    {
        public Task<IEnumerable<Lead>> GetLeads(  
            string search = "",
            string sortCol = "Name",
            string sortDir = "desc",
            int pageNo = 1,
            int pageSize = 3
        );
        public Task<Lead> GetLeadById(int id);
        public Task<Lead> AddLead(Lead lead);
        public Task<string> UpdateLead(int id, Lead lead);
        public Task<string> DeleteLead(int id);
    }
}