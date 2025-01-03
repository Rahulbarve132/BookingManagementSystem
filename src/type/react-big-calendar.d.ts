declare module 'react-big-calendar' {
    import { ComponentType } from 'react';
  
    export const Calendar: ComponentType<any>;
    export const momentLocalizer: (momentInstance: any) => any;
    export const Views: { [key: string]: string };
  }
  