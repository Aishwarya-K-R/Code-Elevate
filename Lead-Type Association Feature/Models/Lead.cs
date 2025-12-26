using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LSQ.Models
{
    public class Lead
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Lead Type is required !!!")]
        public int? LeadType { get; set; }

        public string? LeadTypeName { get; set; }

        [Required(ErrorMessage = "Name is required !!!")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required !!!")]
        [EmailAddress(ErrorMessage = "Invalid email address !!!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Phone Number is required !!!")]
        [Range(1000000000, 9999999999, ErrorMessage = "Phone Number must be 10 digits !!!")]
        public long PhoneNumber { get; set; }

        [JsonIgnore]
        public virtual ICollection<Association> Associations { get; set; } = new List<Association>();
    }
}
