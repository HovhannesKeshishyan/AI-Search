export const useAuthUser = () => {
  return useState<Omit<User, "password"> | null>("user", () => null);
};