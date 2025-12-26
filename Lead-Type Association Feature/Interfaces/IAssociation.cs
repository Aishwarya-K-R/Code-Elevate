using LSQ.Models;

namespace LSQ.Interfaces
{
    public interface IAssociation
    {
        Task<IEnumerable<Lead>> GetPrimaryAssociations(Association association);
        Task<IEnumerable<Lead>> GetSecondaryAssociations(Association association);
        Task<int> GetAssociationCount(Association association);
        Task<string> CreateAssociation(Association association);
        Task<string> DeleteAssociation(Association association);
    }
}