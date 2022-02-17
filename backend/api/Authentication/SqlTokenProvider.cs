﻿using Azure.Core;
using Azure.Identity;
using Fusion.Infrastructure.Database;

namespace Api.Authentication
{
    /// <summary>
    /// This token provider represents read/write access for the backend service principal
    /// If PERFORM_MIGRATION is set to true, then it will provide database owner access for migration purposes.
    /// </summary>
    public class SqlTokenProvider : ISqlTokenProvider
    {
        private readonly ClientSecretCredential _credentials;
        private static readonly TokenRequestContext tokenRequest = new(new[] { "https://database.windows.net/.default" });
        private readonly ILogger<SqlTokenProvider> _logger;

        public SqlTokenProvider(IConfiguration config, ILogger<SqlTokenProvider> logger)
        {
            _logger = logger;
            string clientId = config.GetValue<string>("AzureAd:ClientId");
            string clientSecret = config.GetValue<string>("AzureAd:ClientSecret");

            string? migration = Environment.GetEnvironmentVariable("PERFORM_MIGRATION");
            if (migration is not null && string.Equals(migration, "true", StringComparison.OrdinalIgnoreCase))
            {
                _logger.LogWarning("'PERFORM_MIGRATION' set to 'true' - Using database owner credentials");
                clientId = config.GetValue<string>("AzureAd:DatabaseOwner:ClientId");
                clientSecret = config.GetValue<string>("AzureAd:DatabaseOwner:ClientSecret");
            }

            _credentials = new ClientSecretCredential(
                config.GetValue<string>("AzureAd:TenantId"),
                clientId,
                clientSecret
                );
        }

        public async Task<string> GetAccessTokenAsync()
        {
            _logger.LogInformation("Getting database access token");
            var token = await _credentials.GetTokenAsync(tokenRequest);
            _logger.LogInformation("Successfully retrieved database access token");
            return token.Token;
        }
    }
}
