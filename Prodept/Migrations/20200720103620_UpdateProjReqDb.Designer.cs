﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Prodept.Datas;

namespace Prodept.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200720103620_UpdateProjReqDb")]
    partial class UpdateProjReqDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Prodept.Commons.Models.RequestList", b =>
                {
                    b.Property<string>("Nik");

                    b.Property<string>("ApiName");

                    b.Property<string>("Id");

                    b.Property<string>("Category")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Detail")
                        .HasColumnType("longtext");

                    b.Property<string>("ProjectName")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Status")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Title")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("UrlAction")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("UrlProject")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Nik", "ApiName", "Id");

                    b.HasAlternateKey("ApiName", "Id", "Nik");

                    b.ToTable("RequestLists");
                });

            modelBuilder.Entity("Prodept.Commons.Models.UserDevice", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("DeviceKey")
                        .HasColumnType("text");

                    b.Property<string>("Nik")
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.ToTable("UserDevices");
                });
#pragma warning restore 612, 618
        }
    }
}
