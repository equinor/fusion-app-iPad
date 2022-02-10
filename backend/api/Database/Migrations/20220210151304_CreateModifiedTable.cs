using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Database.Migrations
{
    public partial class CreateModifiedTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IPads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    YellowTag = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    LastKnownRITM = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    Owner = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Assignee = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    Project = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    DeliveryAddress = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: true),
                    ExClass = table.Column<int>(type: "int", nullable: false),
                    UserType = table.Column<int>(type: "int", nullable: true),
                    SimType = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IPads", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IPads");
        }
    }
}
