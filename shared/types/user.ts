export interface User {
    id: number;
    name: string;
    role: "ADMIN" | "GUEST";
    email: string;
    password: string;
}