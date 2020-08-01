using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Prodept.Commons;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;
using Prodept.Commons.Models.Authentication;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IProjectRequestService _projectReqservice;
        private readonly IConfiguration _config;

        public AuthController(IHttpClientFactory httpClientFactory, IProjectRequestService projectReqservice, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _projectReqservice = projectReqservice;
            _config = config;
        }

        //Todo Login
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] UserLogin user)
        {
            var server = _httpClientFactory.CreateClient(AppEnum.AuthCentralHttp);
            var discoveryDoc = await server.GetDiscoveryDocumentAsync(this._config.GetSection("CentralAuth").Value);
            var tokenRes = await server.RequestPasswordTokenAsync(
                new PasswordTokenRequest
                {
                    Password = user.Password,
                    UserName = user.Nik,
                    Address = this._config.GetSection("CentralAuth").Value + "/connect/token",
                    ClientId = this._config.GetSection("IdentityServerAccount").GetSection("ClientId").Value,
                    ClientSecret = this._config.GetSection("IdentityServerAccount").GetSection("ClientSecret").Value,
                    GrantType = GrantType.ResourceOwnerPassword,
                    Scope = this._config.GetSection("IdentityServerAccount").GetSection("ApiName").Value+" profile email"
                });

            if (tokenRes.IsError)
            {
                var res = new CustomResponse()
                {
                    message = tokenRes.Exception.Message,
                    title = "Login Gagal",
                    ok = false,
                };
                return BadRequest(res);
            }
            else
            {
                var res = new CustomResponse()
                {
                    message = "Pengguna berhasil masuk",
                    title = "Login Berhasil",
                    ok = true,
                    data = tokenRes.AccessToken
                };
                return Ok(res);
            }
        }
        //Todo Logout
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> Logout()
        {
            return Ok();
        }

        //Todo GetUser Profile
        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserProfile()
        {
            try
            {
                var s = HttpContext.User.Claims;
                var k = s.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
                var nik = k.Value;
                var author = HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
                var rawtok = author.Value.FirstOrDefault(x => x.ToLower().Contains("bearer")).Split("Bearer ");
                string Token = rawtok[rawtok.Length - 1];

                var server = _httpClientFactory.CreateClient(AppEnum.AuthCentralHttp);
                server.SetBearerToken(Token);
                var link = _config.GetSection("CentralAuth").Value + "/api/User/GetDetailUser?Kode=" + nik;
                var request = new HttpRequestMessage(HttpMethod.Get, link);
                server.SetBearerToken(Token);
                var resproj = await server.SendAsync(request);
                if (resproj.IsSuccessStatusCode)
                {
                    var res = new CustomResponse()
                    {
                        message = "Berhasil mendapatkan data pengguna",
                        title = "Sukses",
                        ok = true,
                        data = await resproj.Content.ReadAsAsync<User>()
                    };
                    return Ok(res);
                }
                else
                {
                    var res = new CustomResponse()
                    {
                        data = JsonConvert.SerializeObject(resproj.Content),
                        message = "Gagal mendapatkan data pengguna. Error Code: " + resproj.StatusCode,
                        title = "Gagal",
                        ok = false
                    };
                    return BadRequest(res);
                }
            }
            catch(Exception ex)
            {
                var res = new CustomResponse()
                {
                    data = ex.Data,
                    message = ex.Message,
                    title = "Gagal",
                    ok = false
                };
                return BadRequest(res);
            }
            
        }


    }
}
