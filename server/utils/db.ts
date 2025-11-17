const users: User[] = [
  { id: 1, name: "John", email: "admin@example.com", password: "0808", role: "ADMIN" },
  { id: 2, name: "Jane", email: "user@example.com", password: "0707", role: "GUEST" },
];

export const myUserDatabase = {
  findByEmail: async (email: string) => {
    return users.find(u => u.email === email);
  },
  findById: async (id: number) => {
    return users.find(u => u.id === id);
  },
};