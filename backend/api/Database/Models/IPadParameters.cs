namespace Api.Database.Models
{
    public class IPadParameters : QueryStringParameters
    {
        /// <summary>
        /// Must be one of [ 'non', 'zone1', 'zone2' ]
        /// </summary>
        public ExClassEnum? ExClass { get; set; }
        /// <summary>
        /// Must be one of [ 'equinor', 'external' ]
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
