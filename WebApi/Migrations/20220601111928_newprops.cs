using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend_Projekt.Migrations
{
    /// <inheritdoc />
    public partial class newprops : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkExperience",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Rooms",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkExperience",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Rooms");
        }
    }
}
