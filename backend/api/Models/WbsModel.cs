using System.Collections.Generic;

namespace Api.Models
{
    public class WbsModel
    {
        /// <summary>
        /// A status code within SAP that is set if the WBS is "closed" -> is not allowed to record hours in it.
        /// </summary>
        public const string ClosedForTimeWritingStatusCode = "NTWR";

        public string? Code { get; init; }

        public string? Description { get; init; }

        public IList<string> ActiveStatusIds { get; init; } = new List<string>();

        public bool IsOpenForTimeWriting => !ActiveStatusIds.Contains(ClosedForTimeWritingStatusCode);
    }
}
