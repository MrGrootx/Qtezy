declare module 'react-responsive-masonry' {
  import { ReactNode } from 'react';

  export interface ResponsiveMasonryProps {
    columnsCountBreakPoints?: Record<number, number>;
    children: ReactNode;
  }

  export interface MasonryProps {
    gutter?: string;
    children: ReactNode;
  }

  export const ResponsiveMasonry: React.FC<ResponsiveMasonryProps>;
  export const Masonry: React.FC<MasonryProps>;
  
  export default Masonry;
}
