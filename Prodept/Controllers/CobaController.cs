using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityModel.Client;
using IdentityServer4.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Prodept.Datas;
using Prodept.Models;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CobaController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public CobaController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> Test()
        {
            var server = _httpClientFactory.CreateClient();
            var discoveryDoc = await server.GetDiscoveryDocumentAsync("https://localhost:44308/");
            var tokenRes = await server.RequestPasswordTokenAsync(
                new PasswordTokenRequest
                {
                    Password= "qweasd",
                    UserName = "000",
                    Address = discoveryDoc.TokenEndpoint,
                    ClientId = "1d1dec5b-e5b6-408a-a543-50733ab2334emTDO",
                    ClientSecret = "GqCDs0dvxvPi9SP5ewz4vyC",
                    GrantType = GrantType.ResourceOwnerPassword,
                    Scope = "general_approval profile email"
                });


            return Ok(tokenRes);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Test2()
        {
            var server = _httpClientFactory.CreateClient();
            var discoveryDoc = await server.GetDiscoveryDocumentAsync("https://localhost:44308/");
            var tokenRes = await server.RequestClientCredentialsTokenAsync(
                new ClientCredentialsTokenRequest
                {
                    Address = discoveryDoc.TokenEndpoint,
                    ClientId = "1d1dec5b-e5b6-408a-a543-50733ab2334emTDO",
                    ClientSecret = "GqCDs0dvxvPi9SP5ewz4vyC",
                    Scope = "general_approval",
                                        
                    GrantType = GrantType.ClientCredentials
                });


            return Ok(tokenRes);
        }
        [HttpGet("[action]")]
        public async Task<IActionResult> Test3()
        {
            var server = _httpClientFactory.CreateClient();
            var discoveryDoc = await server.GetDiscoveryDocumentAsync("https://localhost:5001/");
            var tokenRes = await server.RequestAuthorizationCodeTokenAsync(
                new AuthorizationCodeTokenRequest
                {
                    Address = discoveryDoc.TokenEndpoint,
                    ClientId = "0f521970-ca6c-4bc3-a0cb-cb8fc0e938e8shkp",
                    ClientSecret = "43dhaxAO4KQ57wIAWFT63Aq",
                    GrantType = GrantType.AuthorizationCode,
                    
                });


            return Ok(tokenRes);
        }
        [Authorize(Roles ="general_approval:=test")]
        [HttpGet("[action]")]
        public async Task<IActionResult> TestAuth()
        {
            return Ok("from testAuth tst");
        }

        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> TestAuth2()
        {
            return Ok("from testAuth2 tst");
        }
    }
}