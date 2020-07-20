using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class UpdateProjReqDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "RequestLists",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UrlAction",
                table: "RequestLists",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UrlProject",
                table: "RequestLists",
                type: "varchar(255)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "RequestLists");

            migrationBuilder.DropColumn(
                name: "UrlAction",
                table: "RequestLists");

            migrationBuilder.DropColumn(
                name: "UrlProject",
                table: "RequestLists");
        }
    }
}
