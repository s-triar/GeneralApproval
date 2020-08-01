using Prodept.Commons.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Commons.Interfaces
{
    public interface INotificationService
    {
        void sendNotif(string nik, string title, string message);
        void sendNotifReferToData(string nik, string apiName, string id, string title, string message);
        int add(string key, string username, string browser, string device, string os);
    }
}
