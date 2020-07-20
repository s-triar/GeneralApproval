using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class InitDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RequestLists",
                columns: table => new
                {
                    Nik = table.Column<string>(nullable: false),
                    ApiName = table.Column<string>(nullable: false),
                    Id = table.Column<string>(nullable: false),
                    Category = table.Column<string>(type: "varchar(255)", nullable: true),
                    Title = table.Column<string>(type: "varchar(255)", nullable: true),
                    Status = table.Column<string>(type: "varchar(255)", nullable: true),
                    Detail = table.Column<string>(type: "longtext", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestLists", x => new { x.Nik, x.ApiName, x.Id });
                    table.UniqueConstraint("AK_RequestLists_ApiName_Id_Nik", x => new { x.ApiName, x.Id, x.Nik });
                });

            migrationBuilder.CreateTable(
                name: "UserDevices",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Nik = table.Column<string>(type: "varchar(255)", nullable: true),
                    DeviceKey = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserDevices", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestLists");

            migrationBuilder.DropTable(
                name: "UserDevices");
        }
    }
}
