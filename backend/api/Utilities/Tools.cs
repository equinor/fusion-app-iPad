namespace Api.Utilities
{
    public static class Tools
    {
        public static IEnumerable<string> GetRoles(IConfiguration configuration) => configuration.GetSection("Roles").GetChildren().Select(c => c.Value);
        public static IEnumerable<string> GetDatabaseRoles(IConfiguration configuration) => configuration.GetSection("ApplicationRoles:Database").GetChildren().Select(c => c.Value);

    }
}
