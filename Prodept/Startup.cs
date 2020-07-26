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
using Microsoft.AspNetCore.ResponseCompression;
using System.Net;
using System.Net.Http;
using Prodept.Commons;
using IdentityServer4.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.StaticFiles;

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

            var jwks = this.GetJWKs();


            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
              {
                  options.Audience = Configuration.GetSection("IdentityServerAccount").GetSection("ApiName").Value;
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateAudience = false,
                      ValidIssuer = Configuration.GetSection("CentralAuth").Value,
                      IssuerSigningKeys = jwks
                  };
              });

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
            services.AddResponseCompression(c =>
            {
                c.EnableForHttps = true;
                c.Providers.Add<GzipCompressionProvider>();
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            //Bypass untrusted certificate
            services.AddHttpClient(AppEnum.AuthCentralHttp).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) =>
                {
                    return true;
                }
            });
            services.AddHttpClient("bebas").ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) =>
                {
                    return true;
                }
            });
            //services.AddHttpClient();
            services.AddHttpContextAccessor();
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

            app.UseResponseCompression();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            //app.UseIdentityServer();
            app.UseAuthentication();
            //app.UseCors(builder =>
            //{
            //    builder.WithOrigins(Configuration.GetSection("Originku").Value)
            //           .AllowCredentials()
            //           .AllowAnyMethod()
            //           .AllowAnyHeader();
            //});

            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();
            provider.Mappings[".webmanifest"] = "application/manifest+json";

            app.UseStaticFiles(new StaticFileOptions()
            {
                ContentTypeProvider = provider
            });

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

        //This method is used for getting jwks from identity server jwks endpoint
        private List<JsonWebKey> GetJWKs()
        {
            var jwksJson = @"{
                        ""keys"": [
                            {
                                ""kty"": ""RSA"",
                                ""use"": ""sig"",
                                ""kid"": ""7C8A0CFE71B701FB536F9680EB4DE2B0745F343F"",
                                ""x5t"": ""fIoM_nG3AftTb5aA603isHRfND8"",
                                ""e"": ""AQAB"",
                                ""n"": ""qV_cfXA5X0R0fRMKM0X1uZ2bnw-_GopeSTYrr-_zc5LWq1k6lpG5oUPWsm5vkbwIAQknBxDyFU6bffxRkCjWDDlKrtizeo-3bFEF-wcZFkl94qMj8BkEm4vT8CaaLEy42oNJSyjwBI-qRxU-Qvkkw1gjAUfNIbn5pwwpwwNB0omnDq0kdGI5w4fi9x2Gn7j3m7s6tJuS9Emj2G-G5_JrEFMs-h_-rREBUsU_T9i5NFpLtwYnM7vRlpu4T_NRmySNtM08aRSUfmgz96aTmaOsNIHRnYWbda8EZDlNnlLqFaVTAHKodLR_jfexx--kN9HVoT3q6TUeHL9cGfUVHsjeeQ"",
                                ""x5c"": [
                                    ""MIIC7DCCAdSgAwIBAgIQJ9UOs32vdpNC5WhjOIZSUTANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDEwlsb2NhbGhvc3QwHhcNMjAwMzMwMDQxNDQ3WhcNMjUwMzMwMDAwMDAwWjAUMRIwEAYDVQQDEwlsb2NhbGhvc3QwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpX9x9cDlfRHR9EwozRfW5nZufD78ail5JNiuv7/NzktarWTqWkbmhQ9aybm+RvAgBCScHEPIVTpt9/FGQKNYMOUqu2LN6j7dsUQX7BxkWSX3ioyPwGQSbi9PwJposTLjag0lLKPAEj6pHFT5C+STDWCMBR80hufmnDCnDA0HSiacOrSR0YjnDh+L3HYafuPebuzq0m5L0SaPYb4bn8msQUyz6H/6tEQFSxT9P2Lk0Wku3Biczu9GWm7hP81GbJI20zTxpFJR+aDP3ppOZo6w0gdGdhZt1rwRkOU2eUuoVpVMAcqh0tH+N97HH76Q30dWhPerpNR4cv1wZ9RUeyN55AgMBAAGjOjA4MAsGA1UdDwQEAwIEsDATBgNVHSUEDDAKBggrBgEFBQcDATAUBgNVHREEDTALgglsb2NhbGhvc3QwDQYJKoZIhvcNAQELBQADggEBAGiZrAHGLRYsG5wBeirQ5CO7JNnk500br2NDsTPel27YP60sjXRSbaXQot581zzRpb/u7WbZpGKKRt0e3+o3A17fjC4578ejAcJ7QachXvwvt5r91jDR978WUo9pF7IFJo89VBdFoBnlS65ROh27sASdIlN711nP+SImxN5+xUQx8PTBnSvzwy5WDSLyX0u4WSFYp2fVMm5kF2tNi2u7th39Yo/ASvxiPI/wd6fcAUUGcYVamEfh4BawbcU/mXM/3QSgmxASYKy6aNOz07gLcYgT+luPMCbIqu1ilHnZyQ45TnTXY1Bju6TPNG0RPcWuye8UHqaAojTE4cQl5Ws7GSA=""
                                ],
                                ""alg"": ""RS256""
                            }
                        ]
                    }";
            var jwks = new JsonWebKeySet(jwksJson);
            var jwkes = jwks.Keys.ToList();
            //var jwk = jwks.Keys.First();
            return jwkes;
        }

    }
}
