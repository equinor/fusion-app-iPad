﻿using System.Linq.Expressions;
using Api.Database.Entities;
using Api.Database.Models;

namespace Api.Database
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Globalization", "CA1304:Specify CultureInfo",
    Justification = "Entity framework does not support translating culture info to SQL calls")]
    public static class IPadQueries
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
            Expression<Func<IPad, bool>> exFilter = parameters.ExClass is null ? i => true : i => i.ExClass == parameters.ExClass;
            Expression<Func<IPad, bool>> userFilter = parameters.UserType is null ? i => true : i => i.UserType == parameters.UserType;

            // The parameter of the filter expression
            var i = Expression.Parameter(typeof(IPad));

            // Combining the body of the two filters to create the combined filter, using invoke to force parameter substitution
            Expression body = Expression.AndAlso(Expression.Invoke(exFilter, i), Expression.Invoke(userFilter, i));

            // Constructing the resulting lambda expression by combining parameter and body
            return Expression.Lambda<Func<IPad, bool>>(body, i);
        }
    }
}
