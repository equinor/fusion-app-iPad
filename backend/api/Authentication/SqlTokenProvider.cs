using Azure.Core;
using Azure.Identity;
using Fusion.Infrastructure.Database;

namespace Api.Authentication
{
    /// <summary>
    /// This token provider represents read/write access for the backend service principal
    /// </summary>
    public class SqlTokenProvider : ISqlTokenProvider
    {
        private readonly ClientSecretCredential _credentials;
        private static readonly TokenRequestContext tokenRequest = new(new[] { "https://database.windows.net/.default" });

        public SqlTokenProvider(IConfiguration config)
        {
            _credentials = new ClientSecretCredential(
                config.GetValue<string>("AzureAd:TenantId"),
                config.GetValue<string>("AzureAd:ClientId"),
                config.GetValue<string>("AzureAd:ClientSecret")
                );
        }

        public async Task<string> GetAccessTokenAsync()
        {
            AccessToken token = await _credentials.GetTokenAsync(tokenRequest);
            return token.Token;
        }
    }
}
