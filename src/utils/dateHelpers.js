export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) return "-";
    return date.toLocaleDateString("tr-TR");
};

export const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    if (isNaN(dateTime)) return "-";
    return (
        dateTime.toLocaleDateString("tr-TR") +
        " " +
        dateTime.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
        })
    );
};
