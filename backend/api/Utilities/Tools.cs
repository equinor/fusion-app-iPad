namespace Api.Utilities
{
    public static class Tools
    {
        public static Dictionary<string,string> BuildSwaggerScopes(IConfiguration configuration)
        {
            var scopes = configuration.GetSection("Scopes:Database").GetChildren().Select(c => c.Value);
            var result = new Dictionary<string, string>();
            foreach (string scope in scopes)
            {
                result.Add($"api://{configuration["AzureAd:ClientId"]}/{scope}", scope);
            }
            return result;
        }
    }
}
