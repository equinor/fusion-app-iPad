using System.ComponentModel.DataAnnotations;
using Api.Database.Models;

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

        [Required]
        [MaxLength(128)]
        public string OwnerId { get; set; }

        [MaxLength(128)]
        public string Assignee { get; set; }

        [MaxLength(128)]
        public string AssigneeId { get; set; }

        [MaxLength(128)]
        public string Project { get; set; }

        [MaxLength(128)]
        public string ProjectId { get; set; }

        [MaxLength(128)]
        public string DeliveryAddress { get; set; }

        public ExClassEnum ExClass { get; set; }

        public UserTypeEnum? UserType { get; set; }

        public SimTypeEnum SimType { get; set; }

        [Required]
        public StatusEnum Status { get; set; }
    }
}
