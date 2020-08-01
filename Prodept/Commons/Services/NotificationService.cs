using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Prodept.Commons.Interfaces;
using Prodept.Commons.Models;
using Prodept.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebPush;

namespace Prodept.Commons.Services
{
    public class NotificationService: INotificationService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        public NotificationService(IConfiguration configuration, AppDbContext context)
        {
            this._configuration = configuration;
            this._context = context;
        }
        public int add(string key, string username, string browser, string device, string os)
        {
            var temp = this._context.UserDevices.FirstOrDefault(x => x.Nik == username && x.Browser == browser && x.Device == device && x.Os == os);
            if (temp != null)
            {
                temp.DeviceKey = key;
                this._context.Update(temp);
            }
            else
            {
                var n = new UserDevice
                {
                    Id = Guid.NewGuid(),
                    DeviceKey = key,
                    Nik = username,
                    Os = os,
                    Device = device,
                    Browser = browser
                };
                this._context.UserDevices.Add(n);
            }
            return this._context.SaveChanges();

        }

        public void sendNotif(string nik, string title, string message)
        {
            var webPushClient = new WebPushClient();
            var j = this._configuration.GetSection("WebPushNotification").GetSection("PublicKey").Value;
            var k = this._configuration.GetSection("WebPushNotification").GetSection("PrivateKey").Value;
            var s = this._configuration.GetSection("WebPushNotification").GetSection("Subject").Value;
            var publicKey = @j;
            var privateKey = @k;
            var devices = this._context.UserDevices.Where(x => x.Nik == nik).ToList();
            foreach(var d in devices)
            {
                var clientkey = JsonConvert.DeserializeObject<ClientBrowser>(d.DeviceKey);
                var pushEndpoint = @clientkey.endpoint;
                var p256dh = @clientkey.keys.p256dh;
                var auth = @clientkey.keys.auth;
                var subject = @s;


                var subscription = new PushSubscription(pushEndpoint, p256dh, auth);
                var vapidDetails = new VapidDetails(subject, publicKey, privateKey);
                try
                {
                    var options = new
                    {
                        notification = new 
                        {
                            title = title,
                            body = message,
                            vibrate = new[] { 100, 50, 100 },
                            priority = 0,
                        }
                    };
                    webPushClient.SendNotification(subscription, JsonConvert.SerializeObject(options), vapidDetails);
                }
                catch (WebPushException exception)
                {
                    var t = this._context.UserDevices.FirstOrDefault(x=>x.Id == d.Id);
                    this._context.UserDevices.Remove(t);
                    this._context.SaveChanges();
                    //Console.WriteLine("Http STATUS code" + exception.StatusCode);
                }
            }
        }

        public void sendNotifReferToData(string nik,string apiName, string id, string title, string message)
        {
            var webPushClient = new WebPushClient();
            var j = this._configuration.GetSection("WebPushNotification").GetSection("PublicKey").Value;
            var k = this._configuration.GetSection("WebPushNotification").GetSection("PrivateKey").Value;
            var s = this._configuration.GetSection("WebPushNotification").GetSection("Subject").Value;
            var publicKey = @j;
            var privateKey = @k;
            var devices = this._context.UserDevices.Where(x => x.Nik == nik).ToList();
            foreach (var d in devices)
            {
                var clientkey = JsonConvert.DeserializeObject<ClientBrowser>(d.DeviceKey);
                var pushEndpoint = @clientkey.endpoint;
                var p256dh = @clientkey.keys.p256dh;
                var auth = @clientkey.keys.auth;
                var subject = @s;


                var subscription = new PushSubscription(pushEndpoint, p256dh, auth);
                var vapidDetails = new VapidDetails(subject, publicKey, privateKey);
                try
                {
                    var options = new
                    {
                        notification = new
                        {
                            title = title,
                            body = message,
                            vibrate = new[] { 100, 50, 100 },
                            priority = 0,
                            data = new
                            {
                                apiName = apiName,
                                id= id
                            }
                        }
                    };
                    webPushClient.SendNotification(subscription, JsonConvert.SerializeObject(options), vapidDetails);
                }
                catch (WebPushException exception)
                {
                    var t = this._context.UserDevices.FirstOrDefault(x => x.Id == d.Id);
                    this._context.UserDevices.Remove(t);
                    this._context.SaveChanges();
                    //Console.WriteLine("Http STATUS code" + exception.StatusCode);
                }
            }
        }
    }
}
