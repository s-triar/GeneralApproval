using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prodept.Datas;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System;
using Prodept.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using IdentityServer4.AccessTokenValidation;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Prodept
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(config =>
            {
                config.UseMySql(Configuration.GetConnectionString("DefaultConnection"));
            });

            //services.AddAuthentication(config =>
            //{
            //    config.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
            //    config.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer()
            //.AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, config =>
            //{
            //    config.Authority = "https://localhost:5001/";

            //    config.ClientId = "0f521970-ca6c-4bc3-a0cb-cb8fc0e938e8shkp";
            //    config.ClientSecret = "43dhaxAO4KQ57wIAWFT63Aq";
            //    config.SaveTokens = true;
            //    config.ResponseType = "code";
            //});

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
              {
                  options.Authority = Configuration.GetSection("CentralAuth").Value;
                  options.Audience = Configuration.GetSection("IdentityServerAccount").GetSection("ApiName").Value;
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateAudience = false
                  };
              });
            services.AddHttpClient();

            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("lihat-daftar-project", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:lihat-daftar-project");
            //    });
            //    options.AddPolicy("lihat-project", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:lihat-project");
            //    });
            //    options.AddPolicy("lihat-detail-permintaan", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:lihat-detail-permintaan");
            //    });
            //    options.AddPolicy("lihat-detail-permintaan", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:lihat-detail-permintaan");
            //    });
            //    options.AddPolicy("setujui-permintaan", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:setujui-permintaan");
            //    });
            //    options.AddPolicy("tolak-permintaan", policy =>
            //    {
            //        policy.RequireClaim(ClaimTypes.Role, "general_approval:tolak-permintaan");
            //    });
            //});
            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
            services.AddScoped<IUserDeviceService, UserDeviceService>();
            services.AddScoped<IProjectRequestService, ProjectRequestService>();
            services.AddScoped<INotificationService, NotificationService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseIdentityServer();
            app.UseAuthentication();
            

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            }
            );
           
            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = new TimeSpan(days: 0, hours: 0, minutes: 1, seconds: 30);
                    //spa.UseAngularCliServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                }
            });
        }
    }
}
