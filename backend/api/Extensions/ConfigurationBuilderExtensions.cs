using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Extensions.Configuration.AzureKeyVault;

namespace Api.Extensions
{
    public static class ConfigurationBuilderExtensions
    {
        public static void ConfigureKeyVault(this IConfigurationBuilder config)
        {
            var builtConfig = config.Build();
            string? keyVaultEndpoint = builtConfig["KEYVAULT_ENDPOINT"];
            string? tenantId = builtConfig.GetSection("AzureAd")["TenantId"];
            string? clientId = builtConfig.GetSection("AzureAd")["ClientId"];
            string? clientSecret = builtConfig.GetSection("AzureAd")["ClientSecret"];

            if (keyVaultEndpoint is null or "")
                throw new InvalidOperationException("Store the Key Vault endpoint in a KEYVAULT_ENDPOINT environment variable.");

            if (clientId is null or "")
                throw new InvalidOperationException("Store the Client Id in a AzureAd__ClientId environment variable.");

            if (tenantId is null or "")
                throw new InvalidOperationException("Store the Tenant Id in a AzureAd__Tenant environment variable.");

            if (clientSecret is null or "")
                throw new InvalidOperationException("Store the Client Secret in a AzureAd__ClientSecret secret.");

            string? connectionString = $"RunAs=App;AppId={clientId};TenantId={tenantId};AppKey={clientSecret}";
            var azureServiceTokenProvider = new AzureServiceTokenProvider(connectionString);
            var keyVaultClient = new KeyVaultClient(
                new KeyVaultClient.AuthenticationCallback(
                    azureServiceTokenProvider.KeyVaultTokenCallback));

            config.AddAzureKeyVault(keyVaultEndpoint, keyVaultClient, new DefaultKeyVaultSecretManager());
        }

    }
}
