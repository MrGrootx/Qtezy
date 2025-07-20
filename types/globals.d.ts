export {};

// Create a type for the roles
export type Roles = "admin" | "Member";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface Quote {
  id?: string;
  text: string;
  author: string;
  category: string;
  total_likes?: number;
  createdAt: Date;
  updatedAt?: Date;
  isLiked?: boolean;
}

export type GeneratedQuote = {
  title: string;
  author: string;
};
