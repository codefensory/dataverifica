export type UserResponse = {
  user: {
    id: number;
    isAdmin: boolean;
  } | null;
  isLoggedIn: boolean;
};
