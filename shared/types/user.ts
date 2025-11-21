export interface User {
  id: number;
  name: string;
  role: "ADMIN" | "GUEST";
  username: string;
  password: string;
}
