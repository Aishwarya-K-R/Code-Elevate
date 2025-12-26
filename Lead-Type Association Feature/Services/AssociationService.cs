using LSQ.Data;
using LSQ.Interfaces;
using LSQ.Models;
using Microsoft.EntityFrameworkCore;

namespace LSQ.Services
{
    public class AssociationService (AppDbContext context) : IAssociation
    {
        private readonly AppDbContext _context = context;

        public async Task<IEnumerable<Lead>> GetPrimaryAssociations(Association association)
        {
            if(association == null || association.AssociationSchema.Count() != 1)
            {
                throw new ArgumentException("Invalid Data !!!");
            }

            var leadById = await _context.Leads.Where(l => l.Id == association.ParentId).FirstOrDefaultAsync();
            if(leadById == null)
            {
                throw new KeyNotFoundException("Invalid Parent Id !!!");
            }

            var associations = await _context.Associations.Where(a => a.ParentId == association.ParentId).ToListAsync();
            associations = associations.Where(a => a.AssociationSchema!.Contains(association.AssociationSchema[0])).ToList();
            if(associations.Count == 0)
            {
                throw new InvalidOperationException("Invalid Association Schema or no Associations found !!!");
            }

            var childIds = associations.SelectMany(a => a.ChildIds ?? new List<int>()).ToList();
            return await _context.Leads.Where(l => childIds.Contains(l.Id)).ToListAsync();
        }

        public async Task<IEnumerable<Lead>> GetSecondaryAssociations(Association association)
        {
            if (association == null || association.AssociationSchema.Count() != 1 || association.ChildIds.Count() != 1)
                throw new ArgumentException("Invalid Data !!!");

            var leadById = await _context.Leads.Where(l => l.Id == association.ChildIds[0]).FirstOrDefaultAsync();
            if (leadById == null)
                throw new KeyNotFoundException("Invalid Child Id !!!");

            // Fetch all associations (with mapped properties only), then filter in memory
            var associationsList = await _context.Associations.ToListAsync();
            var associations = associationsList
                .Where(a => a.ChildIds != null && a.ChildIds.Contains(association.ChildIds[0])
                    && a.AssociationSchema != null && a.AssociationSchema.Contains(association.AssociationSchema[0]))
                .ToList();

            if (associations.Count == 0)
                throw new InvalidOperationException("Invalid Association Schema or no Associations found !!!");

            var parentIds = associations.Select(a => a.ParentId).ToList();
            return await _context.Leads.Where(l => parentIds.Contains(l.Id)).ToListAsync();
        }

        public async Task<int> GetAssociationCount(Association association)
        {
            if(association == null || association.AssociationSchema.Count() != 1 )
            {
                throw new ArgumentException("Invalid Data !!!");
            }

            var leadById = await _context.Leads.Where(l => l.Id == association.ParentId).FirstOrDefaultAsync();
            if(leadById == null)
            {
                throw new KeyNotFoundException("Invalid Parent Id !!!");
            }

            var associations = await _context.Associations.Where(a => a.ParentId == association.ParentId).ToListAsync();
            associations = associations.Where(a => a.AssociationSchema!.Contains(association.AssociationSchema[0])).ToList();
            if(associations.Count == 0)
            {
                throw new InvalidOperationException("Invalid Association Schema or no Associations found !!!");
            }

            var childIds = associations.SelectMany(a => a.ChildIds ?? new List<int>()).ToList();
            return childIds.Count;
        }

        public async Task<string> CreateAssociation(Association association)
        {
            if (association == null || association.ChildIds.Count() == 0)
                throw new ArgumentException("Invalid Data !!!");

            var parent = await _context.Leads.FirstOrDefaultAsync(l => l.Id == association.ParentId);
            if (parent == null)
                throw new KeyNotFoundException("Invalid Parent Id !!!");

            var children = await _context.Leads.Where(l => association.ChildIds.Contains(l.Id)).ToListAsync();
            if (children.Count != association.ChildIds.Count())
                throw new InvalidDataException("Invalid Child Ids !!!");

            if (children.Any(c => c.LeadType == parent.LeadType))
                throw new InvalidOperationException("Associations cannot be created between the leads of same Lead Type !!!");

            var pOType = parent.LeadType;
            var childrenByType = children.GroupBy(c => c.LeadType);
            foreach (var group in childrenByType)
            {
                var cOType = group.Key;
                var schema = $"OT-{pOType}_OT-{cOType}";
                var childIdsOfType = group.Select(c => c.Id).ToList();

                var associationsList = await _context.Associations
                    .Where(a => a.ParentId == association.ParentId)
                    .ToListAsync();

                var existingAssociation = associationsList
                    .FirstOrDefault(a => a.AssociationSchema != null && a.AssociationSchema.Contains(schema));

                if (existingAssociation != null)
                {
                    var newChildren = childIdsOfType.Except(existingAssociation.ChildIds ?? new List<int>()).ToList();
                    if (newChildren.Any())
                    {
                        var updatedList = existingAssociation.ChildIds ?? new List<int>();
                        updatedList.AddRange(newChildren);
                        existingAssociation.ChildIds = updatedList.Distinct().ToList();
                        _context.Entry(existingAssociation).Property("ChildIdsJson").IsModified = true;
                    }
                }
                else
                {
                    List<string> associationSchemaList = new() { schema };
                    Association addAssociation = new()
                    {
                        ParentId = association.ParentId,
                        ChildIds = childIdsOfType.Distinct().ToList(),
                        AssociationSchema = associationSchemaList
                    };
                    await _context.Associations.AddAsync(addAssociation);
                }
            }

            await _context.SaveChangesAsync();
            return "Associations created successfully !!!";
        }

        public async Task<string> DeleteAssociation(Association association)
        {
            if(association.ChildIds.Count() != 1 || association.AssociationSchema.Count() != 1 )
            {
                throw new ArgumentException("Invalid Data !!!");
            }

            var parent =  await _context.Leads.Where(l => l.Id == association.ParentId).FirstOrDefaultAsync();
            if(parent == null)
            {
                throw new KeyNotFoundException("Invalid Parent Id !!!");
            }

            var child = await _context.Leads.Where(l => l.Id == association.ChildIds[0]).FirstOrDefaultAsync();
            if(child == null)
            {
                throw new InvalidDataException("Invalid Child Id !!!");
            }

            var associationsList = await _context.Associations.Where(p => p.ParentId == association.ParentId).ToListAsync();
            var associations = associationsList.FirstOrDefault(p =>
                    p.AssociationSchema != null && p.AssociationSchema.Contains(association.AssociationSchema[0]) &&
                    p.ChildIds != null && p.ChildIds.Contains(association.ChildIds[0])
            );
            if(associations == null)
            {
                throw new KeyNotFoundException("Invalid Association Schema or no Associations found !!!");
            }

            var updatedList = associations.ChildIds ?? new List<int>();
            updatedList.Remove(association.ChildIds[0]);
            if (updatedList.Count == 0)
            {
                _context.Associations.Remove(associations);
            }
            else
            {
                associations.ChildIds = updatedList;
                _context.Entry(associations).Property("ChildIdsJson").IsModified = true;
            }

            await _context.SaveChangesAsync();
            return "Association deleted successfully !!!";
        }
    }
}