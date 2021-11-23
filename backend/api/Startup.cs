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

namespace api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins  = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "iPad", Version = "v1" });
            });



            string commonLibTokenConnection = $"RunAs=App;AppId={Configuration["AzureAd:ClientId"]};TenantId={Configuration["AzureAd:TenantId"]};AppKey={Configuration["AzureAd:ClientSecret"]}";

            services.AddScoped(typeof(CommonLibraryController), typeof(CommonLibraryController));
            services.AddScoped(typeof(CommonLibraryService), typeof(CommonLibraryService));
            services.AddScoped(typeof(CommonLibraryClientOptions),
                _ => new CommonLibraryClientOptions() {TokenProviderConnectionString = commonLibTokenConnection });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "iPad v1"));
            }

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}