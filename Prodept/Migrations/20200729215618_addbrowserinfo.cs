using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class addbrowserinfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Browser",
                table: "UserDevices",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Device",
                table: "UserDevices",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Os",
                table: "UserDevices",
                type: "varchar(255)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Browser",
                table: "UserDevices");

            migrationBuilder.DropColumn(
                name: "Device",
                table: "UserDevices");

            migrationBuilder.DropColumn(
                name: "Os",
                table: "UserDevices");
        }
    }
}
