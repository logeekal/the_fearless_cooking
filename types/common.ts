export interface IDuration {
  hours: number;
  minutes: number
}


export type ThemeType = {
  colors: {
    text: string | null ;
    bgPrimary: string | null;
    bgSecondary: string;
    brand: string;
    accent: string 
  },

  font: {
    normal: string;
    cursive: string;
  }

  fontSize: {
    
  }
}
