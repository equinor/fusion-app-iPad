using System.Threading.Tasks;
using Azure.Core;
using Azure.Identity;
using Fusion.Infrastructure.Database;
using Microsoft.Extensions.Configuration;

namespace Api.Authentication
{
    /// <summary>
    /// This token provider represents read/write access for the backend service principal
    /// </summary>
    public class SqlTokenProvider : ISqlTokenProvider
    {
       private readonly ClientSecretCredential _credentials;
       private readonly static TokenRequestContext tokenRequest = new TokenRequestContext(new[] { "https://database.windows.net/.default" });

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
            var token = await _credentials.GetTokenAsync(tokenRequest);
            return token.Token;
        }
    }
}
