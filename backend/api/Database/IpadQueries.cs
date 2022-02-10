using System.Linq.Expressions;
using Api.Database.Entities;
using Api.Database.Models;

namespace Api.Database
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1304:Specify CultureInfo",
    Justification = "Entity framework does not support translating culture info to SQL calls")]
    public static class IpadQueries
    {
        public static void SearchByOwner(ref IQueryable<IPad> ipads, string? owner)
        {
            if (!ipads.Any() || string.IsNullOrWhiteSpace(owner))
                return;

            ipads = ipads.Where(i => i.Owner.ToLower().Contains(owner.Trim().ToLower()));
        }

        public static void SearchByRitm(ref IQueryable<IPad> ipads, string? ritm)
        {
            if (!ipads.Any() || string.IsNullOrWhiteSpace(ritm))
                return;

            ipads = ipads.Where(i => i.LastKnownRITM.ToLower().Contains(ritm.Trim().ToLower()));
        }

        public static void SearchByTag(ref IQueryable<IPad> ipads, string? tag)
        {
            if (!ipads.Any() || string.IsNullOrWhiteSpace(tag))
                return;

            ipads = ipads.Where(i => i.YellowTag.ToLower().Contains(tag.Trim().ToLower()));
        }


        /// <summary>
        /// Filters by <see cref="IPadParameters.ExClass"/> and <see cref="IPadParameters.UserType"/>
        /// 
        /// <para>Uses LINQ Expression trees (see <seealso href="https://docs.microsoft.com/en-us/dotnet/csharp/expression-trees"/>)</para>
        /// </summary>
        /// <param name="parameters"> The variable containing the filter params </param>
        public static Expression<Func<IPad, bool>> ConstructFilter(IPadParameters parameters)
        {
            Expression<Func<IPad, bool>> exFilter = i => true;
            Expression<Func<IPad, bool>> userFilter = i => true;

            if (parameters.ExClass is not null && !string.IsNullOrWhiteSpace(parameters.ExClass))
            {
                if (!IPadParameters.ExClassQueryToValue.ContainsKey(parameters.ExClass))
                    throw new ArgumentException($"Parameter '{nameof(parameters.ExClass)}' was '{parameters.ExClass}'. " +
                        $"Expected one of [ {string.Join(", ", IPadParameters.ExClassQueryToValue.Keys)} ]");

                exFilter = i => i.ExClass.Equals(IPadParameters.ExClassQueryToValue[parameters.ExClass]);
            }

            if (parameters.UserType is not null && !string.IsNullOrWhiteSpace(parameters.UserType))
            {
                if (!IPadParameters.UserTypeQueryToValue.ContainsKey(parameters.UserType))
                    throw new ArgumentException($"Parameter '{nameof(parameters.UserType)}' was '{parameters.UserType}'. " +
                        $"Expected one of [ {string.Join(", ", IPadParameters.UserTypeQueryToValue.Keys)} ]");

                userFilter = i => i.UserType.Equals(IPadParameters.UserTypeQueryToValue[parameters.UserType]);
            }

            // The parameter of the filter expression
            var i = Expression.Parameter(typeof(IPad));

            // Combining the body of the two filters to create the combined filter, using invoke to force parameter substitution
            Expression body = Expression.AndAlso(Expression.Invoke(exFilter, i), Expression.Invoke(userFilter, i));

            // Constructing the resulting lambda expression by combining parameter and body
            return Expression.Lambda<Func<IPad, bool>>(body, i);
        }
    }
}
