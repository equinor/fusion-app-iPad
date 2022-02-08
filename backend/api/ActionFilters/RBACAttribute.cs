using Api.Models;
using Api.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;


namespace Api.ActionFilters
{
    public sealed class RBACAttribute : TypeFilterAttribute
    {
        public Role Role { get; private set; }

        public RBACAttribute(Role role) : base(typeof(RBACAttributeImplementation))
        {
            Arguments = new object[] { role };
        }
        /// <summary>
        /// Role-Based Access Control - Attribute
        /// </summary>
        private class RBACAttributeImplementation : IActionFilter
        {
            private readonly IConfiguration _configuration;
            private readonly Role _role;

            public RBACAttributeImplementation(IConfiguration configuration, Role role)
            {
                _configuration = configuration;
                _role = role;
            }

            /// <summary>
            /// Validate that user/app has required role
            /// </summary>
            /// <param name="context"></param>
            public void OnActionExecuting(ActionExecutingContext context)
            {
                var approvedRoles = Tools.GetRoles(_configuration);

                // Add relevant role to base roles
                approvedRoles = approvedRoles.Append(_role switch
                {
                    Role.DatabaseRead => _configuration.GetSection("ApplicationRoles:Database").GetValue<string>("Read"),
                    Role.DatabaseModify => _configuration.GetSection("ApplicationRoles:Database").GetValue<string>("Modify"),
                    Role.DatabaseCreate => _configuration.GetSection("ApplicationRoles:Database").GetValue<string>("Create"),
                    _ => ""
                });

                // If user in any approved role, we are done checking
                if (approvedRoles.Any(r => context.HttpContext.User.IsInRole(r)))
                    return;

                // If not, user/app is unauthorized
                context.Result = new ForbidResult();
            }

            public void OnActionExecuted(ActionExecutedContext context)
            {
                // Nothing to do after action executed
            }
        }
    }
}
