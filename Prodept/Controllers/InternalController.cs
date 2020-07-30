using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;
using Prodept.Commons.Models.Forms;

namespace Prodept.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InternalController : ControllerBase
    {

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IProjectRequestService _projectReqservice;

        public InternalController(IHttpClientFactory httpClientFactory, IProjectRequestService projectReqservice)
        {
            _httpClientFactory = httpClientFactory;
            _projectReqservice = projectReqservice;
        }

        //Todo Get List Projects of user
        [Authorize]
        [HttpGet("[action]")]
        public async Task<IEnumerable<ListProject>> GetListProject([FromQuery] string name)
        {
            if (name.IsNullOrEmpty())
            {
                name = "";
            }
            var s = HttpContext.User.Claims;
            var k = s.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
            var nik = k.Value;
            return this._projectReqservice.GetListProject(nik, name.ToLower());
        }

        //Todo Get List Request of project
        [Authorize]
        [HttpGet("[action]")]
        public async Task<IEnumerable<RequestList>> GetListRequestProject([FromQuery] string name)
        {
            var s = HttpContext.User.Claims;
            var k = s.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
            var nik = k.Value;
            return this._projectReqservice.GetListRequest(nik, name);
        }

        //Todo Get Detail of Request
        [Authorize]
        [HttpGet("[action]")]
        public async Task<RequestList> GetDetailRequestProject([FromQuery] RequestList data)
        {
            var s = HttpContext.User.Claims;
            var k = s.FirstOrDefault(x => x.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname");
            var nik = k.Value;
            data.Nik = nik;
            return this._projectReqservice.GetSpecificId(data);
        }


        //Todo request for additional data e.g for list, option.
        [Authorize]
        [HttpGet("[action]")]
        public async Task<IActionResult> GetAutoCompleteListData([FromQuery]string Link, [FromQuery]bool ProvideFilter, [FromQuery]string Search)
        {
            var author = HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            var rawtok = author.Value.FirstOrDefault(x => x.ToLower().Contains("bearer")).Split("Bearer ");
            string token = rawtok[rawtok.Length - 1];
            var proj = _httpClientFactory.CreateClient("bebas");
            proj.SetBearerToken(token);
            string matureLink = Link;
            if (ProvideFilter)
            {
                if (Link.Contains("?"))
                {
                    matureLink += "&label=" + Search.ToLower();
                }
                else
                {
                    matureLink += "?label=" + Search.ToLower();
                }
            }
            var resproj = await proj.GetAsync(matureLink);
            if (resproj.IsSuccessStatusCode)
            {
                var temp = await resproj.Content.ReadAsAsync<List<FormAutoCompleteItem>>();
                if (!ProvideFilter)
                {
                    temp = temp.Where(x => x.label.ToLower().Contains(Search.ToLower())).ToList();
                }
                var res = new CustomResponse()
                {
                    data = temp,
                    message = "Data berhasil didapatkan",
                    title = "Mendapatkan Data Sukses",
                    ok = true
                };
                return Ok(res);
            }
            else
            {
                var res = new CustomResponse()
                {
                    data = JsonConvert.SerializeObject(resproj.Content),
                    message = "Gagal Mendapatkan Data. Error Code: " + resproj.StatusCode,
                    title = "Mendapatkan Data Gagal",
                    ok = false
                };
                return BadRequest(res);
            }
        }

        //Todo request for downloading file

        //Todo request for downloading image


        //Todo request for sending approval
        [Authorize]
        [HttpPost("[action]")]
        public async Task<IActionResult> SendDecision([FromBody] Decision Dec)
        {
            var author = HttpContext.Request.Headers.FirstOrDefault(x => x.Key == "Authorization");
            var rawtok = author.Value.FirstOrDefault(x=>x.ToLower().Contains("bearer")).Split("Bearer ");
            string token = rawtok[rawtok.Length - 1];
            var proj = _httpClientFactory.CreateClient("bebas");
            proj.SetBearerToken(token);
            var resproj = await proj.PostAsJsonAsync(Dec.Link, Dec);
            if(resproj.IsSuccessStatusCode)
            {
                //Todo hapus data
                var data = new RequestList
                {
                    ApiName = Dec.ApiName,
                    Id = Dec.Id,
                    Nik = Dec.Nik
                };
                this._projectReqservice.Remove(data);
                int i = this._projectReqservice.save();
                if (i > 0)
                {
                    var res = new CustomResponse()
                    {
                        message = "Data sudah dilakukan approval",
                        title = "Approval Sukses",
                        ok = true
                    };
                    return Ok(res);
                }
                else
                {
                    var res = new CustomResponse()
                    {
                        message = "Data di General Approval gagal dihapus",
                        title = "Approval Sukses dengan Tapi",
                        ok = true
                    };
                    return Ok(res);
                }
            }
            else
            {
                var res = new CustomResponse()
                {
                    data = JsonConvert.SerializeObject(resproj.Content),
                    message = "Gagal dilakukan approval. Error Code: " + resproj.StatusCode,
                    title = "Approval ke Project Gagal",
                    ok = false
                };
                return BadRequest(res);
            }
        }
    }
}
