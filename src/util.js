
export const formatLocaleDate = ISODateTimeString => {
    const dateObj = new Date(ISODateTimeString);
    return dateObj.toLocaleDateString(navigator.language);
};

export const formatLocaleTime = ISODateTimeString => {
    const dateObj = new Date(ISODateTimeString);
    return dateObj.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
};

export const formatLocaleDateTime = ISODateTimeString => {
    return `${formatLocaleDate(ISODateTimeString)} - ${formatLocaleTime(ISODateTimeString)}`;
}
