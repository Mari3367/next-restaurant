import {User} from "next-auth";

declare module "next-auth" {
    interface Session {
      user: User & {
        isAdmin: Boolean;
      };
    }
  }

  declare module "next-auth/jwt" {
    interface JWT {
      isAdmin: Boolean;
    }
  }