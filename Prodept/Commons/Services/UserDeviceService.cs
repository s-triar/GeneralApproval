using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;
using Prodept.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Services
{
    public class UserDeviceService:IUserDeviceService
    {
        private readonly AppDbContext _context;

        public UserDeviceService(AppDbContext context)
        {
            _context = context;
        }

        public int save()
        {
            return this._context.SaveChanges();
        }

        public void Add(UserDevice entity)
        {
            var d = this._context.UserDevices.FirstOrDefault(x => x.DeviceKey == entity.DeviceKey);
            if (d != null)
            {
                d.Nik = entity.Nik;
                this._context.UserDevices.Update(d);
            }
            else
            {
                this._context.UserDevices.Add(entity);
            }
        }
        public IEnumerable<UserDevice> GetUserDevices(string Nik)
        {
            return this._context.UserDevices.Where(x=>x.Nik == Nik).AsEnumerable();
        }
    }
}
