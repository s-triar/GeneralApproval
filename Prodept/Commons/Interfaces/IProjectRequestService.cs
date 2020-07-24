using Microsoft.EntityFrameworkCore.Storage;
using Prodept.Commons.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Interfaces
{
    public interface IProjectRequestService
    {
        int save();
        void Add(RequestList entity);
        void Remove(RequestList entity);
        void Update(RequestList entity);
        IDbContextTransaction GetTransaction();
        RequestList GetSpecificId(RequestList entity);
        IEnumerable<RequestList> GetSpecificUser(RequestList entity);
        IEnumerable<RequestList> GetSpecificProject(RequestList entity);
        IEnumerable<RequestList> GetSpecificUserAndProject(RequestList entity);
        IEnumerable<RequestList> GetListRequest(string Nik, string ApiName);
        IEnumerable<ListProject> GetListProject(string Nik, string ProjectName);
    }
}
