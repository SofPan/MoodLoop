export const getTodayDateString = ():string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;}

export const parseEntryDate = (dateString: string | Date):Date => {
  let date: Date;
  if (dateString instanceof Date) {
    date = dateString;
  } else if (typeof dateString === 'string'){
    date = new Date(dateString.split('T')[0] + 'T00:00:00');
  } else {
    throw new Error('Invalid Date');
  }
  return date;
}

export const formatDate = (dateString: string):string => {
  return parseEntryDate(dateString).toLocaleDateString('en-US', {     
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' });
}

export const getMonthYear = (dateString: string):string => {
  return parseEntryDate(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
}