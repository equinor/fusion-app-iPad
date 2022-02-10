namespace Api.Database.Models
{
    public class IPadParameters : QueryStringParameters
    {
        /// <summary>
        /// Must be one of [ 'non', 'zone1', 'zone2' ]
        /// </summary>
        public string? ExClass { get; set; }
        /// <summary>
        /// Must be one of [ 'equinor', 'external' ]
        /// </summary>
        public string? UserType { get; set; }
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

        public static readonly Dictionary<string, ExClassEnum> ExClassQueryToValue = new(StringComparer.OrdinalIgnoreCase)
        {
            { "non", ExClassEnum.NonEx },
            { "zone1", ExClassEnum.NonEx },
            { "zone2", ExClassEnum.NonEx }
        };
        public static readonly Dictionary<string, UserTypeEnum> UserTypeQueryToValue = new(StringComparer.OrdinalIgnoreCase)
        {
            { "equinor", UserTypeEnum.Equinor },
            { "external", UserTypeEnum.External },
        };

    }
}
