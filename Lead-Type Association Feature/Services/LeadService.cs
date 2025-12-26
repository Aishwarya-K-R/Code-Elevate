using System.Text.Json;
using LSQ.Data;
using LSQ.Interfaces;
using LSQ.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;

namespace LSQ.Services
{
    public class LeadService(AppDbContext context, IMemoryCache memoryCache, IDistributedCache redisCache, ILogger<LeadService> logger) : ILead
    {
        private readonly AppDbContext _context = context;
        private readonly IMemoryCache _memoryCache = memoryCache;
        private readonly IDistributedCache _redisCache = redisCache;
        private readonly ILogger<LeadService> _logger = logger;

        public async Task<IEnumerable<Lead>> GetLeads(string search, string sortCol, string sortDir, int pageNo, int pageSize)
        {
            var leads = await _context.Leads.FromSqlRaw("CALL GetLeadsSP({0}, {1}, {2}, {3}, {4})", search, sortCol, sortDir, pageNo, pageSize).ToListAsync();
            if(leads.Count == 0)
            {
                throw new KeyNotFoundException("No leads found !!!");
            }
            return leads;
        }

        public async Task<Lead> GetLeadById(int id)
        {
            string cacheKey = $"Lead_{id}";

            // Try Memory Cache
            _logger.LogInformation($"Trying to get lead with ID {id} from Memory Cache...");
            if(_memoryCache.TryGetValue(cacheKey, out Lead cachedLead))
            {
                _logger.LogInformation($"Lead with ID {id} found in Memory Cache");
                return cachedLead;
            }

            // If Memory Cache miss, try Redis Cache
            _logger.LogInformation($"Memory Cache miss. Trying to get lead with ID {id} from Redis Cache...");
            var lead = await _redisCache.GetStringAsync(cacheKey);
            if(lead != null)
            {
                _logger.LogInformation($"Lead with ID {id} found in Redis Cache");
                _logger.LogInformation($"Storing lead with ID {id} in Memory Cache...");
                var leadObj = JsonSerializer.Deserialize<Lead>(lead);
                _memoryCache.Set(
                    cacheKey,
                    leadObj,
                    new MemoryCacheEntryOptions
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
                        SlidingExpiration = TimeSpan.FromMinutes(2)
                    });
                _logger.LogInformation($"Lead with ID {id} stored in Memory Cache.");
                return leadObj;
            }

            // If both caches miss, fetch from DB
            _logger.LogInformation($"Redis Cache miss. Fetching lead with ID {id} from Database...");
            var leadById = await _context.Leads.FindAsync(id);
            if(leadById == null)
            {
                throw new KeyNotFoundException("Lead not found !!!");
            }

            // Store in both caches
            _logger.LogInformation($"Found lead with ID {id} in Database. Caching now...");
            _logger.LogInformation($"Storing lead with ID {id} in both Redis and Memory Cache...");
            _memoryCache.Set(
                cacheKey,
                leadById,
                new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5),
                    SlidingExpiration = TimeSpan.FromMinutes(2)
                });
            await _redisCache.SetStringAsync(cacheKey, JsonSerializer.Serialize(leadById),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
                    SlidingExpiration = TimeSpan.FromMinutes(5)
                });

            _logger.LogInformation($"Lead with ID {id} stored in both Redis and Memory Cache.");
            return leadById;
        }

        public async Task<Lead> AddLead(Lead lead)
        {
            string? email = await _context.Leads.Where(l => l.Email == lead.Email).Select(l => l.Email).FirstOrDefaultAsync();

            if (email != null)
            {
                throw new KeyNotFoundException("Lead with the same email already exists !!!");
            }

            long phoneNumber = await _context.Leads.Where(l => l.PhoneNumber == lead.PhoneNumber).Select(l => l.PhoneNumber).FirstOrDefaultAsync();

            if (phoneNumber != 0)
            {
                throw new InvalidCastException("Lead with the same phone number already exists !!!");
            }

            Lead addLead = new()
            {
                Name = lead.Name,
                Email = lead.Email,
                PhoneNumber = lead.PhoneNumber,
                LeadType = lead.LeadType,
                LeadTypeName = "LT-"+ lead.LeadType.ToString()
            };

            await _context.Leads.AddAsync(addLead);
            await _context.SaveChangesAsync();

            return addLead;
        }

        public async Task<string> UpdateLead(int id, Lead lead)
        {
            var getLead = await _context.Leads.FindAsync(id);
            if(getLead == null)
            {
                throw new ArgumentException("Lead with the given Id does not exist !!!");
            }

            if(lead.Name != null)
            {
                getLead.Name = lead.Name;
            }

            var leadByEmail = await _context.Leads.Where(l => lead.Email != null && l.Email == lead.Email && l.Id != id).Select(l => l.Email).FirstOrDefaultAsync();

            if (leadByEmail != null)
            {
                throw new KeyNotFoundException("Lead with the same email already exists !!!");
            }

            getLead.Email = lead.Email;

            var leadByPhone = await _context.Leads.Where(l => l.PhoneNumber == lead.PhoneNumber && l.Id != id).Select(l => l.PhoneNumber).FirstOrDefaultAsync();

            if (leadByPhone != 0)
            {
                throw new InvalidCastException("Lead with the same phone number already exists !!!");
            }

            getLead.PhoneNumber = lead.PhoneNumber;

            await _context.SaveChangesAsync();

            // Invalidate caches
            _memoryCache.Remove($"lead_{id}");
            await _redisCache.RemoveAsync($"lead_{id}");

            return "Lead updated successfully !!!";
        }

        public async Task<string> DeleteLead(int id)
        {
            // Remove all associations where this lead is a parent
            var associations = _context.Associations.Where(a => a.ParentId == id);
            _context.Associations.RemoveRange(associations);

            var lead = _context.Leads.Find(id);
            if(lead == null)
            {
                throw new ArgumentException("Lead with the given Id does not exist !!!");
            }

            _context.Leads.Remove(lead);
            await _context.SaveChangesAsync();

            // Invalidate caches
            _memoryCache.Remove($"lead_{id}");
            await _redisCache.RemoveAsync($"lead_{id}");

            return "Lead deleted successfully !!!";
        }
    }
}