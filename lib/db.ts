import { neon } from "@neondatabase/serverless";

const db = neon(process.env.DATABASE_URL!);

export default db;

 