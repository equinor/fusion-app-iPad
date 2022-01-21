using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Database.Migrations
{
    public partial class Initialdatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "IPads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    YellowTag = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: false),
                    LastKnownRITM = table.Column<string>(type: "nvarchar(24)", maxLength: 24, nullable: false),
                    Owner = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Project = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    Location = table.Column<string>(type: "nvarchar(128)", maxLength: 128, nullable: false),
                    ExType = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    SimType = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false)
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
