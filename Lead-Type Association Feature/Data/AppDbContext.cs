using LSQ.Models;
using Microsoft.EntityFrameworkCore;

namespace LSQ.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Lead> Leads { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Association> Associations { get; set; }
    }
}
