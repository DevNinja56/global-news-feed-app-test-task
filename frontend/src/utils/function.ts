export const ItemExistInLocalStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(name) ? true : false;
  }
};

export const GetItemFromLocalStorage = (name: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(name);
  }
};

export const SetItemInLocalStorage = (name: string, data: any) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(name, data);
  }
};

export const ReplaceStrings = (
  arrayOfObjects: any[],
  arrayOfTitles: string[]
): any[] => {
  if (arrayOfObjects && arrayOfTitles) {
    const minLength = Math.min(arrayOfObjects.length, arrayOfTitles.length);

    return arrayOfObjects
      .map((obj, index) => ({
        ...obj,
        title: arrayOfTitles[index] || obj.title,
      }))
      .concat(arrayOfObjects.slice(minLength).map((obj) => ({ ...obj })));
  }

  return [];
};

export const FormatDate = (dateString: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(dateString);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const ampm = hours < 12 ? 'AM' : 'PM';

  const formattedDate = `Published ${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm} UTC, ${
    months[date.getUTCMonth()]
  } ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

  return formattedDate;
};
