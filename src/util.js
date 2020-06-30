
import moment from 'moment';


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

export const formatPrettyPeriod = (start, end) => {
    const isSameDay = moment(start).isSame(end, 'day');
    return {
        day: isSameDay ? `${formatLocaleDate(start)}` : `${formatLocaleDate(start)} a ${formatLocaleDate(end)}`,
        hour: `${formatLocaleTime(start)} às ${formatLocaleTime(end)}`
    };
}
