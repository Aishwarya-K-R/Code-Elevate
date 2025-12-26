using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace LSQ.Models
{
    public class Association
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("Lead")]
        [Required(ErrorMessage = "Parent Id is required !!!")]
        public int ParentId { get; set; }
        
        [JsonIgnore]
        public Lead? Lead { get; set; }

        [Required(ErrorMessage = "Child Ids are required !!!")]
        [NotMapped]
        public List<int>? ChildIds
        {
            get => string.IsNullOrEmpty(ChildIdsJson) ? new List<int>() : JsonSerializer.Deserialize<List<int>>(ChildIdsJson);
            set => ChildIdsJson = JsonSerializer.Serialize(value);
        }
        public string? ChildIdsJson { get; set; }

        [Required(ErrorMessage = "Association Schema is required !!!")]
        [NotMapped]
        public List<string>? AssociationSchema
        {
            get => string.IsNullOrEmpty(AssociationSchemaJson) ? new List<string>() : JsonSerializer.Deserialize<List<string>>(AssociationSchemaJson);
            set => AssociationSchemaJson = JsonSerializer.Serialize(value);
        }
        public string? AssociationSchemaJson { get; set; }
    }
}