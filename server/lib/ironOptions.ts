export const authSessionOption = {
  cookieName: "dataverifica_auth_session",
  password: "zSjiDxylk3SH7lC7Vlvr9WAPMSlAsfW9",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}
