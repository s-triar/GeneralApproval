﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;
using Prodept.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Services
{
    public class ProjectRequestService: IProjectRequestService
    {
        public readonly AppDbContext _context;

        public ProjectRequestService(AppDbContext context)
        {
            _context = context;
        }

        public int save()
        {
            return this._context.SaveChanges();
        }

        public IDbContextTransaction GetTransaction()
        {
            return this._context.Database.BeginTransaction();
        }

        public void Add(RequestList entity)
        {
            this._context.RequestLists.Add(entity);
        }
        public void Update(RequestList entity)
        {
            this._context.RequestLists.Update(entity);
        }
        public void Remove(RequestList entity)
        {
            var temp = this._context.RequestLists.FirstOrDefault(x => x.ApiName == entity.ApiName && x.Nik == entity.Nik && x.Id == entity.Id);
            if (temp!=null)
            {
                this._context.RequestLists.Remove(temp);
            }
        }

        public  RequestList GetSpecificId(RequestList entity)
        {
            return  this._context.RequestLists.FirstOrDefault(x => x.ApiName == entity.ApiName && x.Nik == entity.Nik && x.Id == entity.Id);
        }
        public IEnumerable<RequestList> GetSpecificUser(RequestList entity)
        {
            return this._context.RequestLists.Where(x =>x.Nik == entity.Nik).AsEnumerable();
        }
        public IEnumerable<RequestList> GetSpecificProject(RequestList entity)
        {
            return this._context.RequestLists.Where(x => x.ApiName == entity.ApiName).AsEnumerable();
        }
        public IEnumerable<RequestList> GetSpecificUserAndProject(RequestList entity)
        {
            return this._context.RequestLists.Where(x => x.ApiName == entity.ApiName && x.Nik == entity.Nik).AsEnumerable();
        }
        public IEnumerable<RequestList> GetListRequest(string Nik, string ApiName)
        {
            return this._context.RequestLists.Where(x => x.ApiName == ApiName && x.Nik == Nik)
                                .OrderBy(x=>x.CreatedAt)
                                .Select(x=> new RequestList { 
                                    ApiName = x.ApiName,
                                    Category = x.Category,
                                    Nik = x.Nik,
                                    Id = x.Id,
                                    Detail = null,
                                    Status = x.Status,
                                    Title = x.Title,
                                    SubTitle = x.SubTitle,
                                    UrlAction = null,
                                    UrlProject = null,
                                    ProjectName = x.ProjectName,
                                    CreatedAt = x.CreatedAt,
                                    Displayed = x.Displayed
                                }).AsEnumerable();
        }

        public IEnumerable<ListProject> GetListProject(string Nik, string ProjectName)
        {
            return  this._context.RequestLists
                                .Where(x =>x.Nik == Nik)
                                .Where(x => x.ProjectName.ToLower().Contains(ProjectName))
                                .GroupBy(x=> new {
                                    Nik = x.Nik,
                                    ApiN = x.ApiName,
                                    ProjectN = x.ProjectName,
                                    ProjectU = x.UrlProject
                                })
                                .Select(x => new ListProject{
                                    ApiName = x.Key.ApiN,
                                    ProjectName = x.Key.ProjectN,
                                    Url = x.Key.ProjectU,
                                    Nik = x.Key.Nik,
                                    N = x.Count()
                                })
                                .OrderBy(x => x.ProjectName)
                                .AsEnumerable();
        }
    }
}
