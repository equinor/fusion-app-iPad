namespace Api.Database.Models
{
    public class IPadParameters : QueryStringParameters
    {
        /// <summary>
        /// Enum: [ 'NonEx' = 0 | 'Zone1' = 1 | 'Zone2' = 2 ]
        /// </summary>
        public ExClassEnum? ExClass { get; set; }
        /// <summary>
        /// Enum: [ 'Equinor' = 0 | 'External' = 1 ]
        /// </summary>
        public UserTypeEnum? UserType { get; set; }
        /// <summary>
        /// Search by Tag
        /// </summary>
        public string? Tag { get; set; }
        /// <summary>
        /// Search by Ritm
        /// </summary>
        public string? Ritm { get; set; }
        /// <summary>
        /// Search by Owner
        /// </summary>
        public string? Owner { get; set; }
    }
}
