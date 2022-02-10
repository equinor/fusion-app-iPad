using System.ComponentModel.DataAnnotations;

namespace Api.Database.Entities
{
#nullable disable
    public class IPad
    {
        public int Id { get; set; }

        [MaxLength(128)]
        public string YellowTag { get; set; }

        [MaxLength(128)]
        public string LastKnownRITM { get; set; }

        [Required]
        [MaxLength(128)]
        public string Owner { get; set; }

        [MaxLength(128)]
        public string Assignee { get; set; }

        [MaxLength(128)]
        public string Project { get; set; }

        [MaxLength(128)]
        public string DeliveryAddress { get; set; }

        [Required]
        [MaxLength(64)]
        public string ExType { get; set; }

        [Required]
        [MaxLength(64)]
        public string UserType { get; set; }

        [MaxLength(64)]
        public string SimType { get; set; }

        [Required]
        [MaxLength(64)]
        public string Status { get; set; }

    }
}
