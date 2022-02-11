namespace Api.Database.Models
{
    public enum ExClassEnum
    {
        NonEx = 0,
        Zone1 = 1,
        Zone2 = 2,
    }

    public enum UserTypeEnum
    {
        Equinor = 0,
        External = 1,
    }

    public enum SimTypeEnum
    {
        WiFiOnly = 0,
        Cellular = 1,
    }

    public enum StatusEnum
    {
        Ordered = 0,
        Delivered = 1,
    }
}
