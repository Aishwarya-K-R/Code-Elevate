using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LSQ.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Email is required !!!")]
        [EmailAddress(ErrorMessage = "Invalid email address !!!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required !!!")]
        public string? Password { get; set; }

        public enum UserRole { Admin, User }
        public UserRole Role { get; set; }
    }
}