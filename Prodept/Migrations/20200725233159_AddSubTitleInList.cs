using Microsoft.EntityFrameworkCore.Migrations;

namespace Prodept.Migrations
{
    public partial class AddSubTitleInList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubTitle",
                table: "RequestLists",
                type: "varchar(255)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubTitle",
                table: "RequestLists");
        }
    }
}
