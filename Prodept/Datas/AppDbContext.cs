using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Prodept.Commons.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Prodept.Datas
{
    public class AppDbContext: DbContext
    {
        public DbSet<RequestList> RequestLists { get; set; }
        public DbSet<UserDevice> UserDevices { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
           
            base.OnModelCreating(builder);
            var entityreqlist = builder.Entity<RequestList>();
            entityreqlist.HasKey(t => new { t.Nik, t.ApiName, t.Id });
            entityreqlist.Property(p => p.Detail).HasColumnType("longtext");
            entityreqlist.Property(p => p.Status).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.Title).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.SubTitle).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.Category).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.UrlProject).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.UrlAction).HasColumnType("varchar(255)");
            entityreqlist.Property(p => p.ProjectName).HasColumnType("varchar(255)");
            var entitydeviceuser = builder.Entity<UserDevice>();
            entitydeviceuser.Property(p => p.DeviceKey).HasColumnType("text");
            entitydeviceuser.Property(p => p.Nik).HasColumnType("varchar(255)");
            entitydeviceuser.Property(p => p.Device).HasColumnType("varchar(255)");
            entitydeviceuser.Property(p => p.Browser).HasColumnType("varchar(255)");
            entitydeviceuser.Property(p => p.Os).HasColumnType("varchar(255)");
            //builder.Entity<Project>()
            //       .HasIndex(b => b.ClientId)
            //       .IsUnique();
        }
    }
}
