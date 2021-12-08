using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace Api.Models
{
    /// <summary>
    /// Represents an entry in the response from the WBS API.
    /// </summary>
    [DataContract]
    public class WbsResponseModel
    {
        [JsonPropertyName("wbsId")]
        public string? WbsId { get; init; }

        [JsonPropertyName("companyId")]
        public string? CompanyId { get; init; }

        [JsonPropertyName("controllingArea")]
        public string? ControllingArea { get; init; }

        [JsonPropertyName("code")]
        public string? Code { get; init; }

        [JsonPropertyName("activeStatusIds")]
        public IList<string> ActiveStatusIds { get; init; } = null!;

        [JsonPropertyName("description")]
        public string? Description { get; init; }

        [JsonPropertyName("createdDate")]
        public DateTimeOffset CreatedDate { get; init; }

        [JsonPropertyName("modifiedDate")]
        public DateTimeOffset? ModifiedDate { get; init; }

        [JsonPropertyName("internalProductValueChain")]
        public string? InternalProductValueChain { get; init; }

        [JsonPropertyName("internalCustomerProcessArea")]
        public string? InternalCustomerProcessArea { get; init; }

        [JsonPropertyName("processId")]
        public string? ProcessId { get; init; }

        [JsonPropertyName("serviceId")]
        public string? ServiceId { get; init; }

        [JsonPropertyName("wellboreId")]
        public string? WellboreId { get; init; }

        [JsonPropertyName("deliveryNumber")]
        public string? DeliveryNumber { get; init; }

        [JsonPropertyName("plannedProject")]
        public string? PlannedProject { get; init; }

        [JsonPropertyName("applicationId")]
        public string? ApplicationId { get; init; }

        [JsonPropertyName("levelInHierarchy")]
        public int? LevelInHierarchy { get; init; }

        [JsonPropertyName("taskResponsibility")]
        public string? TaskResponsibility { get; init; }

        [JsonPropertyName("taskStructure")]
        public string? TaskStructure { get; init; }

        [JsonPropertyName("expenditureCategory")]
        public string? ExpenditureCategory { get; init; }
    }
}
