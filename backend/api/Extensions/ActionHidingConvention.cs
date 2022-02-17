using Api.Controllers;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Api.Extensions
{
    /// <summary>
    /// Determines which actions will be hidden in the swagger documentation.
    /// </summary>
    public class ActionHidingConvention : IActionModelConvention
    {
        private readonly bool _isDev;

        public ActionHidingConvention(bool isDev)
        {
            _isDev = isDev;
        }

        public void Apply(ActionModel action)
        {
            // All actions are visible if in dev mode
            if (_isDev)
            {
                action.ApiExplorer.IsVisible = true;
                return;
            }

            // If not, only ipads endpoint is visible
            action.ApiExplorer.IsVisible = action.Controller.ControllerType == typeof(IPadsController);
        }
    }
}
