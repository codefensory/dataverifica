export type SimpleUser = {
  id: number;
  isAdmin: boolean;
};

export type UserResponseAuth = {
  user: SimpleUser | null;
  isLoggedIn: boolean;
};
