using System.ComponentModel.DataAnnotations;

namespace Api.Database.Entities
{
    public class IPad
    {
        public IPad(string yellowTag, string lastKnownRITM, string owner, string project, string location, string exType, string userType, string simType, string status)
        {
            YellowTag = yellowTag;
            LastKnownRITM = lastKnownRITM;
            Owner = owner;
            Project = project;
            DeliveryAddress = location;
            ExType = exType;
            UserType = userType;
            SimType = simType;
            Status = status;
        }

        public int Id { get; set; }

        [MaxLength(128)]
        public string YellowTag { get; set; }

        [MaxLength(128)]
        public string LastKnownRITM { get; set; }

        [Required]
        [MaxLength(128)]
        public string Owner { get; set; }

        [MaxLength(128)]
        public string? Assignee { get; set; }

        [MaxLength(128)]
        public string Project { get; set; }

        [Required]
        [MaxLength(128)]
        public string DeliveryAddress { get; set; }

        [Required]
        [MaxLength(64)]
        public string ExType { get; set; }

        [Required]
        [MaxLength(64)]
        public string UserType { get; set; }

        [Required]
        [MaxLength(64)]
        public string SimType { get; set; }

        [Required]
        [MaxLength(64)]
        public string Status { get; set; }

    }
}
