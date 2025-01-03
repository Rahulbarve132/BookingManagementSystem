export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  export function formatTime(date: Date): string {
    return date.toTimeString().split(' ')[0].substring(0, 5);
  }
  
  export function combineDateTime(date: string, time: string): Date {
    return new Date(`${date}T${time}`);
  }
  
  export function isValidDate(date: string): boolean {
    return !isNaN(new Date(date).getTime());
  }
  
  export function isValidTime(time: string): boolean {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
  }
  
  