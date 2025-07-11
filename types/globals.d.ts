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
  id: string;
  text: string;
  author: string;
  category: string;
  totalLikes: number;
  createdAt: Date;
  updatedAt: Date;
}