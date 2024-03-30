import { format, parse, parseISO } from 'date-fns';
export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0'); 
    const seconds = date.getSeconds().toString().padStart(2, '0'); 
  

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  
    return formattedDate;
  };

  export const formatDateDMY = (dateString: string) => {
    return format(new Date(dateString), 'yyyy-MM-dd');
};



export function formatDateDetails(updatedAt: string) {
    const parsedDate = parseISO(updatedAt);
    
    const formattedDate = format(parsedDate, "MMM d, 'at' h:mm a");

    return formattedDate;
}

export function formatDateDelete(inputDate: string) {
  const parsedDate = parse(inputDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx '('zzz')'", new Date());
  return parsedDate.toISOString();
}