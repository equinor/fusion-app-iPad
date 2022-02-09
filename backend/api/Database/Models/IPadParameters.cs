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

        public static readonly Dictionary<string, string> ExClassQueryToValue = new(StringComparer.OrdinalIgnoreCase)
        {
            { "non", "Non EX" },
            { "zone1", "EX Zone 1" },
            { "zone2", "EX Zone 2" }
        };
        public static readonly Dictionary<string, string> UserTypeQueryToValue = new(StringComparer.OrdinalIgnoreCase)
        {
            { "equinor", "Equinor Personnel" },
            { "external", "External hire or Contractor" },
        };

    }
}
