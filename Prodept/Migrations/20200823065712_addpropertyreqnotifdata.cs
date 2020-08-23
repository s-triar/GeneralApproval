using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class addpropertyreqnotifdata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "readOnlyOnce",
                table: "RequestLists",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "readOnlyOnce",
                table: "RequestLists");
        }
    }
}
