using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class addmeta : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "RequestLists",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Displayed",
                table: "RequestLists",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "RequestLists");

            migrationBuilder.DropColumn(
                name: "Displayed",
                table: "RequestLists");
        }
    }
}
