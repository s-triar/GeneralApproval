using Prodept.Commons.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Interfaces
{
    public interface IUserDeviceService
    {
        int save();
        void Add(UserDevice entity);
        IEnumerable<UserDevice> GetUserDevices(string Nik);
    }
}
