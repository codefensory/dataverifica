export type UserResponseData = {
  id: number;
  username: string;
  companyName?: string;
  ruc?: string;
  phone?: string;
  email?: string;
};

export type UserResponse = {
  data: UserResponseData[];
  pages: number;
};
