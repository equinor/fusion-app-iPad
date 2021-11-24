using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers;
using api.Services;
using Equinor.TI.CommonLibrary.Client;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));

            services.AddAuthorization(options =>
            {
                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .Build();
            });
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins, builder => {
                    builder.WithOrigins("http://localhost:3000", "https://*.equinor.com")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .SetIsOriginAllowedToAllowWildcardSubdomains();
                });
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                // Add implicit flow authentication to Swagger
                c.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OAuth2,

                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            TokenUrl = new Uri($"{Configuration["AzureAd:Instance"]}/{Configuration["AzureAd:TenantId"]}/oauth2/token"),
                            AuthorizationUrl = new Uri($"{Configuration["AzureAd:Instance"]}/{Configuration["AzureAd:TenantId"]}/oauth2/authorize"),
                            Scopes = { { $"api://{Configuration["AzureAd:ClientId"]}/User.Impersonation", "User Impersonation" } }
                        }
                    }
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme()
                        {
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "oauth2" }
                        },
                        Array.Empty<string>()
                    }
                });
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "iPad", Version = "v1" });
            });


            // Common Library Integration
            #region Common Library Integration
            string commonLibTokenConnection = CommonLibraryService.BuildTokenConnectionString(
                Configuration["AzureAd:ClientId"],
                Configuration["AzureAd:TenantId"],
                Configuration["AzureAd:ClientSecret"]);

            // Service options is of singleton type because it should be the same for all services
            // TODO: Verify if this should be singleton
            services.AddSingleton(typeof(CommonLibraryClientOptions),
                _ => new CommonLibraryClientOptions { TokenProviderConnectionString = commonLibTokenConnection });

            // Service is of singleton type because it should be the same for all requests
            // TODO: Verify if this should be singleton
            services.AddSingleton(typeof(CommonLibraryService), typeof(CommonLibraryService));

            // Controller is scoped because a new instance should be initialized for each request
            services.AddScoped(typeof(CommonLibraryController), typeof(CommonLibraryController));
            #endregion

            // Service Now Integration
            #region Service Now Integration

            // Service is of singleton type because it should be the same for all requests
            // TODO: Verify if this should be singleton
            services.AddSingleton(typeof(ServiceNowService), typeof(ServiceNowService));

            // Controller is scoped because a new instance should be initialized for each request
            services.AddScoped(typeof(ServiceNowController), typeof(ServiceNowController));
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "iPad v1");
                    c.OAuthAppName("Fusion-iPad");
                    c.OAuthClientId(Configuration["AzureAd:ClientId"]);
                    c.OAuthAdditionalQueryStringParams(new Dictionary<string, string>
                        { { "resource", $"{Configuration["AzureAd:ClientId"]}" } });
                });
            }

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
